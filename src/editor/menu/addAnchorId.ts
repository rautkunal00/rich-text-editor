import { Editor } from '@tiptap/core';
import { iframeDocument, iframeWindow } from '../globalVariables';

export function setupAddAnchorDialog(editor: Editor) {
  function isValidAnchorId(anchorId: string): boolean {
    return /^[A-Za-z][A-Za-z0-9-_:.]*$/.test(anchorId)
  }

  function insertAnchor(anchorId: string) {
    editor.chain().focus().setMark('anchorMark', { id: anchorId }).run();

    const { to } = editor.state.selection;
    editor.chain().setTextSelection(to).unsetMark('anchorMark').run();  
  }

  // creating the html 
  function createAnchorPopup(): HTMLDivElement {
    const container = iframeDocument.createElement('div')
    container.id = 'custom-anchor-dialog'
    container.style.cssText = `
      width: 280px;
      padding: 16px;
      font-family: sans-serif;
      background: #fff;
    `

    const heading = iframeDocument.createElement('h3')
    heading.textContent = 'Add Anchor'
    heading.style.marginBottom = '12px'

    const label = iframeDocument.createElement('label')
    label.htmlFor = 'anchor-id-input'
    label.textContent = 'Anchor ID:'

    const input = iframeDocument.createElement('input')
    input.id = 'anchor-id-input'
    input.type = 'text'
    input.placeholder = 'e.g. section-1'
    input.style.width = '100%'
    input.style.padding = '6px'
    input.style.margin = '6px 0'

    const resultMsg = iframeDocument.createElement('div')
    resultMsg.style.color = 'red'
    resultMsg.style.fontSize = '12px'
    resultMsg.style.marginBottom = '8px'

    const addBtn = iframeDocument.createElement('button')
    addBtn.type = 'button'
    addBtn.textContent = 'Add'
    addBtn.style.marginRight = '10px'

    const cancelBtn = iframeDocument.createElement('button')
    cancelBtn.type = 'button'
    cancelBtn.textContent = 'Cancel'

    const buttonRow = iframeDocument.createElement('div')
    buttonRow.appendChild(addBtn)
    buttonRow.appendChild(cancelBtn)

    container.appendChild(heading)
    container.appendChild(label)
    container.appendChild(input)
    container.appendChild(resultMsg)
    container.appendChild(buttonRow)

    
    addBtn.addEventListener('click', () => {
      const anchorId = input.value.trim()
      if (!isValidAnchorId(anchorId)) {
        resultMsg.textContent = 'Invalid ID. Must start with a letter and contain only letters, digits, -, _, :, or .'
        return
      }

      if (editor.state.selection.empty) {
        resultMsg.textContent = 'Please select some text before adding an anchor.'
        return
      }

      insertAnchor(anchorId)
      editor.commands.closePopup()
    })

    cancelBtn.addEventListener('click', () => {
      editor.commands.closePopup()
    })

    return container
  }

  // Opening the popup
  const addAnchorBtn = iframeDocument.getElementById('add-anchor-btn');
  addAnchorBtn?.addEventListener('click', () => {
    
    if(editor.state.selection.empty){
      alert("Please select some text before adding the id")
      return
    }
    const popupContent = createAnchorPopup()

    // Positioning the popup
        const rect = addAnchorBtn.getBoundingClientRect();
        const top = rect.bottom + iframeWindow.screenY;
        const left = rect.left + iframeWindow.screenX

        editor.commands.showPopup({
        html: popupContent,
        position: { top,left },
        closeOnOutsideClick: true,
        })
  })
}
