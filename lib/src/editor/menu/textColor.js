import { createColorPickerWithPalette } from "../extensions/colorPicker";
export const textColorInit = (button, editor, toolbar) => {
    createColorPickerWithPalette(button, (color) => {
        if (color) {
            editor === null || editor === void 0 ? void 0 : editor.chain().focus().setColor(color).run();
        }
        else {
            editor === null || editor === void 0 ? void 0 : editor.chain().focus().unsetColor().run();
        }
    }, toolbar);
};
