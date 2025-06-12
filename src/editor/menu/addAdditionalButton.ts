import { Editor } from '@tiptap/core';

export const addAdditionalButtons = (editor: Editor) => {
    document.getElementById('insert-datetime-btn')?.addEventListener('click', () => {
        const now = new Date();
        const formattedDate = now.toLocaleString();
        editor.chain().focus().insertContent(formattedDate).run();
    });

}