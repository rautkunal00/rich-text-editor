import { iframeDocument } from "../globalVariables";

export const setupSpellcheckToggle = () => {
  const toggleBtn = iframeDocument.getElementById('spellCheck-btn'); // Use your toolbar ID

  const getEditorEl = () =>
    iframeDocument.querySelector('.tiptap [contenteditable="true"]') as HTMLElement;

  if (!toggleBtn) return;

  let spellcheckEnabled = false;

  const updateButtonText = () => {
    toggleBtn.textContent = spellcheckEnabled
      ? 'Spellcheck: ON'
      : 'Spellcheck: OFF';
  };

  const applySpellcheck = () => {
    const editorEl = getEditorEl();
    if (!editorEl) return;

    editorEl.spellcheck = spellcheckEnabled;

    editorEl.blur();
    setTimeout(() => {
      editorEl.focus();
    }, 0);

    updateButtonText();
  };

  applySpellcheck();

  toggleBtn.addEventListener('click', () => {
    spellcheckEnabled = !spellcheckEnabled;
    applySpellcheck();
  });
};
