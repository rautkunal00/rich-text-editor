import { Extension } from '@tiptap/core'

export const InsertMedia = Extension.create({
  name: 'insertMedia',

  addCommands() {
    return {
      insertMedia:
        (attrs: { src: string; type: 'audio' | 'video' }) =>
        ({ commands }) => {
          if (attrs.type === 'video') {
            return commands.insertContent({
              type: 'iframe',
              attrs: {
                src: attrs.src,
                frameborder: 0,
                allowfullscreen: true,
              },
            })
          }

          if (attrs.type === 'audio') {
            return commands.insertContent({
              type: 'audio',
              attrs: {
                src: attrs.src,
                controls: true,
              },
            })
          }

          return false
        },
    }
  },
})
