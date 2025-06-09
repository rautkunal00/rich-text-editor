import { Editor } from '@tiptap/core';
import { getExtensions } from './extensions';

export const createEditor = (config: any): Editor => {

    return new Editor({
        element: document.querySelector(config.selector) as HTMLElement,
        extensions: getExtensions(),
        editable: config.editable,
        content: '',
    });
}