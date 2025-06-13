import { Editor } from '@tiptap/core';
import { getExtensions } from './extensions';
export const createEditor = (editorElement, editorConfig) => {
    return new Editor({
        element: editorElement,
        extensions: getExtensions(),
        editable: editorConfig.editable,
        content: '',
    });
};
