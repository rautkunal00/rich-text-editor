import { Editor } from '@tiptap/core';
import { setupFormatting } from './formatting';
import { setupLists } from './lists';
import { setupAlignment } from './alignment';
import { setupTableMenu } from './tables';
import { setupImageUpload } from './images';

export const initMenu = (editor: Editor) => {
    setupFormatting(editor)
    setupLists(editor)
    setupAlignment(editor)
    setupTableMenu(editor)
    setupImageUpload(editor)
}
