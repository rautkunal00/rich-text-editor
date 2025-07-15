import { Editor } from "@tiptap/core";

export interface TiptapEditorOptions {
    selector: string
    editorConfig?: EditorOptions
}

export interface EditorOptions {
    disabled?: boolean,
    showMenu?: boolean,
    showToolbar?: boolean,
    height?: string,
    width?: string,
    cssFiles?: string,
    resize?: boolean,
    displayWordCount?: boolean,
    footerMessage?: string,
}

export interface EditorAPI {
    setContent: (html: string) => void;
    getContent: () => string;
    getContentAsText: () => string;
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