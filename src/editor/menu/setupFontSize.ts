import { Editor } from '@tiptap/core'

export const setupFontSize = (editor: Editor) => {
  const select = document.getElementById('font-size-select') as HTMLSelectElement | null
  if (!select) return

  select.addEventListener('change', () => {
    const size = select.value;
    if (size) {
      editor.chain().focus().setFontSize(size).run()
    } else {
      editor.chain().focus().unsetFontSize().run()
    }
  })
}
