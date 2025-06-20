import { Editor } from '@tiptap/core';
import { iframeDocument } from '../globalVariables';

export const superscriptSubscript = (editor: Editor) => {

    iframeDocument.getElementById('superscript-btn')?.addEventListener('click', () => {
        
        const isActive = editor.isActive('superscript');

        if(isActive){
            editor.chain().focus().unsetSuperscript().run();
            editor.view.dispatch(editor.state.tr.setStoredMarks([]));
        } else {
            editor.chain().focus().toggleSuperscript().run();
        }
    });
    
    iframeDocument.getElementById('subscript-btn')?.addEventListener('click', () => {
        
        const isActive = editor.isActive('subscript');

        if(isActive){
            editor.chain().focus().unsetSubscript().run();
            editor.view.dispatch(editor.state.tr.setStoredMarks([]));
        } else{
            editor.chain().focus().setSubscript().run();
        }
    });
}
