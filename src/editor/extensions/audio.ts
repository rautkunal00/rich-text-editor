import { Node, mergeAttributes } from '@tiptap/core'

export const AudioNode = Node.create({
  name: 'audio',
  group: 'block',
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      src: { default: '' },
      controls: { default: true },
    }
  },

  parseHTML() {
    return [{ tag: 'audio' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['audio', mergeAttributes(HTMLAttributes)]
  },
})
