import { Editor } from "@tiptap/core";

export function addEmojisAndCharacters(editor: Editor) {
    document.getElementById('insert-emoji-char-btn')?.addEventListener('click', () => {
        const popupContent = createEmojiPopupWithTabs();
        popupContent.addEventListener('emoji-select', (e: any) => {
            editor.commands.insertContent(e.detail);
            editor.commands.closePopup();
        });
        editor.commands.showPopup({
            html: popupContent.outerHTML,
            position: { top: 120, left: 200 },
            closeOnOutsideClick: true,
            onMount: (popup) => {
                popup.replaceWith(popupContent);
                popupContent.focus(); 
            }
        });
    });
}

function createEmojiPopupWithTabs(): HTMLDivElement {
    const categories = {
        Emoji: ['😀', '😂', '😍', '😎', '👍', '🎉', '❤️', '🔥'],
        Symbols: ['©', '®', '™', '✓', '∞', '§', '¶', '•'],
        Math: ['+', '-', '×', '÷', '=', '≠', '<', '≥']
    };

    const container = document.createElement('div');
    container.tabIndex = 0;
    container.style.outline = 'none';
    container.style.width = '240px';
    container.style.border = '1px solid #ccc';
    container.style.borderRadius = '8px';
    container.style.overflow = 'hidden';
    container.style.fontFamily = 'sans-serif';
    container.style.background = '#fff';

    const tabHeader = document.createElement('div');
    const tabContent = document.createElement('div');
    let activeTab = 'Emoji';

    tabHeader.style.display = 'flex';
    tabHeader.style.borderBottom = '1px solid #ddd';
    tabHeader.style.background = '#f8f8f8';

    tabContent.style.padding = '10px';
    tabContent.style.display = 'flex';
    tabContent.style.flexWrap = 'wrap';
    tabContent.style.gap = '8px';

    let focusIndex = 0;

    const renderTab = (tabName: keyof typeof categories) => {
        activeTab = tabName;
        focusIndex = 0;
        tabContent.innerHTML = '';

        categories[tabName].forEach((char, i) => {
            const button = document.createElement('button');
            button.className = 'emoji-btn';
            button.textContent = char;
            button.setAttribute('data-index', i.toString());
            button.style.border = '1px solid #ddd';
            button.style.borderRadius = '4px';
            button.style.padding = '5px 8px';
            button.style.fontSize = '18px';
            button.style.cursor = 'pointer';
            button.style.background = 'white';
            button.tabIndex = -1;

            button.addEventListener('click', () => {
                const event = new CustomEvent('emoji-select', { detail: char });
                container.dispatchEvent(event);
            });

            tabContent.appendChild(button);
        });

        updateFocus();
    };

    const updateFocus = () => {
        const buttons = tabContent.querySelectorAll<HTMLButtonElement>('button');
        buttons.forEach(btn => btn.classList.remove('focused'));
        if (buttons[focusIndex]) {
            buttons[focusIndex].focus();
            buttons[focusIndex].classList.add('focused');
        }
    };

    container.addEventListener('keydown', (e) => {
        const buttons = tabContent.querySelectorAll<HTMLButtonElement>('button');
        const rowLength = 4;

        if (buttons.length === 0) return;

        switch (e.key) {
            case 'ArrowRight':
                focusIndex = (focusIndex + 1) % buttons.length;
                break;
            case 'ArrowLeft':
                focusIndex = (focusIndex - 1 + buttons.length) % buttons.length;
                break;
            case 'ArrowDown':
                focusIndex = (focusIndex + rowLength) % buttons.length;
                break;
            case 'ArrowUp':
                focusIndex = (focusIndex - rowLength + buttons.length) % buttons.length;
                break;
            case 'Enter':
                buttons[focusIndex].click();
                break;
            case 'Tab':
                e.preventDefault();
                const tabKeys = Object.keys(categories);
                const currentIndex = tabKeys.indexOf(activeTab);
                const nextTab = tabKeys[(currentIndex + 1) % tabKeys.length];
                renderTab(nextTab as keyof typeof categories);
                break;
        }

        updateFocus();
    });

    Object.keys(categories).forEach((tabName) => {
        const tabBtn = document.createElement('button');
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


