import { Editor } from '@tiptap/core';
import { createColorPickerWithPalette } from "../extensions/colorPicker";

export const textColorInit = (button: HTMLButtonElement, editor: Editor, toolbar: HTMLElement) => {
    createColorPickerWithPalette(button, (color) => {
        if (color) {
            editor?.chain().focus().setColor(color).run();
        } else {
            editor?.chain().focus().unsetColor().run();
        }
    }, toolbar);
}