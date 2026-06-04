import { iframeDocument } from "./globalVariables";

export const createFooter = (editorElement: HTMLDivElement, footerElement: HTMLDivElement, config: any): void => {

    footerElement.classList.add('footer');
    const footerContainer = iframeDocument.createElement('div');
    footerContainer.classList.add('footer-container');
    footerElement.appendChild(footerContainer);
    // footer message
    if (config.footerMessage) {
        const footer = iframeDocument.createElement('span');
        footer.innerText = config.footerMessage;
        footerContainer.appendChild(footer);
    }

    // add word count
    if (config.displayWordCount) {
        const wordCount = iframeDocument.createElement('span');
        wordCount.id = 'word-count';
        wordCount.innerText = 'Words: 0';
        footerContainer.appendChild(wordCount);
    }

    if (config.resize) {
        const dragIcon = iframeDocument.createElement('span');
        dragIcon.className = 'resize-drag-icon';
        dragIcon.title = 'Resize Editor';
        dragIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-down-to-line-icon lucide-arrow-down-to-line"><path d="M8 11.33V2"/>  <path d="m4 7.33 4 4 4-4"/>  <path d="M12.67 14H3.33"/></svg>`;

        footerElement.appendChild(dragIcon);

        dragIcon.addEventListener('mousedown', (e) => {
            e.preventDefault();

            const startY = e.clientY;
            const startHeight = editorElement.offsetHeight;
            const editorHeight = parseFloat(config.height);
            const minHeight = editorHeight ?? 100;

            const onMouseMove = (moveEvent: MouseEvent) => {
                const deltaY = moveEvent.clientY - startY;
                const newHeight = Math.max(minHeight, startHeight + deltaY);
                editorElement.style.height = `${newHeight}px`;
            };
            const onMouseUp = () => {
                iframeDocument.removeEventListener('mousemove', onMouseMove);
                iframeDocument.removeEventListener('mouseup', onMouseUp);
            };
            iframeDocument.addEventListener('mousemove', onMouseMove);
            iframeDocument.addEventListener('mouseup', onMouseUp);
        });
    }
}