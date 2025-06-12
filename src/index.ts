import { createEditor } from './editor/createEditor';
import { initMenu } from './editor/menu/initMenu';
import { createToolbar } from './editor/toolbar';
import { setupAddLink } from './editor/menu/addLink'
import { setupAddAnchorDialog } from './editor/menu/addAnchorId';

declare var lucide: any;

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
    const { selector, editorConfig = {} } = options;
    // use selector as wrapper component
    const editorContainer = document.querySelector(selector);

    // Create Editor
    const uniqueId = 'editor-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const editorId = uniqueId;
    const editorElement: HTMLDivElement = document.createElement('div');
    editorElement.id = editorId;
    editorElement.className = 'tiptap-editor editor';
    editorContainer?.appendChild(editorElement);
    const editor = createEditor(editorElement, options);

    // Create Toolbar
    const toolbar = createToolbar(editor);
    editorContainer?.prepend(toolbar);
    initMenu(editor, editorElement);
    lucide?.createIcons();

    return {
        setContent: (html: string) => editor.commands.setContent(html),
        getContent: () => editor.getHTML(),
        destroy: () => editor.destroy(),
        enable: () => editor.setEditable(true),
        disable: () => editor.setEditable(false),
    };
}
