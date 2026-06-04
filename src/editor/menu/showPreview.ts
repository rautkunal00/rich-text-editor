import { Editor } from "@tiptap/core";
import { iframeDocument, iframeWindow } from "../globalVariables";

export const showPreview = (editor: Editor) => {
    const previewBtn = iframeDocument.getElementById('preview-btn');

    if(previewBtn) {
      previewBtn.addEventListener('click',()=>{
        showPreviewOverLay(editor);
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
      <i data-lucide="x"></i>
    </button>
    <div id="preview-content" class="preview-content">
      ${htmlContent}
    </div>
  `

  const overlay = iframeDocument.createElement('div');
  overlay.id = 'editor-preview-overlay-bg';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0, 0, 0, 0.3)';
  overlay.style.zIndex = '9998';
  overlay.style.transition = 'background 0.2s ease-in-out';

  iframeDocument.body.appendChild(overlay);
  iframeDocument.body.appendChild(previewOverLay);
  iframeDocument.body.style.overflow = "hidden";
  (iframeWindow as any).lucide?.createIcons();


  const cleanUp = () => {
    overlay.remove();
    previewOverLay.remove();
    iframeDocument.removeEventListener('keydown',escHandler);
    iframeDocument.removeEventListener('click',outsideClickHandler);
  }

  const closeBtn = iframeDocument.getElementById('close-preview-btn');
  closeBtn?.addEventListener('click',cleanUp);

  const escHandler = (e:KeyboardEvent) => {
    if(e.key === 'Escape'){
      cleanUp();
    }
  }
  iframeDocument.addEventListener('keydown',escHandler);

  const outsideClickHandler = (e:MouseEvent) => {
    if(!previewOverLay.contains(e.target as Node)){
      cleanUp();
    }
  }
  setTimeout(()=>{
    iframeDocument.addEventListener('click',outsideClickHandler);
  },0)

}