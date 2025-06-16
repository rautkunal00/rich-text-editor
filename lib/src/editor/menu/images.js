export const setupImageUpload = (editor, editorElement) => {
    var _a;
    (_a = document.getElementById('image-upload-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        const url = prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    });
    // add drag drop for images
    editorElement.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    editorElement.addEventListener('drop', (event) => {
        event.preventDefault();
        const dragEvent = event;
        if (!dragEvent.dataTransfer)
            return;
        const files = Array.from(dragEvent.dataTransfer.files);
        files.forEach((file) => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (readerEvent) => {
                    var _a;
                    const src = (_a = readerEvent.target) === null || _a === void 0 ? void 0 : _a.result;
                    editor.chain().focus().setImage({ src }).run();
                };
                reader.readAsDataURL(file);
            }
        });
    });
};
