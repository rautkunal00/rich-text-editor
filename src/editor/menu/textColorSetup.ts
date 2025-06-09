import { Editor } from '@tiptap/core'

export const setupTextColor = (editor: Editor) => {
  document.getElementById('text-red-btn')?.addEventListener('click', () => {
    editor.chain().focus().setTextColor('red').run()
  })
  document.getElementById('text-blue-btn')?.addEventListener('click', () => {
    editor.chain().focus().setTextColor('blue').run()
  })
  document.getElementById('text-clear-btn')?.addEventListener('click', () => {
    editor.chain().focus().unsetTextColor().run()
  })
}
