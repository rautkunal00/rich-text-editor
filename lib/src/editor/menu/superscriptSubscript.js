export const superscriptSubscript = (editor) => {
    var _a, _b;
    (_a = document.getElementById('superscript-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const isActive = editor.isActive('superscript');
        if (isActive) {
            editor.chain().focus().unsetSuperscript().run();
            editor.view.dispatch(editor.state.tr.setStoredMarks([]));
        }
        else {
            editor.chain().focus().toggleSuperscript().run();
        }
    });
    (_b = document.getElementById('subscript-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        const isActive = editor.isActive('subscript');
        if (isActive) {
            editor.chain().focus().unsetSubscript().run();
            editor.view.dispatch(editor.state.tr.setStoredMarks([]));
        }
        else {
            editor.chain().focus().setSubscript().run();
        }
    });
};
