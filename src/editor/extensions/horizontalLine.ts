import { Node, mergeAttributes } from '@tiptap/core'

export const CustomHorizontalRule = Node.create({
  name: 'horizontalRule',

  group: 'block',
  parseHTML() {
    return [
      { tag: 'hr' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['hr', mergeAttributes(HTMLAttributes)]
  },

  addCommands() {
    return {
      setHorizontalRule:
        () =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name })
        },
    }
  },
})
