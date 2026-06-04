import { iframeDocument, iframeWindow } from "../globalVariables";

export const setupFullscreenToggle = () => {
  window.addEventListener('fullscreenchange', () => {
    const isFullscreen = !!document.fullscreenElement;
    document.body.classList.toggle('fullscreen-mode', isFullscreen);
    iframeDocument.body.classList.toggle('fullscreen-mode', isFullscreen);
  });

  const fullscreenBtn = iframeDocument.getElementById('fullscreen-btn');
  fullscreenBtn?.addEventListener('click', () => {
    iframeWindow.parent.postMessage({ type: 'TOGGLE_FULLSCREEN' }, '*');
  });
};
