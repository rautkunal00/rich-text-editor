import { Editor } from "@tiptap/core"
import { iframeDocument } from "../globalVariables";

export const setupWordCount = (editor: Editor) => {
  const updateCount = () => {
    const count = editor.storage.characterCount.words();
    const countDisplay = iframeDocument.getElementById('word-count');
    if (countDisplay) {
      countDisplay.textContent = `Words: ${count}`;
    }
  }
  updateCount();
  editor.on('update', updateCount);
}
