export const setupCapitalizationMenu = (editor) => {
    const capitalizeSelect = document.getElementById('capitalize-select');
    capitalizeSelect === null || capitalizeSelect === void 0 ? void 0 : capitalizeSelect.addEventListener('change', () => {
        const value = capitalizeSelect.value;
        const { state, commands } = editor;
        const { from, to } = state.selection;
        const selectedText = state.doc.textBetween(from, to);
        let transformed = selectedText;
        switch (value) {
            case 'Uppercase':
                transformed = selectedText.toUpperCase();
                break;
            case 'Lowercase':
                transformed = selectedText.toLowerCase();
                break;
            case 'Capitalize':
                transformed = selectedText.replace(/\b\w/g, c => c.toUpperCase());
                break;
            default:
                // do nothing, leave text as is
                break;
        }
        if (from !== to && transformed !== selectedText) {
            editor.chain().focus().insertContentAt({ from, to }, transformed).run();
        }
        // reset to placeholder
        capitalizeSelect.value = '';
    });
};
