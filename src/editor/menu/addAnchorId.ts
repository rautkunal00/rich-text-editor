import { Editor } from '@tiptap/core';

export function setupAddAnchorDialog(editor: Editor) {
  const dialog = document.getElementById('custom-anchor-dialog') as HTMLDivElement;
  const form = document.getElementById('anchor-form') as HTMLFormElement;
  const input = document.getElementById('anchor-id-input') as HTMLInputElement;
  const cancelBtn = document.getElementById('anchor-cancel-btn') as HTMLButtonElement;
  const addAnchorBtn = document.getElementById('add-anchor-btn');

  function showDialog() {
    input.value = '';
    dialog.style.display = 'block';
    input.focus();
  }

  function hideDialog() {
    dialog.style.display = 'none';
  }

  addAnchorBtn?.addEventListener('click', () => {
    const selection = editor.state.selection;
    if (selection.empty) {
      alert("Please select some text before adding an anchor.");
      return;
    }

    showDialog();
  });

  cancelBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    hideDialog();
  });

  form.onsubmit = (e) => {
    e.preventDefault();
    const anchorId = input.value.trim();

    if (!anchorId) {
      alert('Please enter an anchor ID.');
      return;
    }

    const selection = editor.state.selection;
    if (selection.empty) {
      alert('No text selected. Please select text first.');
      hideDialog();
      return;
    }

    editor.chain().focus().setMark('anchorMark', { id: anchorId }).run();

    hideDialog();
  };
}

