import { Editor } from '@tiptap/core';
import { createColorPickerWithPalette } from "../extensions/colorPicker";

export const highlightInit = (button: HTMLButtonElement, editor: Editor, toolbar: HTMLElement) => {
    createColorPickerWithPalette(button, (color) => {
        if (color) {
            editor?.chain().focus().setHighlight({ 'color': color }).run();
        } else {
            editor?.chain().focus().unsetHighlight().run();
        }
    }, toolbar);
}