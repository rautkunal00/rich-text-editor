import { Editor } from "@tiptap/core";
import { iframeDocument } from "../globalVariables";

declare const lucide: any;
export const showPreview = (editor: Editor) => {
    const previewBtn = iframeDocument.getElementById('preview-btn');

    if(previewBtn) {
      previewBtn.addEventListener('click',()=>{
        showPreviewOverLay(editor)
      })
    }
}

function showPreviewOverLay(editor:Editor){
  const existingPreview = iframeDocument.getElementById('editor-preview-overlay');
  if(existingPreview) existingPreview.remove();

  const htmlContent = editor.getHTML();

  const previewOverLay = iframeDocument.createElement('div');
  previewOverLay.id = 'editor-preview-overlay';
  previewOverLay.className = 'preview-container';

  previewOverLay.innerHTML = `
    <button id="close-preview-btn" class="preview-close-btn" title="Close Preview">
      <i data-lucide="x-circle"></i>
    </button>
    <div id="preview-content" class="preview-content">
      ${htmlContent}
    </div>
  `

  iframeDocument.body.appendChild(previewOverLay);
  iframeDocument.body.style.overflow = "hidden";
  lucide?.createIcons();

  const closeBtn = iframeDocument.getElementById('close-preview-btn');
  closeBtn?.addEventListener('click',()=>{
    previewOverLay.remove();
    iframeDocument.body.style.overflow = "";
  })

}