import { Mark, mergeAttributes, CommandProps, RawCommands } from '@tiptap/core'

export type CapitalizationType = 'uppercase' | 'lowercase' | 'capitalize'

export const Capitalization = Mark.create({
  name: 'capitalization',

  addAttributes() {
    return {
      type: {
        default: null,
        parseHTML: element => element.style.textTransform || null,
        renderHTML: attributes => {
          if (!attributes.type) {
            return {}
          }
          return {
            style: `text-transform: ${attributes.type}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        style: 'text-transform',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setCapitalization:
        (type: CapitalizationType) =>
        ({ chain }: CommandProps) => {
          return chain().setMark(this.name, { type }).run()
        },
      unsetCapitalization:
        () =>
        ({ chain }: CommandProps) => {
          return chain().unsetMark(this.name).run()
        },
    } as Partial<RawCommands>
  },
})
