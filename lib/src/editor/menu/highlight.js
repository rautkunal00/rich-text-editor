import { createColorPickerWithPalette } from "../extensions/colorPicker";
export const highlightInit = (button, editor, toolbar) => {
    createColorPickerWithPalette(button, (color) => {
        if (color) {
            editor === null || editor === void 0 ? void 0 : editor.chain().focus().setHighlight({ 'color': color }).run();
        }
        else {
            editor === null || editor === void 0 ? void 0 : editor.chain().focus().unsetHighlight().run();
        }
    }, toolbar);
};
