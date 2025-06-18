import { Editor } from "@tiptap/core"

export const setupWordCount = (editor: Editor) => {
  const updateCount = () => {
    const count = editor.storage.characterCount.words();
    const countDisplay = document.getElementById('word-count');
    if (countDisplay) {
      countDisplay.textContent = `Words: ${count}`;
    }
  }
  updateCount();
  editor.on('update', updateCount);
}
