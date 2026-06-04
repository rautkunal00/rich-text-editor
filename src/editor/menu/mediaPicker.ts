import { iframeWindow, iframeDocument } from '../globalVariables';
import { Editor } from '@tiptap/core';

export const setupMediaUpload = (editor: Editor) => {
  const button = iframeDocument.getElementById('media-upload-btn');
  if (!button) return;

  button.addEventListener('click', () => {
    editor.commands.showPopup({
      html: createMediaInputPopup(
        iframeDocument,
        (url) => {
          const trimmedUrl = url.trim();
          const lowerUrl = trimmedUrl.toLowerCase();

          // YouTube URL
          const ytMatch = trimmedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
          if (ytMatch) {
            const embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
            editor.commands.insertMedia({ src: embedUrl, type: 'video' });
            editor.commands.closePopup();
            return;
          }

          // Vimeo
          const vimeoMatch = trimmedUrl.match(/vimeo\.com\/(\d+)/);
          if (vimeoMatch) {
            const embedUrl = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
            editor.commands.insertMedia({ src: embedUrl, type: 'video' });
            editor.commands.closePopup();
            return;
          }

          // Audio / Video extensions
          const ext = trimmedUrl.split('.').pop()?.toLowerCase() || '';
          const isVideo = ['mp4', 'webm', 'mov'].includes(ext);
          const isAudio = ['mp3', 'ogg', 'wav'].includes(ext);

          if (isVideo) {
            editor.commands.insertMedia({ src: trimmedUrl, type: 'video' });
          } else if (isAudio) {
            editor.commands.insertMedia({ src: trimmedUrl, type: 'audio' });
          } else {
            alert('Unsupported URL. Please enter a valid YouTube, Vimeo, audio, or video link.');
            return;
          }

          editor.commands.closePopup();
        },
        () => editor.commands.closePopup()
      ),
      center: true,
      closeOnOutsideClick: true,
    });
  });
};

const createMediaInputPopup = (
  iframeDocument: Document,
  onInsert: (url: string) => void,
  onCancel: () => void = () => {}
) => {
  const container = iframeDocument.createElement('div');
  container.style.padding = '12px';
  container.style.minWidth = '280px';

  const title = iframeDocument.createElement('h3');
  title.innerText = 'Insert Media';
  title.style.marginBottom = '10px';

  const input = iframeDocument.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter media URL (YouTube, Vimeo, .mp4, .mp3)';
  input.style.width = '100%';
  input.style.padding = '6px';
  input.style.marginBottom = '10px';

  const buttons = iframeDocument.createElement('div');
  buttons.style.textAlign = 'right';

  const cancelBtn = iframeDocument.createElement('button');
  cancelBtn.innerText = 'Cancel';
  cancelBtn.onclick = () => onCancel();

  const insertBtn = iframeDocument.createElement('button');
  insertBtn.innerText = 'Insert';
  insertBtn.style.marginLeft = '8px';
  insertBtn.onclick = () => {
    const url = input.value.trim();
    if (url) onInsert(url);
  };

  buttons.append(cancelBtn, insertBtn);
  container.append(title, input, buttons);
  return container;
};
