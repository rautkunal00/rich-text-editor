import { Mark } from '@tiptap/core';
const FontSize = Mark.create({
    name: 'fontSize',
    addAttributes() {
        return {
            fontSize: {
                default: null,
                parseHTML: element => element.style.fontSize || null,
                renderHTML: attributes => {
                    if (!attributes.fontSize) {
                        return {};
                    }
                    return { style: `font-size: ${attributes.fontSize}` };
                },
            },
        };
    },
    parseHTML() {
        return [{ style: 'font-size' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['span', HTMLAttributes, 0];
    },
    addCommands() {
        return {
            setFontSize: (fontSize) => ({ chain }) => {
                return chain().setMark(this.name, { fontSize }).run();
            },
            unsetFontSize: () => ({ chain }) => {
                return chain().unsetMark(this.name).run();
            },
        };
    },
});
export default FontSize;
