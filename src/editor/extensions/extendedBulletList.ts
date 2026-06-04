import { BulletList } from '@tiptap/extension-bullet-list'

export const ExtendedBulletList = BulletList.extend({
  addAttributes() {
    return {
      listStyleType: {
        default: 'disc',
        parseHTML: element => element.style.listStyleType || 'disc',
        renderHTML: attributes => {
          return {
            style: `list-style-type: ${attributes.listStyleType}`,
          }
        },
      },
    }
  },
})
