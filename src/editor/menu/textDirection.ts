import { Editor } from '@tiptap/core';
import { iframeDocument } from '../globalVariables';

export const textDirectionMenu = (editor: Editor) => {
    
  iframeDocument.getElementById('left-to-Right-btn')?.addEventListener('click', () => {
    const isLTRActive = editor.isActive('paragraph', { dir: 'ltr' });
    if (isLTRActive) {
      editor.chain().focus().updateAttributes('paragraph', { dir: null }).run();
    } else {
      editor.chain().focus().setLTR().run();
    }
  });

  iframeDocument.getElementById('Right-to-Left-btn')?.addEventListener('click', () => {
    const isRTLActive = editor.isActive('paragraph', { dir: 'rtl' });
    if (isRTLActive) {
      editor.chain().focus().updateAttributes('paragraph', { dir: null }).run();
    } else {
      editor.chain().focus().setRTL().run();
    }
  });
};
