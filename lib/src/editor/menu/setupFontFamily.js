export const setupFontFamily = (editor) => {
    const select = document.getElementById('font-family-select');
    if (!select) {
        console.warn('Font family dropdown not found');
        return;
    }
    select.addEventListener('change', () => {
        const family = select.value;
        console.log("select", family);
        if (family) {
            editor.chain().focus().setFontFamily(family).run();
        }
        else {
            editor.chain().focus().unsetFontFamily().run();
        }
    });
};
