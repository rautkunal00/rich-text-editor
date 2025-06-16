import { Mark, mergeAttributes, } from '@tiptap/core';
const FontFamily = Mark.create({
    name: 'fontFamily',
    addAttributes() {
        return {
            fontFamily: {
                default: null,
                parseHTML: element => element.style.fontFamily || null,
                renderHTML: attributes => {
                    if (!attributes.fontFamily) {
                        return {};
                    }
                    return {
                        style: `font-family: ${attributes.fontFamily}`,
                    };
                },
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'span[style*=font-family]',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(HTMLAttributes), 0];
    },
    addCommands() {
        return {
            setFontFamily: (font) => ({ chain }) => {
                return chain().setMark(this.name, { fontFamily: font }).run();
            },
            unsetFontFamily: () => ({ chain }) => {
                return chain().unsetMark(this.name).run();
            },
        };
    },
});
export default FontFamily;
