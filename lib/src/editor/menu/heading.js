export const setupHeadingStyle = (editor) => {
    const select = document.getElementById('heading-select');
    if (!select)
        return;
    select.addEventListener('change', () => {
        const value = select.value;
        if (value === 'paragraph') {
            editor.chain().focus().setParagraph().run();
        }
        else if (value === null || value === void 0 ? void 0 : value.startsWith('h')) {
            const levelNum = parseInt(value.substring(1), 10);
            if (levelNum >= 1 && levelNum <= 6) {
                setHeading(editor, levelNum);
            }
        }
    });
};
function setHeading(editor, level) {
    editor.chain().focus().toggleHeading({ level }).run();
}
