export function allowBase64Images(editor) {
    editor.setOptions({
        editorProps: {
            handlePaste(view, event) {
                var _a;
                const items = (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.items;
                if (!items)
                    return false;
                // Convert to array before using for...of
                const itemArray = Array.from(items);
                for (const item of itemArray) {
                    if (item.type.indexOf('image') === 0) {
                        const file = item.getAsFile();
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (readerEvent) => {
                                var _a;
                                const src = (_a = readerEvent.target) === null || _a === void 0 ? void 0 : _a.result;
                                editor.chain().focus().setImage({ src }).run();
                            };
                            reader.readAsDataURL(file);
                            return true; // prevent default paste
                        }
                    }
                }
                return false;
            },
        },
    });
}
