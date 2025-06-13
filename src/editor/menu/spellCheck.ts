export const setupSpellcheckToggle = () => {
  const toggleBtn = document.getElementById('spellCheck-btn'); // Use your toolbar ID

  const getEditorEl = () =>
    document.querySelector('.tiptap [contenteditable="true"]') as HTMLElement;

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
