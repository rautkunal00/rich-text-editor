import { Editor } from '@tiptap/core'

export const setupClearFormatting  = (editor: Editor) => {
  const button = document.getElementById('clear-formatting-btn')
  if (!button) return

  button.addEventListener('click', () => {
    editor.chain().focus().unsetAllMarks().clearNodes().run()
  })
}
