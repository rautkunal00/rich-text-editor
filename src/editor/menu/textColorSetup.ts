import { Editor } from '@tiptap/core'
import { iframeDocument } from '../globalVariables'

export const setupTextColor = (editor: Editor) => {
  iframeDocument.getElementById('text-red-btn')?.addEventListener('click', () => {
    editor.chain().focus().setTextColor('red').run()
  })
  iframeDocument.getElementById('text-blue-btn')?.addEventListener('click', () => {
    editor.chain().focus().setTextColor('blue').run()
  })
  iframeDocument.getElementById('text-clear-btn')?.addEventListener('click', () => {
    editor.chain().focus().unsetTextColor().run()
  })
}
