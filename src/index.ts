import { createEditor } from './editor/createEditor';
import { initMenu } from './editor/menu/initMenu';


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

    return {
        setContent: (html: string) => editor.commands.setContent(html),
        getContent: () => editor.getHTML(),
        destroy: () => editor.destroy(),
        enable: () => editor.setEditable(true),
        disable: () => editor.setEditable(false),
    };
}
