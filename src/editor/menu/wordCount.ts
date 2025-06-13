import { Editor } from "@tiptap/core"

export const setupWordCount = (editor: Editor) => {
  const updateCount = () => {
    const count = editor.storage.characterCount.words()  // <-- call the function
    const countDisplay = document.getElementById('word-count')
    if (countDisplay) {
      countDisplay.textContent = `Words: ${count}`
    }
  }

  // Update count initially, so the starting content's count is shown
  updateCount()

  // Update count on every editor update
  editor.on('update', updateCount)
}
