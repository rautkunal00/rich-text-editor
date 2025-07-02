import { Editor } from "@tiptap/core";
import { iframeDocument, iframeWindow } from "../globalVariables";

export const addEmojisAndCharacters = (editor: Editor) => {
    const button = iframeDocument.getElementById('insert-emoji-char-btn');
    button?.addEventListener('click', () => {
        const popupContent = createEmojiPopupWithTabs();
        popupContent.addEventListener('emoji-select', (e: any) => {
            editor.commands.insertContent(e.detail);
        });
        // get position for popup
        const rect = button.getBoundingClientRect();
        const top = rect.bottom + iframeWindow.scrollY;
        const left = rect.left + iframeWindow.scrollX;

        editor.commands.showPopup({
            html: popupContent,
            position: { top: top, left: left },
            closeOnOutsideClick: true
        });
    });
}

const createEmojiPopupWithTabs = (): HTMLDivElement => {
    const categories = {
        Emoji: ['😀', '😂', '😍', '😎', '👍', '🎉', '❤️', '🔥'],
        Symbols: ['©', '®', '™', '✓', '∞', '§', '¶', '•'],
        Math: ['+', '-', '×', '÷', '=', '≠', '<', '≥']
    };

    const container = iframeDocument.createElement('div');
    container.style.width = '240px';
    container.style.border = '1px solid #ccc';
    container.style.borderRadius = '8px';
    container.style.overflow = 'hidden';
    container.style.fontFamily = 'sans-serif';
    container.style.background = '#fff';

    const tabHeader = iframeDocument.createElement('div');
    const tabContent = iframeDocument.createElement('div');
    let activeTab = 'Emoji';

    tabHeader.style.display = 'flex';
    tabHeader.style.borderBottom = '1px solid #ddd';
    tabHeader.style.background = '#f8f8f8';

    tabContent.style.padding = '10px';
    tabContent.style.display = 'flex';
    tabContent.style.flexWrap = 'wrap';
    tabContent.style.gap = '8px';

    const renderTab = (tabName: keyof typeof categories) => {
        activeTab = tabName;
        tabContent.innerHTML = '';

        categories[tabName].forEach((char) => {
            const button = iframeDocument.createElement('button');
            button.className = 'emoji-btn';
            button.textContent = char;
            button.style.border = '1px solid #ddd';
            button.style.borderRadius = '4px';
            button.style.padding = '5px 8px';
            button.style.fontSize = '18px';
            button.style.cursor = 'pointer';
            button.style.background = 'white';

            button.addEventListener('click', () => {
                const event = new CustomEvent('emoji-select', { detail: char });
                container.dispatchEvent(event);
            });

            tabContent.appendChild(button);
        });
    };

    Object.keys(categories).forEach((tabName) => {
        const tabBtn = iframeDocument.createElement('button');
        tabBtn.textContent = tabName;
        tabBtn.style.flex = '1';
        tabBtn.style.padding = '6px';
        tabBtn.style.border = 'none';
        tabBtn.style.background = tabName === activeTab ? '#fff' : '#eee';
        tabBtn.style.cursor = 'pointer';
        tabBtn.style.fontWeight = tabName === activeTab ? 'bold' : 'normal';

        tabBtn.addEventListener('click', () => {
            renderTab(tabName as keyof typeof categories);
            Array.from(tabHeader.children).forEach((child) => {
                (child as HTMLElement).style.background = '#eee';
                (child as HTMLElement).style.fontWeight = 'normal';
            });
            tabBtn.style.background = '#fff';
            tabBtn.style.fontWeight = 'bold';
        });

        tabHeader.appendChild(tabBtn);
    });

    container.appendChild(tabHeader);
    container.appendChild(tabContent);
    renderTab(activeTab as keyof typeof categories);

    return container;
}



