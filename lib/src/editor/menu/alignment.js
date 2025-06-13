export const setupAlignment = (editor) => {
    var _a, _b, _c, _d;
    (_a = document.getElementById('align-left-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('left').run();
    });
    (_b = document.getElementById('align-center-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('center').run();
    });
    (_c = document.getElementById('align-right-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('right').run();
    });
    (_d = document.getElementById('align-justify-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('justify').run();
    });
};
