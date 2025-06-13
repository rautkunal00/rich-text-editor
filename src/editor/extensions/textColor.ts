import {
  Mark,
  mergeAttributes,
  CommandProps,
  RawCommands,
} from '@tiptap/core'

const TextColor = Mark.create({
  name: 'textColor',

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: element => element.style.color || null,
        renderHTML: attributes => {
          if (!attributes.color) {
            return {}
          }
          return {
            style: `color: ${attributes.color}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[style*=color]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setTextColor:
        (color: string) =>
        ({ chain }: CommandProps) => {
          return chain().setMark(this.name, { color }).run()
        },

      unsetTextColor:
        () =>
        ({ chain }: CommandProps) => {
          return chain().unsetMark(this.name).run()
        },
    } as Partial<RawCommands>
  },
})

export default TextColor
