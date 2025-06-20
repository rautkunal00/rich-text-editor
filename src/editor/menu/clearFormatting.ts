import { Editor } from '@tiptap/core'
import { iframeDocument } from '../globalVariables'

export const setupClearFormatting  = (editor: Editor) => {
  const button = iframeDocument.getElementById('clear-formatting-btn')
  if (!button) return

  button.addEventListener('click', () => {
    editor.chain().focus().unsetAllMarks().clearNodes().run()
  })
}
