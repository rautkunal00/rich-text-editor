import { Editor } from '@tiptap/core';
import { iframeDocument } from '../globalVariables';

export const pageBreakMenu = (editor: Editor) => {
  const pageBreakBtn = iframeDocument.getElementById('page-break-btn');

  if (!pageBreakBtn) {
    console.warn('Page Break button not found in iframeDocument');
    return;
  }

  pageBreakBtn.addEventListener('click', () => {
    editor.chain().focus().insertPageBreak().run();
  });
};
