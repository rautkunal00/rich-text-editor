import { Editor } from '@tiptap/core'

export const setupChecklist = (editor: Editor) => {
  const btn = document.getElementById('checklist-btn')
  if (!btn) return

  btn.addEventListener('click', () => {
    editor.chain().focus().toggleTaskList().run()
  })
}
