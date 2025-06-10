import {
  Mark,
  mergeAttributes,
  CommandProps,
  RawCommands,
} from '@tiptap/core'

const FontFamily = Mark.create({
  name: 'fontFamily',

  addAttributes() {
    return {
      fontFamily: {
        default: null,
        parseHTML: element => element.style.fontFamily || null,
        renderHTML: attributes => {
          if (!attributes.fontFamily) {
            return {}
          }

          return {
            style: `font-family: ${attributes.fontFamily}`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[style*=font-family]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setFontFamily:
        (font: string) =>
        ({ chain }: CommandProps) => {
          return chain().setMark(this.name, { fontFamily: font }).run()
        },

      unsetFontFamily:
        () =>
        ({ chain }: CommandProps) => {
          return chain().unsetMark(this.name).run()
        },
    } as Partial<RawCommands>
  },
})

export default FontFamily
