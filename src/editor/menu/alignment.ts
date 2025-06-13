import { Editor } from '@tiptap/core';

export const setupAlignment = (editor: Editor) => {
    document.getElementById('align-left-btn')?.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('left').run();
    });
    document.getElementById('align-center-btn')?.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('center').run();
    });
    document.getElementById('align-right-btn')?.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('right').run();
    });
    document.getElementById('align-justify-btn')?.addEventListener('click', () => {
        editor.chain().focus().setTextAlign('justify').run();
    });
}