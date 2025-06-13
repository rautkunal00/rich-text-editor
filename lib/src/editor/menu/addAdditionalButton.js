export const addAdditionalButtons = (editor) => {
    var _a;
    (_a = document.getElementById('insert-datetime-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const now = new Date();
        const formattedDate = now.toLocaleString();
        editor.chain().focus().insertContent(formattedDate).run();
    });
};
