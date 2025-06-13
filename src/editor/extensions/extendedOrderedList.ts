import { OrderedList } from '@tiptap/extension-ordered-list'
import { Node } from '@tiptap/core'

export const ExtendedOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      listStyleType: {
        default: 'decimal',
        parseHTML: element => element.style.listStyleType || 'decimal',
        renderHTML: attributes => {
          return {
            style: `list-style-type: ${attributes.listStyleType}`,
          }
        },
      },
    }
  },
})
