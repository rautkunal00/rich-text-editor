import { Editor } from '@tiptap/core';
import { getExtensions } from './extensions';

export const createEditor = (editorElement: HTMLDivElement, editorConfig: any): Editor => {

    const editor = new Editor({
        element: editorElement,
        extensions: getExtensions(editorConfig),
        editable: editorConfig.editable,
        content: '',
    });

    editorElement.addEventListener("mousedown", (event) => {
        if(editor.isEmpty) {
            event.preventDefault();
            editor.commands.focus('start');
        }
    })

    return editor;
}