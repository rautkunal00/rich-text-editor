import { Node, mergeAttributes } from '@tiptap/core'

export const IframeNode = Node.create({
    name: 'iframe',
    group: 'block',
    atom: true,
    selectable: true,

    addAttributes() {
        return {
            src: { default: '' },
            frameborder: { default: 0 },
            allowfullscreen: { default: true },
        }
    },

    parseHTML() {
        return [{ tag: 'iframe' }]
    },

    renderHTML({ HTMLAttributes }) {
        return ['iframe', mergeAttributes(HTMLAttributes)]
    },
})
