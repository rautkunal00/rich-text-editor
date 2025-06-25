import { iframeDocument } from "./globalVariables";
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
        { type: 'button', id: 'strikethrough', label: 'Strikethrough', icon: 'strikethrough' },
        { type: 'palette', id: 'text-color', label: 'Text Color', icon: 'baseline' },
        { type: 'palette', id: 'highlight-color', label: 'Highlight Color', icon: 'highlighter' },
        {
            type: 'select',
            id: 'ordered-list-select',
            label: 'Ordered List',
            options: [
                'Decimal',
                'Lower Alpha',
                'Upper Alpha',
                'Lower Roman',
                'Upper Roman',
                'Greek'
            ],
            icon: 'list-ordered'
        },
        {
            type: 'select',
            id: 'bullet-list-select',
            label: 'Bullet List',
            options: [
                'Disc',
                'Circle',
                'Square',
                'Dash',
                'Checkmark'
            ],
            icon: 'list'
        },
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
            options: ['Paragraph', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
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
                "'Helvetica', sans-serif",
                "'Times New Roman', serif",
                "'Georgia', serif",
                "'Courier New', monospace",
                "'Lucida Console', monospace",
                "'Comic Sans MS', cursive",
                "'Trebuchet MS', sans-serif",
                "'Verdana', sans-serif",
                "'Roboto', sans-serif",
                "'Open Sans', sans-serif",
                "'Lato', sans-serif",
                "'Montserrat', sans-serif",
                "'Oswald', sans-serif",
                "'Poppins', sans-serif",
                "'Noto Sans', sans-serif",
                "'Merriweather', serif",
                "'Source Sans Pro', sans-serif",
                "'Playfair Display', serif",
                "'Fira Code', monospace"
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
        { type: 'button', id: 'subscript', label: 'Subscript', icon: 'subscript' },
        { type: 'button', id: 'superscript', label: 'Superscript', icon: 'superscript' },
        { type: 'button', id: 'spellCheck', label: 'Spellcheck', icon: 'spell-check-2' },
        { type: 'button', id: 'open-search-dialog', label: 'Search & Replace', icon: 'search' },
        { type: 'button', id: 'insert-datetime', label: 'Insert Date & Time', icon: 'calendar-days' },
        { type: 'button', id: 'insert-emoji-char', label: 'Insert Special Characters & Emoji', icon: 'asterisk' },
        { type: 'button', id: 'fullscreen', label: 'Fullscreen', icon: 'expand'},
        { type: 'button', id: 'preview', label: 'Preview', icon: 'scan-eye'},
        { type: 'button', id: 'source-code', label: 'Source Code', icon: 'code' },
        { type: 'button', id: 'horizontal', label: 'Horizontal Line', icon: 'move-horizontal'},
        { type: 'button', id: 'left-to-right', label: 'Left to Right', icon: 'move-right'},
        { type: 'button', id: 'right-to-left', label: 'Right to Left', icon: 'move-left'},
        { type: 'button', id: 'format-painter', label: 'Format Painter', icon: 'paint-roller'},
        { type: 'button', id: 'page-break', label: 'Page Break', icon: 'table-rows-split'},
        { type: 'button', id: 'visual-block', label: 'Visual Blocks', icon: 'layout-panel-top'},
        { type: 'button', id: 'visual-chars', label: 'Visual Characters', icon: 'pilcrow'},
        { type: 'button', id: 'toggle-code', label: 'Toggle Code', icon: 'braces'},
    ];

    const toolbar = iframeDocument.createElement('div');
    toolbar.className = 'toolbar';

    toolbarConfig.forEach((item) => {
        const { type, id, label, icon, options } = item;

        if (type === 'button') {
            const button = iframeDocument.createElement('button');
            button.id = `${id}-btn`;
            button.title = label;
            if (icon) {
                button.innerHTML = `<i data-lucide="${icon}"></i>`;
            } else {
                button.textContent = label;
            }
            toolbar.appendChild(button);
        } else if (type === 'select' && options) {
            const select = iframeDocument.createElement('select');
            select.id = id;

            const defaultOption = iframeDocument.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = label;
            select.appendChild(defaultOption);

            options.forEach((opt) => {
                const option = iframeDocument.createElement('option');
                option.value = opt;
                option.textContent = opt.replace(/['"]+/g, '');
                select.appendChild(option);
            });

            toolbar.appendChild(select);
        } else if (type === 'palette') {
            const button = iframeDocument.createElement('button');
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
