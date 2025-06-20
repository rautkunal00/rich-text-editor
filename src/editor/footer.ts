import { iframeDocument } from "./globalVariables";

export const createFooter = (footerElement: HTMLDivElement, config: any): void => {

    footerElement.classList.add('footer');
    // footer message
    if (config.footerMessage) {
        const footer = iframeDocument.createElement('span');
        footer.innerText = config.footerMessage;
        footerElement.appendChild(footer);
    }

    // add word count
    if (config.displayWordCount) {
        const wordCount = iframeDocument.createElement('span');
        wordCount.id = 'word-count';
        wordCount.innerText = 'Words: 0';
        footerElement.appendChild(wordCount);
    }
}