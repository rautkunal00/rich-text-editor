import { Editor } from '@tiptap/core'
import { iframeDocument } from '../globalVariables'

export const setupFontSize = (editor: Editor) => {
  const select = iframeDocument.getElementById('font-size-select') as HTMLSelectElement | null
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
