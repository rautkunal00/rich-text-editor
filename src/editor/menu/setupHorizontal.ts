import { Editor } from '@tiptap/core'
import { iframeDocument } from '../globalVariables'

export const setupHorizontalRule = (editor: Editor) => {
  const button = iframeDocument.getElementById('horizontal-btn');
  if (!button) return;

  button.addEventListener('click', () => {
    editor.chain().focus().setHorizontalRule().run();
  })
}
