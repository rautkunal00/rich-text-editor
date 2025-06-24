import { Extension } from '@tiptap/core'
import { iframeDocument } from '../globalVariables'

export const VisualBlocks = Extension.create({
    name: 'visualBlocks',

    addCommands() {
        return {
            toggleVisualBlocks: () => () => {
                const editorHTML = iframeDocument.querySelector('.tiptap-editor') as HTMLElement;
                editorHTML.classList.toggle('tiptap-visual-blocks');
                return true;
            }
        }
    }
})
