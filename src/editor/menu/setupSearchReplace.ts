import { Editor } from '@tiptap/core';

export const setupSearchReplace = (editor: Editor) => {
  const searchDialog = document.getElementById('search-dialog') as HTMLElement;
  const openSearchBtn = document.getElementById('open-search-dialog-btn');
  const closeSearchBtn = document.getElementById('close-search-dialog');

  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const replaceInput = document.getElementById('replace-input') as HTMLInputElement;

  openSearchBtn?.addEventListener('click', () => {
    searchDialog.style.display = 'block';
    searchInput.focus();
  });

  closeSearchBtn?.addEventListener('click', () => {
    searchDialog.style.display = 'none';
    clearHighlights();
  });

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

  document.getElementById('search-btn')?.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;

    const matches = findMatches(searchTerm);

    if (matches.length === 0) {
      alert('No matches found.');
      clearHighlights();
      return;
    }

    highlightMatches(matches);
  });

  document.getElementById('replace-btn')?.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    const replaceTerm = replaceInput.value;
    if (!searchTerm) return;

    clearHighlights();

    const matches = findMatches(searchTerm);

    if (matches.length === 0) {
      alert('No match found to replace.');
      return;
    }

    const firstMatch = matches[0];

    editor
      .chain()
      .focus()
      .deleteRange({ from: firstMatch.from + 1, to: firstMatch.to + 1 })
      .insertContentAt(firstMatch.from + 1, replaceTerm)
      .run();
  });

  document.getElementById('replace-all-btn')?.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    const replaceTerm = replaceInput.value;
    if (!searchTerm) return;

    clearHighlights();

    const docText = editor.state.doc.textBetween(0, editor.state.doc.content.size, '\n', '\n');
    const regex = new RegExp(searchTerm, 'gi');
    const replacedText = docText.replace(regex, replaceTerm);

    editor.commands.setContent(replacedText, false);
  });
};
