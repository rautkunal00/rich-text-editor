import { Editor } from "@tiptap/core";

export function allowBase64Images(editor: Editor) {
    editor.setOptions({
        editorProps: {
            handlePaste(view, event) {
                const items = event.clipboardData?.items;

                if (!items) return false;

                // Convert to array before using for...of
                const itemArray = Array.from(items);

                for (const item of itemArray) {
                    if (item.type.indexOf('image') === 0) {
                        const file = item.getAsFile();
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (readerEvent) => {
                                const src = readerEvent.target?.result as string;
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