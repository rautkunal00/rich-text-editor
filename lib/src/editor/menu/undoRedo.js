export const setupUndoRedo = (editor) => {
    var _a, _b;
    (_a = document.getElementById('undo-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        editor.chain().focus().undo().run();
    });
    (_b = document.getElementById('redo-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        editor.chain().focus().redo().run();
    });
};
