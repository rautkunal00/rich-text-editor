import { Editor } from '@tiptap/core';
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
    disabled?: boolean,
    showMenu?: boolean,
    showToolbar?: boolean,
}

export interface EditorAPI {
    setContent: (html: string) => void;
    getContent: () => string;
    destroy: () => void;
    enable: () => void;
    disable: () => void;

    onUpdate: (fn: (editor: Editor) => void) => void;
    onSelectionUpdate: (fn: (editor: Editor) => void) => void;
    onFocus: (fn: (editor: Editor) => void) => void;
    onBlur: (fn: (editor: Editor) => void) => void;
    onDestroy: (fn: (editor: Editor) => void) => void;
    afterInit: (fn: (editor: Editor) => void) => void;
    onPaste: (fn: (editor: Editor) => void) => void;
    onDrop: (fn: (editor: Editor) => void) => void;
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

    return {
        setContent: (html: string) => editor.commands.setContent(html),
        getContent: () => editor.getHTML(),
        destroy: () => editor.destroy(),
        enable: () => editor.setEditable(true),
        disable: () => editor.setEditable(false),
       onUpdate: (fn: (editor: Editor) => void) => editor.on('update', () => fn(editor)),
        onSelectionUpdate: (fn: (editor: Editor) => void) => editor.on('selectionUpdate', () => fn(editor)),
        onFocus: (fn: (editor: Editor) => void) => editor.on('focus', () => fn(editor)),
        onBlur: (fn: (editor: Editor) => void) => editor.on('blur', () => fn(editor)),
        onDestroy: (fn: (editor: Editor) => void) => editor.on('destroy', () => fn(editor)),
        afterInit: (fn: (editor: Editor) => void) => editor.on('create', () => fn(editor)),
        onPaste: (fn: (editor: Editor) => void) => editor.on('paste', () => fn(editor)),
        onDrop: (fn: (editor: Editor) => void) => editor.on('drop', () => fn(editor)),
    };
}
