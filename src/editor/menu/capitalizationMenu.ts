import { Editor } from '@tiptap/core'

export const setupCapitalizationMenu = (editor: Editor) => {
  document.getElementById('capitalize-uppercase-btn')?.addEventListener('click', () => {
    editor.chain().focus().setCapitalization('uppercase').run()
  })

  document.getElementById('capitalize-lowercase-btn')?.addEventListener('click', () => {
    editor.chain().focus().setCapitalization('lowercase').run()
  })

  document.getElementById('capitalize-capitalize-btn')?.addEventListener('click', () => {
    editor.chain().focus().setCapitalization('capitalize').run()
  })

  document.getElementById('capitalize-clear-btn')?.addEventListener('click', () => {
    editor.chain().focus().unsetCapitalization().run()
  })
}
