import { Editor } from "@tiptap/core";
import { iframeDocument } from "../globalVariables";

export const setupUndoRedo = (editor: Editor) => {
   iframeDocument.getElementById('undo-btn')?.addEventListener('click', () => {
    editor.chain().focus().undo().run();
  });

  iframeDocument.getElementById('redo-btn')?.addEventListener('click', () => {
    editor.chain().focus().redo().run();
  });
}