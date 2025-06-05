import { Editor } from '@tiptap/core';

export const setupLists = (editor: Editor) => {
    document.getElementById('bullet-list-btn')?.addEventListener('click', () => {
        editor.chain().focus().toggleBulletList().run();
    });
    document.getElementById('ordered-list-btn')?.addEventListener('click', () => {
        editor.chain().focus().toggleOrderedList().run();
    });
}