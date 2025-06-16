export const setupFormatting = (editor) => {
    var _a, _b, _c, _d;
    (_a = document.getElementById('bold-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        editor.chain().focus().toggleBold().run();
    });
    (_b = document.getElementById('italic-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        editor.chain().focus().toggleItalic().run();
    });
    (_c = document.getElementById('underline-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        editor.chain().focus().toggleUnderline().run();
    });
    (_d = document.getElementById('strikethrough-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
        editor.chain().focus().toggleStrike().run();
    });
};
