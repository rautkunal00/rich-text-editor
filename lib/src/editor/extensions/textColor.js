import { Mark, mergeAttributes, } from '@tiptap/core';
const TextColor = Mark.create({
    name: 'textColor',
    addAttributes() {
        return {
            color: {
                default: null,
                parseHTML: element => element.style.color || null,
                renderHTML: attributes => {
                    if (!attributes.color) {
                        return {};
                    }
                    return {
                        style: `color: ${attributes.color}`,
                    };
                },
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'span[style*=color]',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['span', mergeAttributes(HTMLAttributes), 0];
    },
    addCommands() {
        return {
            setTextColor: (color) => ({ chain }) => {
                return chain().setMark(this.name, { color }).run();
            },
            unsetTextColor: () => ({ chain }) => {
                return chain().unsetMark(this.name).run();
            },
        };
    },
});
export default TextColor;
