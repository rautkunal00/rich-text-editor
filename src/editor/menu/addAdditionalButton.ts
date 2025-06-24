import { Editor } from '@tiptap/core';
import { iframeDocument } from '../globalVariables';

export const addAdditionalButtons = (editor: Editor) => {
    iframeDocument.getElementById('insert-datetime-btn')?.addEventListener('click', () => {
        const now = new Date();
        const formattedDate = now.toLocaleString();
        editor.chain().focus().insertContent(formattedDate).run();
    });
    iframeDocument.getElementById('visual-block-btn')?.addEventListener('click', () => {
        editor.commands.toggleVisualBlocks();
    });
    iframeDocument.getElementById('visual-chars-btn')?.addEventListener('click', () => {
        editor.commands.toggleVisualCharacters();
    });

}