import { Editor } from '@tiptap/core';
import { iframeDocument, iframeWindow } from '../globalVariables';

let lastSearchTerm = "";
let lastReplaceTerm = "";

export const setupSearchReplace = (editor: Editor) => {
  const button = iframeDocument.getElementById('open-search-dialog-btn');
  if (!button) return;

  button.addEventListener('click', () => {
    const popupContent = createSearchReplacePopup(editor);

    const popupWidth = 280;
    const popupHeight = 160;

    const viewportWidth = iframeWindow.innerWidth;
    const viewportHeight = iframeWindow.innerHeight;

    const left = (viewportWidth - popupWidth) / 2 + iframeWindow.screenX;
    const top = (viewportHeight - popupHeight) / 2 + iframeWindow.screenY;

    editor.commands.showPopup({
      html: popupContent,
      position: { top, left },
      closeOnOutsideClick: true,
    });

    const lucide = (iframeWindow as any).lucide;
    if (typeof lucide?.createIcons === 'function') {
      lucide.createIcons();
    }
  });
};

function createSearchReplacePopup(editor: Editor): HTMLDivElement {
  const container = iframeDocument.createElement('div');
  container.style.width = '300px';
  container.style.padding = '12px';
  container.style.fontFamily = 'sans-serif';
  container.style.background = '#fff';

  // Creating inputs and buttons
  const searchInput = iframeDocument.createElement('input');
  searchInput.placeholder = 'Search...';
  searchInput.style.width = '100%';
  searchInput.style.marginBottom = '8px';
  searchInput.style.padding = '6px';
  searchInput.style.marginTop = '30px';
  searchInput.value = lastSearchTerm;

  const replaceInput = iframeDocument.createElement('input');
  replaceInput.placeholder = 'Replace with...';
  replaceInput.style.width = '100%';
  replaceInput.style.marginBottom = '8px';
  replaceInput.style.padding = '6px';
  replaceInput.value = lastReplaceTerm;

  searchInput.addEventListener('input',()=>{
    lastSearchTerm = searchInput.value;
  })

  replaceInput.addEventListener('input',()=>{
    lastReplaceTerm = replaceInput.value;
  })

  const searchBtn = iframeDocument.createElement('button');
  searchBtn.textContent = 'Search';
  searchBtn.style.marginRight = '6px';

  const replaceBtn = iframeDocument.createElement('button');
  replaceBtn.textContent = 'Replace';

  const replaceAllBtn = iframeDocument.createElement('button');
  replaceAllBtn.textContent = 'Replace All';
  replaceAllBtn.style.marginLeft = '6px';

  // creating button to close the popup
  const closePopBtn = iframeDocument.createElement('button');
  closePopBtn.type = 'button';
  closePopBtn.title = 'Close';
  closePopBtn.innerHTML = `<i data-lucide="x"></i>`;
  closePopBtn.className = 'close-popup-btn';
  closePopBtn.addEventListener('click', () => {
    editor.commands.closePopup();
  });

  const actions = iframeDocument.createElement('div');
  actions.style.marginTop = '8px';
  actions.appendChild(searchBtn);
  actions.appendChild(replaceBtn);
  actions.appendChild(replaceAllBtn);

  const resultMsg = iframeDocument.createElement('div');
  resultMsg.style.marginTop = '8px';
  resultMsg.style.fontSize = '12px';
  resultMsg.style.color = '#555';

  container.appendChild(searchInput);
  container.appendChild(replaceInput);
  container.appendChild(actions);
  container.appendChild(resultMsg);
  container.appendChild(closePopBtn);

  const clearHighlights = () => {
    editor.chain().focus().unsetMark('highlight').run();
  };

 function findMatches(editor: Editor, searchTerm: string): { from: number; to: number }[] {
  const matches: { from: number; to: number }[] = [];
  if (!searchTerm) return matches;

  const regex = new RegExp(searchTerm, 'gi');

  editor.state.doc.descendants((node, pos) => {
    if (!node.isText) return true;

    const text = node.text || '';
    let match;

    while ((match = regex.exec(text)) !== null) {
      const start = pos + match.index;
      const end = start + match[0].length;

      matches.push({
        from: start,
        to: end,
      });

      if (regex.lastIndex === match.index) {
        regex.lastIndex++;
      }
    }

    return true;
  });

  return matches;
}

  const highlightMatches = (matches: { from: number; to: number }[]) => {
    if (matches.length === 0) return;

    clearHighlights();

    matches.forEach(({ from, to }) => {
      editor
        .chain()
        .focus()
        .setTextSelection({ from, to })  
        .setMark('highlight')
        .run();
    });
  };

  searchBtn.addEventListener('click', () => {
    lastSearchTerm = searchInput.value.trim();
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;

    const matches = findMatches(editor, searchTerm);

    if (matches.length === 0) {
      resultMsg.textContent = 'No matches found.';
      clearHighlights();
      return;
    }

    highlightMatches(matches);
    resultMsg.textContent = `Found ${matches.length} match${matches.length > 1 ? 'es' : ''}.`;
  });

  replaceBtn.addEventListener('click', () => {
  lastSearchTerm = searchInput.value.trim(); 
  lastReplaceTerm = replaceInput.value; 
  const searchTerm = searchInput.value.trim();
  const replaceTerm = replaceInput.value;
  if (!searchTerm) return;

  clearHighlights();

  const matches = findMatches(editor, searchTerm);
  if (matches.length === 0) {
    resultMsg.textContent = 'No match found to replace.';
    return;
  }

  const firstMatch = matches[0];

  const docText = editor.state.doc.textBetween(firstMatch.from, firstMatch.to + 1, '\n', '\n');
  const nextChar = docText[searchTerm.length]; 
  const adjustedReplacement = replaceTerm + (nextChar === ' ' ? ' ' : '');

  editor
    .chain()
    .focus()
    .deleteRange({ from: firstMatch.from, to: firstMatch.to })
    .insertContentAt(firstMatch.from, adjustedReplacement)
    .run();

  resultMsg.textContent = 'Replaced first match.';
});


  replaceAllBtn.addEventListener('click', () => {
  lastSearchTerm = searchInput.value.trim();
  lastReplaceTerm = replaceInput.value; 
  const searchTerm = searchInput.value.trim();
  const replaceTerm = replaceInput.value;
  if (!searchTerm) return;

  clearHighlights();

  const matches = findMatches(editor, searchTerm);

  if (matches.length === 0) {
    resultMsg.textContent = 'No matches found to replace.';
    return;
  }

  matches.reverse().forEach(({ from, to }) => {
    const nextChar = editor.state.doc.textBetween(to, to + 1, '\n', '\n');
    const adjustedReplacement =
      replaceTerm + (nextChar === ' ' ? ' ' : '');

    editor
      .chain()
      .focus()
      .deleteRange({ from, to })
      .insertContentAt(from, adjustedReplacement)
      .run();
  });

  resultMsg.textContent = `Replaced ${matches.length} match${matches.length > 1 ? 'es' : ''}.`;
});


  return container;
}