import { Editor } from '@tiptap/core';
import { iframeDocument } from '../globalVariables';

export function setupAddAnchorDialog(editor: Editor, editorElement: HTMLDivElement) {
  const dialog = iframeDocument.getElementById('custom-anchor-dialog') as HTMLDivElement;
  const form = iframeDocument.getElementById('anchor-form') as HTMLFormElement;
  const input = iframeDocument.getElementById('anchor-id-input') as HTMLInputElement;
  const cancelBtn = iframeDocument.getElementById('anchor-cancel-btn') as HTMLButtonElement;
  const addAnchorBtn = iframeDocument.getElementById('add-anchor-btn');

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

  if (form) {
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

  if (editorElement) {
    editorElement.addEventListener('click', function (e) {
      const target = e.target;
      if (
        target instanceof HTMLAnchorElement &&
        target.getAttribute('href') &&
        target.getAttribute('href')!.startsWith('#')
      ) {
        e.preventDefault();
        const anchorId = target.getAttribute('href')!.substring(1);
        const anchorEl = iframeDocument.getElementById(anchorId);
        if (anchorEl) {
          anchorEl.scrollIntoView({ behavior: 'smooth' });
          history.replaceState(null, '', `#${anchorId}`);
        }
      }
    });

  }
}

