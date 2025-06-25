import { Editor } from '@tiptap/core';
import { iframeDocument } from '../globalVariables';

export const textDirectionMenu = (editor: Editor) => {
    
  iframeDocument.getElementById('left-to-right-btn')?.addEventListener('click', () => {
    const isLTRActive = editor.isActive('paragraph', { dir: 'ltr' });
    if (isLTRActive) {
      editor.chain().focus().updateAttributes('paragraph', { dir: null }).run();
    } else {
      editor.chain().focus().setLTR().run();
    }
  });

  iframeDocument.getElementById('right-to-left-btn')?.addEventListener('click', () => {
    const isRTLActive = editor.isActive('paragraph', { dir: 'rtl' });
    if (isRTLActive) {
      editor.chain().focus().updateAttributes('paragraph', { dir: null }).run();
    } else {
      editor.chain().focus().setRTL().run();
    }
  });
};
