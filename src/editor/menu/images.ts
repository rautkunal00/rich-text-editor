import { Editor } from '@tiptap/core';

export const setupImageUpload = (editor: Editor, editorElement: HTMLDivElement) => {
    document.getElementById('image-upload-btn')?.addEventListener('click', () => {
        const url = prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    });

    // add drag drop for images
    editorElement.addEventListener('dragover', (event: Event) => {
        event.preventDefault();
    });

    editorElement.addEventListener('drop', (event: Event) => {
        event.preventDefault();
        const dragEvent = event as DragEvent;
        if (!dragEvent.dataTransfer) return;
        const files = Array.from(dragEvent.dataTransfer.files);
        files.forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (readerEvent) => {
                    const src = readerEvent.target?.result as string;
                    editor.chain().focus().setImage({ src }).run();
                };
                reader.readAsDataURL(file);
            }
        });
    });
}