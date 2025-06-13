export const setupSearchReplace = (editor) => {
    var _a, _b, _c;
    const searchDialog = document.getElementById('search-dialog');
    const openSearchBtn = document.getElementById('open-search-dialog-btn');
    const closeSearchBtn = document.getElementById('close-search-dialog');
    const searchInput = document.getElementById('search-input');
    const replaceInput = document.getElementById('replace-input');
    openSearchBtn === null || openSearchBtn === void 0 ? void 0 : openSearchBtn.addEventListener('click', () => {
        searchDialog.style.display = 'block';
        searchInput.focus();
    });
    closeSearchBtn === null || closeSearchBtn === void 0 ? void 0 : closeSearchBtn.addEventListener('click', () => {
        searchDialog.style.display = 'none';
        clearHighlights();
    });
    const clearHighlights = () => {
        editor.chain().focus().unsetMark('highlight').run();
    };
    const findMatches = (searchTerm) => {
        const matches = [];
        if (!searchTerm)
            return matches;
        const regex = new RegExp(searchTerm, 'gi');
        const docText = editor.state.doc.textBetween(0, editor.state.doc.content.size, '\n', '\n');
        let match;
        while ((match = regex.exec(docText)) !== null) {
            matches.push({
                from: match.index,
                to: match.index + match[0].length,
            });
            if (regex.lastIndex === match.index)
                regex.lastIndex++;
        }
        return matches;
    };
    const highlightMatches = (matches) => {
        if (matches.length === 0)
            return;
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
    (_a = document.getElementById('search-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (!searchTerm)
            return;
        const matches = findMatches(searchTerm);
        if (matches.length === 0) {
            alert('No matches found.');
            clearHighlights();
            return;
        }
        highlightMatches(matches);
    });
    (_b = document.getElementById('replace-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        const replaceTerm = replaceInput.value;
        if (!searchTerm)
            return;
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
    (_c = document.getElementById('replace-all-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        const replaceTerm = replaceInput.value;
        if (!searchTerm)
            return;
        clearHighlights();
        const docText = editor.state.doc.textBetween(0, editor.state.doc.content.size, '\n', '\n');
        const regex = new RegExp(searchTerm, 'gi');
        const replacedText = docText.replace(regex, replaceTerm);
        editor.commands.setContent(replacedText, false);
    });
};
