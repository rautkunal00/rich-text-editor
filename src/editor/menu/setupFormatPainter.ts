import { Editor } from '@tiptap/core'

let copiedMarks: { type: string; attrs: any }[] = []

export const setupFormatPainter = (editor: Editor) => {
  const copyBtn = document.getElementById('format-copy-btn')
  const applyBtn = document.getElementById('format-apply-btn')

  copyBtn?.addEventListener('click', () => {
    const { from, to, empty } = editor.state.selection
    if (empty || from === to) {
      alert('Select some text to copy formatting from.')
      return
    }

    const slice = editor.state.doc.cut(from, to)
    const marksSet = new Set<string>()
    copiedMarks = []

    slice.content.descendants((node) => {
      node.marks.forEach((mark) => {
        if (!marksSet.has(mark.type.name)) {
          marksSet.add(mark.type.name)
          copiedMarks.push({ type: mark.type.name, attrs: mark.attrs })
        }
      })
      return true
    })

    if (copiedMarks.length === 0) {
      alert('No formatting found in the selected text.')
    } else {
      alert('Formatting copied.')
    }
  })

  applyBtn?.addEventListener('click', () => {
    const { from, to, empty } = editor.state.selection
    if (empty || from === to) {
      alert('Select text to apply formatting.')
      return
    }

    if (copiedMarks.length === 0) {
      alert('No formatting copied yet.')
      return
    }

    let chain = editor.chain().focus().setTextSelection({ from, to })

    copiedMarks.forEach(({ type, attrs }) => {
      chain = chain.setMark(type, attrs)
    })

    chain.run()
  })
}
