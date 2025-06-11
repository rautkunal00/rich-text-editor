import { Mark, mergeAttributes } from '@tiptap/core';

const AnchorMark = Mark.create({
  name: 'anchorMark',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: element => element.getAttribute('id'),
        renderHTML: attributes => {
          if (!attributes.id) {
            return {};
          }
          return { id: attributes.id };
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[id]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
});

export default AnchorMark
