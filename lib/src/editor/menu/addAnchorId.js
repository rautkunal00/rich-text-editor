export function setupAddAnchorDialog(editor, editorElement) {
    const dialog = document.getElementById('custom-anchor-dialog');
    const form = document.getElementById('anchor-form');
    const input = document.getElementById('anchor-id-input');
    const cancelBtn = document.getElementById('anchor-cancel-btn');
    const addAnchorBtn = document.getElementById('add-anchor-btn');
    function showDialog() {
        input.value = '';
        dialog.style.display = 'block';
        input.focus();
    }
    function hideDialog() {
        dialog.style.display = 'none';
    }
    addAnchorBtn === null || addAnchorBtn === void 0 ? void 0 : addAnchorBtn.addEventListener('click', () => {
        const selection = editor.state.selection;
        if (selection.empty) {
            alert("Please select some text before adding an anchor.");
            return;
        }
        showDialog();
    });
    cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideDialog();
    });
    form.onsubmit = (e) => {
        e.preventDefault();
        const anchorId = input.value.trim();
        if (!anchorId) {
            alert('Please enter an anchor ID.');
            return;
        }
        const selection = editor.state.selection;
        if (selection.empty) {
            alert('No text selected. Please select text first.');
            hideDialog();
            return;
        }
        editor.chain().focus().setMark('anchorMark', { id: anchorId }).run();
        hideDialog();
    };
    if (editorElement) {
        editorElement.addEventListener('click', function (e) {
            const target = e.target;
            if (target instanceof HTMLAnchorElement &&
                target.getAttribute('href') &&
                target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const anchorId = target.getAttribute('href').substring(1);
                const anchorEl = document.getElementById(anchorId);
                if (anchorEl) {
                    anchorEl.scrollIntoView({ behavior: 'smooth' });
                    history.replaceState(null, '', `#${anchorId}`);
                }
            }
        });
    }
}
