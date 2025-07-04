import { Node, mergeAttributes } from '@tiptap/core'
import { alignmentAttributes } from './alignAttributes'

export const AlignedParagraph = Node.create({
    name: 'paragraph',
    group: 'block',
    content: 'inline*',
    defining: true,

    addAttributes() {
        return alignmentAttributes
    },

    parseHTML() {
        return [
            {
                tag: 'p',
                getAttrs: element => ({
                    textAlign: element.style.textAlign || null,
                }),
            },
            {
                tag: 'div',
                getAttrs: element => ({
                    textAlign: element.style.textAlign || null,
                }),
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['p', mergeAttributes(HTMLAttributes), 0]
    },
})
