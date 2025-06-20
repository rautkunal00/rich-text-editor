import { Editor } from '@tiptap/core'
import { iframeDocument } from '../globalVariables'

export const setupChecklist = (editor: Editor) => {
  const btn = iframeDocument.getElementById('checklist-btn')
  if (!btn) return

  btn.addEventListener('click', () => {
    editor.chain().focus().toggleTaskList().run()
  })
}
