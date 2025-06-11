import { highlightInit } from "./menu/highlight";
import { textColorInit } from "./menu/textColor";

type ToolbarItem = {
    type: 'button' | 'select' | 'palette';
    id: string;
    label: string;
    options?: string[];
};

export function createToolbar(editor: any): HTMLElement {
    const toolbarConfig: ToolbarItem[] = [
        { type: 'button', id: 'undo', label: 'Undo' },
        { type: 'button', id: 'redo', label: 'Redo' },
        { type: 'button', id: 'bold', label: 'Bold' },
        { type: 'button', id: 'italic', label: 'Italic' },
        { type: 'button', id: 'underline', label: 'Underline' },
        { type: 'palette', id: 'text-color', label: 'Text Color' },
        { type: 'palette', id: 'highlight-color', label: 'Highlight Color' },
        { type: 'button', id: 'bullet-list', label: 'Bullet List' },
        { type: 'button', id: 'ordered-list', label: 'Ordered List' },
        { type: 'button', id: 'align-left', label: 'Left' },
        { type: 'button', id: 'align-center', label: 'Center' },
        { type: 'button', id: 'align-right', label: 'Right' },
        { type: 'button', id: 'align-justify', label: 'Justify' },
        { type: 'button', id: 'clear-formatting', label: 'Clear Formatting' },
        { type: 'button', id: 'image-upload', label: 'Add Image' },
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
        { type: 'button', id: 'capitalize-uppercase', label: 'Uppercase' },
        { type: 'button', id: 'capitalize-lowercase', label: 'Lowercase' },
        { type: 'button', id: 'capitalize-capitalize', label: 'Capitalize' },
        { type: 'button', id: 'capitalize-clear', label: 'Clear Capitalization' },
        { type: 'button', id: 'add-anchor', label: 'Add Anchor' },
        { type: 'button', id: 'add-link', label: 'Add Link' },
        { type: 'button', id: 'checklist', label: 'Checklist' },
        { type: 'button', id: 'insert-table', label: 'Insert Table' },
        { type: 'button', id: 'add-row', label: 'Add Row' },
        { type: 'button', id: 'add-col', label: 'Add Col' },
        { type: 'button', id: 'delete-row', label: 'Delete Row' },
        { type: 'button', id: 'delete-col', label: 'Delete Col' },
        { type: 'button', id: 'delete-table', label: 'Delete Table' },
        { type: 'button', id:'subscript', label: 'Subscript'},
        { type: 'button', id:'superscript', label: 'Superscript'},
        { type: 'button', id:'spellCheck', label:'Spellcheck'}
    ];

    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';

    toolbarConfig.forEach((item) => {
        const { type, id, label, options } = item;

        if (type === 'button') {
            const button = document.createElement('button');
            button.id = `${id}-btn`;
            button.textContent = label;
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
            button.textContent = label;
            button.id = `${id}-btn`;
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
