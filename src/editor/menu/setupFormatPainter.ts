import { Editor } from '@tiptap/core';
import { iframeDocument } from '../globalVariables';

let copiedMarks: { type: string; attrs: any }[] = [];
let isPainterActive = false;

export const setupFormatPainter = (editor: Editor) => {
  const painterBtn = iframeDocument.getElementById('format-painter-btn');

  painterBtn?.addEventListener('click', () => {
    const { from, to, empty } = editor.state.selection;

    if (empty || from === to) {
      alert('Select text to copy formatting from.');
      return;
    }

    // copying the format
    const slice = editor.state.doc.cut(from, to);
    const marksSet = new Set<string>();
    copiedMarks = [];

    slice.content.descendants((node) => {
      node.marks.forEach((mark) => {
        if (!marksSet.has(mark.type.name)) {
          marksSet.add(mark.type.name);
          copiedMarks.push({ type: mark.type.name, attrs: mark.attrs });
        }
      });
      return true;
    });

    if (copiedMarks.length === 0) {
      alert('No formatting found in the selected text.');
    } else {
      isPainterActive = true;
      painterBtn.classList.add('active');
      alert('Formatting copied. Now select text to apply it.');
    }
  });

  // Applying the copied format
  const applyFormattingIfNeeded = () => {
    if (!isPainterActive || copiedMarks.length === 0) return;

    const { from, to, empty } = editor.state.selection;
    if (empty || from === to) return;

    let chain = editor.chain().focus().setTextSelection({ from, to });

    copiedMarks.forEach(({ type, attrs }) => {
      chain = chain.setMark(type, attrs);
    });

    chain.run();

    isPainterActive = false;
    copiedMarks = [];
    painterBtn?.classList.remove('active');
    alert('Formatting applied.');
  };

  // Listening for user finalizing selection
  iframeDocument.addEventListener('mouseup', applyFormattingIfNeeded);
  iframeDocument.addEventListener('keyup', (e) => {
    if (e.key === 'Shift' || e.key.startsWith('Arrow')) {
      applyFormattingIfNeeded();
    }
  });
};
