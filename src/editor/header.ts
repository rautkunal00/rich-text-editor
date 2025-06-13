import { Editor } from '@tiptap/core';
import { getExtensions } from './extensions';

export const createEditor = (editorElement: HTMLDivElement, editorConfig: any): Editor => {

    return new Editor({
        element: editorElement,
        extensions: getExtensions(),
        editable: editorConfig.editable,
        content: '',
    });
}