import { Mark, mergeAttributes } from '@tiptap/core';

const HighlightMark = Mark.create({
  name: 'highlight',

  addAttributes() {
    return {
      class: {
        default: 'search-highlight',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'mark' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(HTMLAttributes), 0];
  },
})

export default HighlightMark
