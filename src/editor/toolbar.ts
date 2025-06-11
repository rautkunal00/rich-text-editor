import { highlightInit } from "./menu/highlight";
import { textColorInit } from "./menu/textColor";

type ToolbarItem =
    | [string, string] // [id, label]
    | {
        type: 'select';
        id: string;
        label: string;
        options: string[];
    }
    | {
        type: 'palette';
        id: string;
        label: string;
    };

export function createToolbar(editor: any): HTMLElement {
    const toolbarConfig: ToolbarItem[] = [
        ['bold', 'Bold'],
        ['italic', 'Italic'],
        ['underline', 'Underline'],
        { type: 'palette', id: 'text-color', label: 'Text Color' },
        { type: 'palette', id: 'highlight-color', label: 'Highlight Color' },
        ['bullet-list', 'Bullet List'],
        ['ordered-list', 'Ordered List'],
        ['align-left', 'Left'],
        ['align-center', 'Center'],
        ['align-right', 'Right'],
        ['align-justify', 'Justify'],
        ['insert-table', 'Insert Table'],
        ['add-row', 'Add Row'],
        ['add-col', 'Add Col'],
        ['delete-row', 'Delete Row'],
        ['delete-col', 'Delete Col'],
        ['delete-table', 'Delete Table'],
        ['image-upload', 'Add Image'],
        ['undo', 'Undo'],
        ['redo', 'Redo'],
        ['clear-formatting', 'Clear Formatting'],
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
        ['capitalize-uppercase', 'Uppercase'],
        ['capitalize-lowercase', 'Lowercase'],
        ['capitalize-capitalize', 'Capitalize'],
        ['capitalize-clear', 'Clear Capitalization'],
        ['checklist', 'Checklist'],
    ];

    const toolbar = document.createElement('div');
    toolbar.className = 'toolbar';

    toolbarConfig.forEach((item) => {
        if (Array.isArray(item)) {
            const [id, label] = item;
            const button = document.createElement('button');
            button.id = `${id}-btn`;
            button.textContent = label;
            toolbar.appendChild(button);
        } else if (item.type === 'select') {
            const select = document.createElement('select');
            select.id = item.id;

            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = item.label;
            select.appendChild(defaultOption);

            item.options.forEach((opt) => {
                const option = document.createElement('option');
                option.value = opt;
                option.textContent = opt.replace(/['"]+/g, '');
                select.appendChild(option);
            });

            toolbar.appendChild(select);
        } else if (item.type === 'palette') {
            const { type, id, label } = item;
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
