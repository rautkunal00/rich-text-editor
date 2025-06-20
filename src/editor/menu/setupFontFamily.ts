import { Editor } from '@tiptap/core'
import { iframeDocument } from '../globalVariables'

export const setupFontFamily = (editor: Editor) => {
  const select = iframeDocument.getElementById('font-family-select') as HTMLSelectElement | null
  if (!select) {
    console.warn('Font family dropdown not found')
    return
  }

  select.addEventListener('change', () => {
    const family = select.value;
    console.log("select",family)
    if (family) {
      editor.chain().focus().setFontFamily(family).run()
    } else {
      editor.chain().focus().unsetFontFamily().run()
    }
  })
}
