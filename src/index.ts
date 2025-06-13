import { createFooter } from './editor/footer';
import { createEditor } from './editor/header';
import { initMenu } from './editor/menu/initMenu';
import { createToolbar } from './editor/toolbar';

declare var lucide: any;

export interface TiptapEditorOptions {
    selector: string
    editorConfig?: EditorOptions
}

export interface EditorOptions {
    disabled?: Boolean,
    showMenu?: Boolean,
    showToolbar?: Boolean,
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
    editorElement.className = 'tiptap-editor rich-text-editor';
    editorContainer?.appendChild(editorElement);
    const editor = createEditor(editorElement, editorConfig);

    // Create header
    if (editorConfig?.showToolbar) {
        const toolbar = createToolbar(editor);
        editorContainer?.prepend(toolbar);
        initMenu(editor, editorElement);
        lucide?.createIcons();
    }

    // Create Footer
    const footerElement: HTMLDivElement = document.createElement('div');
    createFooter(footerElement, editorConfig);
    editorContainer?.append(footerElement);

    // editor Events
    editor.on('update', ({ editor }) => {
        console.log('Content updated:', editor.getHTML());
    });

    editor.on('selectionUpdate', ({ editor }) => {
        console.log('Selection changed:', editor.state.selection);
    });

    editor.on('focus', () => {
        console.log('Editor is focused');
    });

    editor.on('blur', () => {
        console.log('Editor lost focus');
    });



    return {
        setContent: (html: string) => editor.commands.setContent(html),
        getContent: () => editor.getHTML(),
        destroy: () => editor.destroy(),
        enable: () => editor.setEditable(true),
        disable: () => editor.setEditable(false),
    };
}
