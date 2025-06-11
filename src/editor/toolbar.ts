import { highlightInit } from "./menu/highlight";
import { textColorInit } from "./menu/textColor";


export type ToolbarItem = {
    type: 'button' | 'select' | 'palette';
    id: string;
    label: string;
    icon?: string;
    options?: string[];
};

export function createToolbar(editor: any): HTMLElement {
    const toolbarConfig: ToolbarItem[] = [
        { type: 'button', id: 'undo', label: 'Undo', icon: 'undo-2' },
        { type: 'button', id: 'redo', label: 'Redo', icon: 'redo-2' },
        { type: 'button', id: 'bold', label: 'Bold', icon: 'bold' },
        { type: 'button', id: 'italic', label: 'Italic', icon: 'italic' },
        { type: 'button', id: 'underline', label: 'Underline', icon: 'underline' },
        { type: 'palette', id: 'text-color', label: 'Text Color', icon: 'baseline' },
        { type: 'palette', id: 'highlight-color', label: 'Highlight Color', icon: 'highlighter' },
        { type: 'button', id: 'bullet-list', label: 'Bullet List', icon: 'list' },
        { type: 'button', id: 'ordered-list', label: 'Ordered List', icon: 'list-ordered' },
        { type: 'button', id: 'align-left', label: 'Left', icon: 'align-left' },
        { type: 'button', id: 'align-center', label: 'Center', icon: 'align-center' },
        { type: 'button', id: 'align-right', label: 'Right', icon: 'align-right' },
        { type: 'button', id: 'align-justify', label: 'Justify', icon: 'align-justify' },
        { type: 'button', id: 'clear-formatting', label: 'Clear Formatting', icon: 'remove-formatting' },
        { type: 'button', id: 'image-upload', label: 'Add Image', icon: 'image' },
        {
            type: 'select',
            id: 'heading-select',
            label: 'Headings',
            options: ['paragraph', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        },
        {
            type: 'select',
            id: 'font-size-select',
            label: 'Font Size',
            options: ['12px', '14px', '16px', '18px', '20px', '24px', '28px'],
        },
        {
            type: 'select',
            id: 'font-family-select',
            label: 'Font Family',
            options: [
                'Arial, sans-serif',
                "'Times New Roman', serif",
                "'Courier New', monospace",
                "'Georgia', serif",
                "'Comic Sans MS', cursive",
            ],
        },
        {
            type: 'select',
            id: 'capitalize-select',
            label: 'Capitalization',
            options: ['Uppercase', 'Lowercase', 'Capitalize']
        },
        { type: 'button', id: 'add-anchor', label: 'Add Anchor', icon: 'anchor' },
        { type: 'button', id: 'add-link', label: 'Add Link', icon: 'link' },
        { type: 'button', id: 'checklist', label: 'Checklist', icon: 'check-square' },
        { type: 'button', id: 'insert-table', label: 'Insert Table', icon: 'table' },
        { type: 'button', id: 'add-row', label: 'Add Row', icon: 'between-horizontal-start' },
        { type: 'button', id: 'add-col', label: 'Add Col', icon: 'between-vertical-start' },
        { type: 'button', id: 'delete-row', label: 'Delete Row', icon: 'list-minus' },
        { type: 'button', id: 'delete-col', label: 'Delete Col', icon: 'columns-3-cog' },
        { type: 'button', id: 'delete-table', label: 'Delete Table', icon: 'grid-2x2-x' },
        { type: 'button', id:'subscript', label: 'Subscript'},
        { type: 'button', id:'superscript', label: 'Superscript'},
        { type: 'button', id:'spellCheck', label:'Spellcheck'},
        { type: 'button', id:'open-search-dialog', label:'Search & Replace'}
    ];

    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';

    toolbarConfig.forEach((item) => {
        const { type, id, label, icon, options } = item;

        if (type === 'button') {
            const button = document.createElement('button');
            button.id = `${id}-btn`;
            button.title = label;
            if (icon) {
                button.innerHTML = `<i data-lucide="${icon}"></i>`;
            } else {
                button.textContent = label;
            }
            toolbar.appendChild(button);
        } else if (type === 'select' && options) {
            const select = document.createElement('select');
            select.id = id;

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = label;
            select.appendChild(defaultOption);

            options.forEach((opt) => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt.replace(/['"]+/g, '');
                select.appendChild(option);
            });

            toolbar.appendChild(select);
        } else if (type === 'palette') {
            const button = document.createElement('button');
            button.id = `${id}-btn`;
            button.title = label;
            if (icon) {
                button.innerHTML = `<i data-lucide="${icon}"></i>`;
            } else {
                button.textContent = label;
            }
            toolbar.appendChild(button);

            switch (id) {
                case 'text-color':
                    textColorInit(button, editor, toolbar);
                    break;
                case 'highlight-color':
                    highlightInit(button, editor, toolbar);
                    break;
            }
        }
    });

    return toolbar;
}
