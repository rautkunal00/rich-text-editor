import { Editor } from "@tiptap/core";
import { iframeDocument } from "../globalVariables";

export const setupFullscreenToggle = (editor:Editor) => {
  const toggleBtn = iframeDocument.getElementById('fullscreen-btn');
  const editorEle = editor.options.element;
  const wrapperEle = editorEle?.parentElement;

  if (!wrapperEle || !toggleBtn) return;

  let isFloating = false;

  const toggleFloatingEditor = () => {
    isFloating = !isFloating;

    if (isFloating) {
      wrapperEle.classList.add('editor-floating');
      iframeDocument.body.classList.add('editor-floating-active');
    } else {
      wrapperEle.classList.remove('editor-floating');
      iframeDocument.body.classList.remove('editor-floating-active');
    }
  };

    toggleBtn.addEventListener('click', toggleFloatingEditor);

};