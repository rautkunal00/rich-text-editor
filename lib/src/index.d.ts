export interface TiptapEditorOptions {
    selector: string;
    editorConfig?: EditorOptions;
}
export interface EditorOptions {
    disabled?: Boolean;
    showMenu?: Boolean;
    showToolbar?: Boolean;
}
export interface EditorAPI {
    setContent: (html: string) => void;
    getContent: () => string;
    destroy: () => void;
    enable: () => void;
    disable: () => void;
}
export declare const initTiptapEditor: (options: TiptapEditorOptions) => EditorAPI;
