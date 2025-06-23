import { Editor } from '@tiptap/core';
import { iframeDocument, iframeWindow } from '../globalVariables';

export const setupSearchReplace = (editor: Editor) => {
  const button = iframeDocument.getElementById('open-search-dialog-btn');
  if (!button) return;

  button.addEventListener('click', () => {
    const popupContent = createSearchReplacePopup(editor);
    const rect = button.getBoundingClientRect();
    const top = rect.bottom + iframeWindow.screenY;
    const left = rect.left + iframeWindow.screenX;

    editor.commands.showPopup({
      html: popupContent,
      position: { top, left },
      closeOnOutsideClick: true,
    });
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

  const replaceInput = iframeDocument.createElement('input');
  replaceInput.placeholder = 'Replace with...';
  replaceInput.style.width = '100%';
  replaceInput.style.marginBottom = '8px';
  replaceInput.style.padding = '6px';

  const searchBtn = iframeDocument.createElement('button');
  searchBtn.textContent = 'Search';
  searchBtn.style.marginRight = '6px';

  const replaceBtn = iframeDocument.createElement('button');
  replaceBtn.textContent = 'Replace';

  const replaceAllBtn = iframeDocument.createElement('button');
  replaceAllBtn.textContent = 'Replace All';
  replaceAllBtn.style.marginLeft = '6px';

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

  
  const clearHighlights = () => {
    editor.chain().focus().unsetMark('highlight').run();
  };

  const findMatches = (searchTerm: string) => {
    const matches: { from: number; to: number }[] = [];
    if (!searchTerm) return matches;

    const regex = new RegExp(searchTerm, 'gi');
    const docText = editor.state.doc.textBetween(0, editor.state.doc.content.size, '\n', '\n');

    let match;
    while ((match = regex.exec(docText)) !== null) {
      matches.push({
        from: match.index,
        to: match.index + match[0].length,
      });

      if (regex.lastIndex === match.index) regex.lastIndex++;
    }

    return matches;
  };

  const highlightMatches = (matches: { from: number; to: number }[]) => {
    if (matches.length === 0) return;

    clearHighlights();

    matches.forEach(({ from, to }) => {
      editor
        .chain()
        .focus()
        .setTextSelection({ from: from + 1, to: to + 1 })
        .setMark('highlight')
        .run();
    });
  };

  searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;

    const matches = findMatches(searchTerm);

    if (matches.length === 0) {
      resultMsg.textContent = 'No matches found.';
      clearHighlights();
      return;
    }

    highlightMatches(matches);
    resultMsg.textContent = `Found ${matches.length} match${matches.length > 1 ? 'es' : ''}.`;
  });

  replaceBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    const replaceTerm = replaceInput.value;
    if (!searchTerm) return;

    clearHighlights();

    const matches = findMatches(searchTerm);
    if (matches.length === 0) {
      resultMsg.textContent = 'No match found to replace.';
      return;
    }

    const firstMatch = matches[0];

    editor
      .chain()
      .focus()
      .deleteRange({ from: firstMatch.from + 1, to: firstMatch.to + 1 })
      .insertContentAt(firstMatch.from + 1, replaceTerm)
      .run();

    resultMsg.textContent = 'Replaced first match.';
  });

  replaceAllBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    const replaceTerm = replaceInput.value;
    if (!searchTerm) return;

    clearHighlights();

    const docText = editor.state.doc.textBetween(0, editor.state.doc.content.size, '\n', '\n');
    const regex = new RegExp(searchTerm, 'gi');
    const replacedText = docText.replace(regex, replaceTerm);

    editor.commands.setContent(replacedText, false);
    resultMsg.textContent = 'Replaced all matches.';
  });

  return container;
}
