import { Editor } from '@tiptap/core';
import { iframeDocument } from '../globalVariables';

export const setupTableMenu = (editor: Editor) => {
    iframeDocument.getElementById('insert-table-btn')?.addEventListener('click', () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    });
    iframeDocument.getElementById('add-row-btn')?.addEventListener('click', () => {
        editor.chain().focus().addRowAfter().run();
    });
    iframeDocument.getElementById('add-col-btn')?.addEventListener('click', () => {
        editor.chain().focus().addColumnAfter().run();
    });
    iframeDocument.getElementById('delete-row-btn')?.addEventListener('click', () => {
        editor.chain().focus().deleteRow().run();
    });
    iframeDocument.getElementById('delete-col-btn')?.addEventListener('click', () => {
        editor.chain().focus().deleteColumn().run();
    });
    iframeDocument.getElementById('delete-table-btn')?.addEventListener('click', () => {
        editor.chain().focus().deleteTable().run();
    });
}