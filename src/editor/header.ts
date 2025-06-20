import { Editor } from '@tiptap/core';
import { getExtensions } from './extensions';
import { EditorOptions } from '../globalInterface';

export const createEditor = (editorElement: HTMLDivElement, editorConfig: EditorOptions): Editor => {

    return new Editor({
        element: editorElement,
        extensions: getExtensions(editorConfig),
        editable: !editorConfig.disabled,
        content: '',
    });
}