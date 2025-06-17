
export const createFooter = (footerElement: HTMLDivElement, config: any): void => {
    // footer css
    footerElement.style.display = 'flex';
    footerElement.style.flexDirection = 'row';
    footerElement.style.justifyContent = 'space-between';
    footerElement.style.margin = '2px';
    footerElement.style.fontSize = '12px';
    footerElement.style.color = '#888';
    footerElement.style.background = '#f9f9f9';

    // footer message
    const footer = document.createElement('span');
    footer.innerText = 'Malicious content in code will be automatically removed.';
    footerElement.appendChild(footer);

    // add word count
    const wordCount = document.createElement('span');
    wordCount.id = 'word-count';
    wordCount.innerText = 'Words: 0';
    footerElement.appendChild(wordCount);
}