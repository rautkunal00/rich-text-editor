import { createEditor } from './editor/createEditor';
import { initMenu } from './editor/menu/initMenu';
import { createToolbar } from './editor/toolbar';
import { setupAddLink } from './editor/menu/addLink'
import { setupAddAnchorDialog } from './editor/menu/addAnchorId';

export interface TiptapEditorOptions {
    selector: string
    editorConfig?: Record<string, any>
}

export interface EditorAPI {
    setContent: (html: string) => void
    getContent: () => string
    destroy: () => void
    enable: () => void
    disable: () => void
}

export const initTiptapEditor = (options: TiptapEditorOptions): EditorAPI => {
    const { selector, editorConfig = {} } = options
    const editor = createEditor(options);
    const toolbar = createToolbar(editor);
    document.body.prepend(toolbar);
    initMenu(editor);

    setupAddLink(editor)
    setupAddAnchorDialog(editor)
    const editorElement = document.querySelector(selector);
    if (editorElement) {
        editorElement.addEventListener('click', function (e) {
            const target = e.target;
            if (
                target instanceof HTMLAnchorElement &&
                target.getAttribute('href') &&
                target.getAttribute('href')!.startsWith('#')
            ) {
                e.preventDefault();
                const anchorId = target.getAttribute('href')!.substring(1);
                const anchorEl = document.getElementById(anchorId);
                if (anchorEl) {
                    anchorEl.scrollIntoView({ behavior: 'smooth' });
                    history.replaceState(null, '', `#${anchorId}`);
                }
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

    return {
        setContent: (html: string) => editor.commands.setContent(html),
        getContent: () => editor.getHTML(),
        destroy: () => editor.destroy(),
        enable: () => editor.setEditable(true),
        disable: () => editor.setEditable(false),
    };
}
