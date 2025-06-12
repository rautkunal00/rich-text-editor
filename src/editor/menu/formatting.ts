import { Editor } from '@tiptap/core';

export const setupFormatting = (editor: Editor) => {
    document.getElementById('bold-btn')?.addEventListener('click', () => {
        editor.chain().focus().toggleBold().run();
    });
    document.getElementById('italic-btn')?.addEventListener('click', () => {
        editor.chain().focus().toggleItalic().run();
    });
    document.getElementById('underline-btn')?.addEventListener('click', () => {
        editor.chain().focus().toggleUnderline().run();
    });
    document.getElementById('strikethrough-btn')?.addEventListener('click', () => {
        editor.chain().focus().toggleStrike().run();
    });
}