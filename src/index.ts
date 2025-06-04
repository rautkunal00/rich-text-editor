import { createEditor } from './editor/createEditor';
import { initMenu } from './editor/menu/initMenu';

export const initTiptapEditor = (selector: string) => {
    const editor = createEditor(selector);
    initMenu(editor);
    return editor;
}
