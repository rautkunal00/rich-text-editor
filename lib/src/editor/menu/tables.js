export const setupTableMenu = (editor) => {
    var _a, _b, _c, _d, _e, _f;
    (_a = document.getElementById('insert-table-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    });
    (_b = document.getElementById('add-row-btn')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
        editor.chain().focus().addRowAfter().run();
    });
    (_c = document.getElementById('add-col-btn')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
        editor.chain().focus().addColumnAfter().run();
    });
    (_d = document.getElementById('delete-row-btn')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', () => {
        editor.chain().focus().deleteRow().run();
    });
    (_e = document.getElementById('delete-col-btn')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', () => {
        editor.chain().focus().deleteColumn().run();
    });
    (_f = document.getElementById('delete-table-btn')) === null || _f === void 0 ? void 0 : _f.addEventListener('click', () => {
        editor.chain().focus().deleteTable().run();
    });
};
