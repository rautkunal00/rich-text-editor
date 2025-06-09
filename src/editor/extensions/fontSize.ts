import { CommandProps, Mark, RawCommands } from '@tiptap/core'

export const FontSize = Mark.create({
  name: 'fontSize',

  addAttributes() {
    return {
      fontSize: {
        default: null,
        parseHTML: element => element.style.fontSize || null,
        renderHTML: attributes => {
          if (!attributes.fontSize) {
            return {}
          }
          return { style: `font-size: ${attributes.fontSize}` }
        },
      },
    }
  },

  parseHTML() {
    return [{ style: 'font-size' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0]
  },

    addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: CommandProps) => {
          return chain().setMark(this.name, { fontSize }).run()
        },

      unsetFontSize:
        () =>
        ({ chain }: CommandProps) => {
          return chain().unsetMark(this.name).run()
        },
    } as Partial<RawCommands> 
  },
})
