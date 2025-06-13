export const setupClearFormatting = (editor) => {
    const button = document.getElementById('clear-formatting-btn');
    if (!button)
        return;
    button.addEventListener('click', () => {
        editor.chain().focus().unsetAllMarks().clearNodes().run();
    });
};
