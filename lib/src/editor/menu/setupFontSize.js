export const setupFontSize = (editor) => {
    const select = document.getElementById('font-size-select');
    if (!select)
        return;
    select.addEventListener('change', () => {
        const size = select.value;
        if (size) {
            editor.chain().focus().setFontSize(size).run();
        }
        else {
            editor.chain().focus().unsetFontSize().run();
        }
    });
};
