import { Node, mergeAttributes } from '@tiptap/core'
import { alignmentAttributes } from './alignAttributes'

export const AlignedBlockquote = Node.create({
  name: 'blockquote',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return alignmentAttributes
  },

  parseHTML() {
    return [
      {
        tag: 'blockquote',
        getAttrs: element => ({
          textAlign: element.style.textAlign || null,
        }),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['blockquote', mergeAttributes(HTMLAttributes), 0]
  },
})
