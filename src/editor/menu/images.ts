import { Editor } from '@tiptap/core';

export const setupImageUpload = (editor: Editor) => {
    document.getElementById('image-upload-btn')?.addEventListener('click', () => {
        const url = prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    });
}