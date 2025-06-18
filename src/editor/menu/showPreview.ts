import { Editor } from "@tiptap/core";

declare const lucide: any;
export const showPreview = (editor: Editor) => {
    const previewBtn = document.getElementById('preview-btn');

    if(previewBtn) {
      previewBtn.addEventListener('click',()=>{
        showPreviewOverLay(editor)
      })
    }
}

function showPreviewOverLay(editor:Editor){
  const existingPreview = document.getElementById('editor-preview-overlay');
  if(existingPreview) existingPreview.remove();

  const htmlContent = editor.getHTML();

  const previewOverLay = document.createElement('div');
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

  document.body.appendChild(previewOverLay);
  document.body.style.overflow = "hidden";
  lucide?.createIcons();

  const closeBtn = document.getElementById('close-preview-btn');
  closeBtn?.addEventListener('click',()=>{
    previewOverLay.remove();
    document.body.style.overflow = "";
  })

}