export const setupTextColor = (editor) => {
    var _a, _b, _c;
    (_a = document.getElementById('text-red-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        editor.chain().focus().setTextColor('red').run();
    });
    (_b = document.getElementById('text-blue-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        editor.chain().focus().setTextColor('blue').run();
    });
    (_c = document.getElementById('text-clear-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        editor.chain().focus().unsetTextColor().run();
    });
};
