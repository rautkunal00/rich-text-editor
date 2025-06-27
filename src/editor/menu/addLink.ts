import { Editor } from '@tiptap/core';
import { iframeDocument, iframeWindow } from '../globalVariables';

// fetching the existing ids
function getAnchorIds(editor: Editor): string[] {
  const ids = new Set<string>();

  editor.state.doc.descendants((node) => {
    if (node.attrs?.id) {
      ids.add(node.attrs.id);
    }

    if (node.marks) {
      node.marks.forEach((mark) => {
        if (mark.attrs?.id) {
          ids.add(mark.attrs.id);
        }
      });
    }
  });

  return Array.from(ids);
}

function createLinkPopup(editor: Editor): HTMLDivElement {
  const container = iframeDocument.createElement('div');
  container.style.width = '320px';
  container.style.padding = '16px';
  container.style.background = '#fff';
  container.style.fontFamily = 'sans-serif';
  container.style.zIndex = '9999';
  container.style.maxHeight = '70vh';
  container.style.overflowY = 'auto';

  const heading = iframeDocument.createElement('h3');
  heading.textContent = 'Insert/Edit Link';
  heading.style.marginBottom = '12px';

  const form = iframeDocument.createElement('form');
  form.id = 'link-form';

  const inputTextLabel = iframeDocument.createElement('label');
  inputTextLabel.textContent = 'Text to display:';

  const inputText = iframeDocument.createElement('input');
  inputText.type = 'text';
  inputText.id = 'link-text';
  inputText.style.width = '100%';
  inputText.style.margin = '6px 0';

  const inputUrlLabel = iframeDocument.createElement('label');
  inputUrlLabel.textContent = 'URL (optional):';

  const inputUrl = iframeDocument.createElement('input');
  inputUrl.type = 'text';
  inputUrl.id = 'link-url';
  inputUrl.style.width = '100%';
  inputUrl.style.margin = '6px 0';
  inputUrl.placeholder = 'Enter full URL or leave empty';

  const anchorLabel = iframeDocument.createElement('label');
  anchorLabel.textContent = 'Anchor (existing or new):';

  const anchorInput = iframeDocument.createElement('input');
  anchorInput.type = 'text';
  anchorInput.id = 'link-anchor';
  anchorInput.style.width = '100%';
  anchorInput.style.margin = '6px 0';
  anchorInput.setAttribute('list', 'existing-anchor-ids');
  anchorInput.placeholder = 'Select or type anchor id';

  // creating icon for closing the popup
  const closePopBtn = iframeDocument.createElement('button');
  closePopBtn.type = 'button';
  closePopBtn.title = 'Close';
  closePopBtn.innerHTML = `<i data-lucide="x"></i>`;
  closePopBtn.className = 'close-popup-btn';
  closePopBtn.addEventListener('click', () => {
    editor.commands.closePopup();
  });

  const datalist = iframeDocument.createElement('datalist');
  datalist.id = 'existing-anchor-ids';
  getAnchorIds(editor).forEach(id => {
    const option = iframeDocument.createElement('option');
    option.value = `#${id}`;
    datalist.appendChild(option);
  });

  container.appendChild(datalist);

  const targetLabel = iframeDocument.createElement('label');
  targetLabel.style.display = 'block';
  targetLabel.style.margin = '6px 0';

  const checkbox = iframeDocument.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'link-target';

  targetLabel.appendChild(checkbox);
  targetLabel.appendChild(iframeDocument.createTextNode(' Open in new window'));

  const buttonRow = iframeDocument.createElement('div');
  buttonRow.style.marginTop = '12px';

  const submitBtn = iframeDocument.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'OK';
  submitBtn.style.marginRight = '10px';

  const cancelBtn = iframeDocument.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.id = 'link-cancel';

  buttonRow.appendChild(submitBtn);
  buttonRow.appendChild(cancelBtn);

  form.appendChild(inputTextLabel);
  form.appendChild(inputText);
  form.appendChild(inputUrlLabel);
  form.appendChild(inputUrl);
  form.appendChild(anchorLabel);
  form.appendChild(anchorInput);
  form.appendChild(targetLabel);
  form.appendChild(buttonRow);

  container.appendChild(heading);
  container.appendChild(form);
  container.appendChild(closePopBtn);

  form.onsubmit = e => {
    e.preventDefault();

    let url = inputUrl.value.trim();
    let anchor = anchorInput.value.trim();
    const openInNewWindow = checkbox.checked;
    const text = inputText.value.trim();

    if (anchor) {
      if (!anchor.startsWith('#')) {
        anchor = '#' + anchor;
      }
      url = anchor;
    } else if (url && !url.startsWith('http') && !url.startsWith('#')) {
      url = '#' + url;
    }

    if (!url) {
      alert('Please enter a URL or select/enter an anchor.');
      return;
    }

    const linkAttrs: { href: string; target?: string; rel?: string } = { href: url };
    if (openInNewWindow) {
      linkAttrs.target = '_blank';
      linkAttrs.rel = 'noopener noreferrer';
    }

    const anchorHTML = `<a href="${linkAttrs.href}"${linkAttrs.target ? ` target="${linkAttrs.target}" rel="${linkAttrs.rel}"` : ''}>${text || url}</a>`;
    editor.chain().focus().insertContent(anchorHTML).run();

    editor.commands.closePopup();
  };

  cancelBtn.onclick = () => {
    editor.commands.closePopup();
  };

  return container;
}

export const setupAddLink = (editor: Editor) => {
  const button = iframeDocument.getElementById('add-link-btn');
  if (!button) return;

  button.addEventListener('click', () => {
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, ' ');

    const popupContent = createLinkPopup(editor);
    const input = popupContent.querySelector('#link-text') as HTMLInputElement;
    if (input) input.value = selectedText || '';

    const popupWidth = 280;
    const popupHeight = 250;

    const viewportWidth = iframeWindow.innerWidth;
    const viewportHeight = iframeWindow.innerHeight;

    const left = (viewportWidth - popupWidth) / 2 + iframeWindow.screenX;
    const top = (viewportHeight - popupHeight) / 2 + iframeWindow.screenY;

    editor.commands.showPopup({
      html: popupContent,
      position: { top, left },
      closeOnOutsideClick: true,
    });

    const lucide = (iframeWindow as any).lucide;
    if (typeof lucide?.createIcons === 'function') {
      lucide.createIcons();
    }
  });
};
