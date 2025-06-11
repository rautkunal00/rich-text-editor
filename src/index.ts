import { createEditor } from './editor/createEditor';
import { initMenu } from './editor/menu/initMenu';
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
    initMenu(editor);

    setupAddLink(editor)
    setupAddAnchorDialog(editor)
    const editorElement = document.querySelector(selector);
    if (editorElement) {
        editorElement.addEventListener('click', function(e) {
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
    }

    return {
        setContent: (html: string) => editor.commands.setContent(html),
        getContent: () => editor.getHTML(),
        destroy: () => editor.destroy(),
        enable: () => editor.setEditable(true),
        disable: () => editor.setEditable(false),
    };
}
