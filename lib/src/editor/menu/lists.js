export const setupLists = (editor) => {
    var _a, _b;
    (_a = document.getElementById('bullet-list-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        editor.chain().focus().toggleBulletList().run();
    });
    (_b = document.getElementById('ordered-list-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        editor.chain().focus().toggleOrderedList().run();
    });
};
