import { Editor } from '@tiptap/core';

export const setupTableMenu = (editor: Editor) => {
    document.getElementById('insert-table-btn')?.addEventListener('click', () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    });
    document.getElementById('add-row-btn')?.addEventListener('click', () => {
        editor.chain().focus().addRowAfter().run();
    });
    document.getElementById('add-col-btn')?.addEventListener('click', () => {
        editor.chain().focus().addColumnAfter().run();
    });
    document.getElementById('delete-row-btn')?.addEventListener('click', () => {
        editor.chain().focus().deleteRow().run();
    });
    document.getElementById('delete-col-btn')?.addEventListener('click', () => {
        editor.chain().focus().deleteColumn().run();
    });
    document.getElementById('delete-table-btn')?.addEventListener('click', () => {
        editor.chain().focus().deleteTable().run();
    });
}