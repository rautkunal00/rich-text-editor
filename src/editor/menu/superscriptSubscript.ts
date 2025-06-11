import { Editor } from '@tiptap/core';

export const superscriptSubscript = (editor: Editor) => {

    document.getElementById('superscript-btn')?.addEventListener('click', () => {
        
        const isActive = editor.isActive('superscript');

        if(isActive){
            editor.chain().focus().unsetSuperscript().run();
            editor.view.dispatch(editor.state.tr.setStoredMarks([]));
        } else {
            editor.chain().focus().toggleSuperscript().run();
        }
    });
    
    document.getElementById('subscript-btn')?.addEventListener('click', () => {
        
        const isActive = editor.isActive('subscript');

        if(isActive){
            editor.chain().focus().unsetSubscript().run();
            editor.view.dispatch(editor.state.tr.setStoredMarks([]));
        } else{
            editor.chain().focus().setSubscript().run();
        }
    });
}
