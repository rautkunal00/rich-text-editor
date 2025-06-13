import { Editor } from "@tiptap/core";

export const setupUndoRedo = (editor: Editor) => {
   document.getElementById('undo-btn')?.addEventListener('click', () => {
    editor.chain().focus().undo().run();
  });

  document.getElementById('redo-btn')?.addEventListener('click', () => {
    editor.chain().focus().redo().run();
  });
}