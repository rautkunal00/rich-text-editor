import { Editor } from '@tiptap/core'
type Level = 1 | 2 | 3 | 4 | 5 | 6;

export const setupHeadingStyle = (editor: Editor) => {
    const select = document.getElementById('heading-select') as HTMLSelectElement | null;
    if (!select) return;
    select.addEventListener('change', () => {
        const value = select.value;
        if (value === 'paragraph') {
            editor.chain().focus().setParagraph().run();
        } else if (value?.startsWith('h')) {
            const levelNum = parseInt(value.substring(1), 10);
            if (levelNum >= 1 && levelNum <= 6) {
                setHeading(editor, levelNum as Level);
            }
        }
    });
}

function setHeading(editor: Editor, level: Level) {
    editor.chain().focus().toggleHeading({ level }).run();
}
