export const setupSpellcheckToggle = () => {
  const toggleBtn = document.getElementById('toggle-spellcheck-btn')
  const editorEl = document.querySelector('.tiptap [contenteditable="true"]') as HTMLElement

  if (!toggleBtn || !editorEl) return

  const updateButtonText = () => {
    const isOn = editorEl.getAttribute('spellcheck') === 'true'
    toggleBtn.textContent = isOn ? 'Spellcheck: ON' : 'Spellcheck: OFF'
  }

  updateButtonText()

  toggleBtn.addEventListener('click', () => {
    const current = editorEl.getAttribute('spellcheck') === 'true'
    editorEl.setAttribute('spellcheck', (!current).toString())
    updateButtonText()
    console.log(`Spellcheck is now ${!current ? 'enabled' : 'disabled'}`)
  })
}
