import { Editor } from '@tiptap/core';

export const setupLists = (editor: Editor) => {
    document.getElementById('ordered-list-select')?.addEventListener('change', (e: Event) => {
        const value = (e.target as HTMLSelectElement).value;
        const styles: Record<string, string> = {
            'Decimal': 'decimal',
            'Lower Alpha': 'lower-alpha',
            'Upper Alpha': 'upper-alpha',
            'Lower Roman': 'lower-roman',
            'Upper Roman': 'upper-roman',
            'Greek': 'lower-greek'
        };
        applyAdvancedListStyle(editor, 'ordered', styles[value]);
    });

    document.getElementById('bullet-list-select')?.addEventListener('change', (e: Event) => {
        const value = (e.target as HTMLSelectElement).value;
        const styles: Record<string, string> = {
            'Disc': 'disc',
            'Circle': 'circle',
            'Square': 'square',
            'Dash': '"– "',
            'Checkmark': '"✓ "'
        };
        applyAdvancedListStyle(editor, 'bullet', styles[value]);
    });
}

function applyAdvancedListStyle(editor: Editor, type: 'ordered' | 'bullet', style: string) {
    const nodeType = type === 'ordered' ? 'orderedList' : 'bulletList'
    if (!editor.isActive(nodeType)) {
        editor.chain().focus().toggleList(nodeType, 'listItem').updateAttributes(nodeType, { listStyleType: style }).run()
    } else {
        editor.chain().focus().updateAttributes(nodeType, { listStyleType: style }).run()
    }
}



