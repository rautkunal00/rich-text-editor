import { Editor } from '@tiptap/core';
import { getExtensions } from './extensions';

export const createEditor = (editorElement: HTMLDivElement, config: any): Editor => {

    return new Editor({
        element: editorElement,
        extensions: getExtensions(),
        editable: config.editable,
        content: '',
    });
}