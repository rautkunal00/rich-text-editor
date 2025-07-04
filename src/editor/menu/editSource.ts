import { Editor } from "@tiptap/core";
import { iframeDocument, iframeWindow } from "../globalVariables";
import { sanitizeHTML } from "../extensions/sanitizer";

export const addEditSource = (editor: Editor) => {
    const button = iframeDocument.getElementById('source-code-btn')
    if (!button) return

    button.addEventListener('click', () => {
        openSourceEditorPopup(editor, button);
    })
}

const openSourceEditorPopup = (editor: Editor, button: HTMLElement) => {
    const popupHTML = iframeDocument.createElement('div');
    popupHTML.innerHTML = `
      <h3 style="margin: 0 0 10px;">Edit HTML Source</h3>
      <div id="source-editor" style="height: 300px; width: 100%;"></div>
      <div style="margin-top: 10px; text-align: right;">
        <button id="cancel-source-edit">Cancel</button>
        <button id="save-source-edit" style="margin-left: 10px;">Save</button>
      </div>
  `;

    const popupScript = `const aceEditor = ace.edit("source-editor", { mode: "ace/mode/html", theme: "ace/theme/monokai", fontSize: "14px", wrap: true, tabSize: 2, enableBasicAutocompletion: true, enableLiveAutocompletion: true, }); window.aceEditor = aceEditor;`;

    // get position for popup
    const rect = button.getBoundingClientRect();
    const top = rect.bottom + iframeWindow.scrollY;
    const left = rect.left + iframeWindow.scrollX;

    editor.commands.showPopup({
        html: popupHTML,
        onMount: (popupEl: HTMLElement) => {
            const cancelBtn = popupEl.querySelector('#cancel-source-edit') as HTMLButtonElement;
            const saveBtn = popupEl.querySelector('#save-source-edit') as HTMLButtonElement;
            const editorDiv = popupEl.querySelector('#source-editor');

            // Check if ace is loaded and #source-editor exists
            if (iframeWindow.ace && editorDiv) {
                const aceEditor = iframeWindow.ace.edit(editorDiv as HTMLElement, {
                    mode: 'ace/mode/html',
                    theme: 'ace/theme/monokai',
                    fontSize: '14px',
                    wrap: true,
                    tabSize: 2,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                });

                iframeWindow.aceEditor = aceEditor;
                aceEditor.setValue(editor.getHTML(), 1);
            }

            cancelBtn.addEventListener('click', () => {
                editor.commands.closePopup();
            });

            saveBtn.addEventListener('click', () => {
                const newHTML = sanitizeHTML(iframeWindow.aceEditor?.getValue?.() || '');
                editor.commands.setContent(newHTML, false);
                editor.commands.closePopup();
            });
        },
        position: { top: 0, left: 0 },
        height: '100%',
        width: '100%',
        closeOnOutsideClick: true
    })
}
