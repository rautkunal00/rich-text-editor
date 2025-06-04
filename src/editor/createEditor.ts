import { Editor } from '@tiptap/core';
import { getExtensions } from './extensions';

export const createEditor = (selector: string): Editor => {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element ${selector} not found`);

    const editor = new Editor({
        element,
        extensions: getExtensions(),
        content: '<p>Hello, modular world!</p>',
    });

    return editor;
}