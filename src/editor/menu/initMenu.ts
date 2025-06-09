import { Editor } from '@tiptap/core';
import { setupFormatting } from './formatting';
import { setupLists } from './lists';
import { setupAlignment } from './alignment';
import { setupTableMenu } from './tables';
import { setupImageUpload } from './images';
import { setupUndoRedo } from './undeRedo';
import { setupClearFormatting } from './clearFormatting';
import { setupFontSize } from './setupFontSize';
import { setupFontFamily } from './setupFontFamily';
import { setupTextColor } from './textColorSetup';
import { setupCapitalizationMenu } from './capitalizationMenu';
import { setupWordCount } from './wordCount';
import { setupChecklist } from './checkList';

export const initMenu = (editor: Editor) => {
    setupFormatting(editor)
    setupLists(editor)
    setupAlignment(editor)
    setupTableMenu(editor)
    setupImageUpload(editor)
    setupUndoRedo(editor)
    setupClearFormatting (editor)
    setupFontSize(editor)
    setupFontFamily(editor)
    setupTextColor(editor)
    setupCapitalizationMenu(editor)
    setupWordCount(editor)
    setupChecklist(editor)
}
