import { Node, mergeAttributes, Command } from '@tiptap/core';
import { TextSelection } from 'prosemirror-state';

export const PageBreak = Node.create({
  name: 'pageBreak',
  group: 'block',
  atom: true,
  selectable: false,

  parseHTML() {
    return [{ tag: 'div[data-page-break]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, {
      'data-page-break': '',
      class: 'page-break',
    }), 0];
  },

  addCommands() {
    return {
      insertPageBreak:
        (): Command =>
        ({ state, dispatch }) => {
          const { $from } = state.selection;
          const position = $from.after();

          const pageBreakNode = this.type.create();
          const paragraphNode = state.schema.nodes.paragraph?.create();

          if (!paragraphNode) {
            console.error('Paragraph node is not available in the schema.');
            return false;
          }

          let tr = state.tr
            .insert(position, pageBreakNode)
            .insert(position + pageBreakNode.nodeSize, paragraphNode);

          const resolvedPos = tr.doc.resolve(position + pageBreakNode.nodeSize + 1);
          tr = tr.setSelection(TextSelection.near(resolvedPos));

          dispatch?.(tr);
          return true;
        },
    };
  },
});
