import { Extension, CommandProps, Command } from '@tiptap/core'

export const TextDirection = Extension.create({
  name: 'textDirection',

  addGlobalAttributes() {
    return [
      {
        types: ['paragraph'],
        attributes: {
          dir: {
            default: null,
            parseHTML: element => element.getAttribute('dir'),
            renderHTML: attributes => {
              if (!attributes.dir) return {}
              return { dir: attributes.dir }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setLTR:
        (): Command =>
        ({ commands }: CommandProps) => {
          return commands.updateAttributes('paragraph', { dir: 'ltr' })
        },

      setRTL:
        (): Command =>
        ({ commands }: CommandProps) => {
          return commands.updateAttributes('paragraph', { dir: 'rtl' })
        },
    }
  },
})
