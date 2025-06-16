export const setupAddLink = (editor) => {
    var _a;
    const dialog = document.getElementById('custom-link-dialog');
    const form = document.getElementById('link-form');
    const inputText = document.getElementById('link-text');
    const inputUrl = document.getElementById('link-url');
    const anchorSelect = document.getElementById('link-anchor');
    const inputTarget = document.getElementById('link-target');
    const btnCancel = document.getElementById('link-cancel');
    function getAnchorIds() {
        const ids = new Set();
        document.querySelectorAll('#editor [id]').forEach(el => {
            if (el.id)
                ids.add(el.id);
        });
        return Array.from(ids);
    }
    function showDialog() {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, ' ');
        inputText.value = selectedText || '';
        inputUrl.value = '';
        inputTarget.checked = false;
        anchorSelect.innerHTML = '<option value="">None</option>';
        getAnchorIds().forEach(id => {
            const opt = document.createElement('option');
            opt.value = '#' + id;
            opt.textContent = id;
            anchorSelect.appendChild(opt);
        });
        dialog.style.display = 'block';
        inputUrl.focus();
    }
    function hideDialog() {
        dialog.style.display = 'none';
    }
    form.onsubmit = (e) => {
        e.preventDefault();
        let url = inputUrl.value.trim();
        const text = inputText.value.trim();
        const anchor = anchorSelect.value;
        const openInNewWindow = inputTarget.checked;
        if (anchor) {
            url = anchor;
        }
        if (url && !url.startsWith('http') && !url.startsWith('#')) {
            url = '#' + url;
        }
        const linkAttrs = { href: url };
        if (openInNewWindow) {
            linkAttrs.target = '_blank';
            linkAttrs.rel = 'noopener noreferrer';
        }
        editor.chain().focus()
            .setLink(linkAttrs)
            .run();
        hideDialog();
    };
    btnCancel.onclick = () => {
        hideDialog();
    };
    (_a = document.getElementById('add-link-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', showDialog);
};
