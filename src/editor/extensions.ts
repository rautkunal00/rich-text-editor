import Highlight from '@tiptap/extension-highlight';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import Subscript from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TableKit } from '@tiptap/extension-table';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { CharacterCount } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { EditorOptions } from '../globalInterface';
import { AlignedBlockquote } from './extensions/alignment/alignedBlockquote';
import { AlignedHeading } from './extensions/alignment/alignedHeading';
import { AlignedParagraph } from './extensions/alignment/alignedParagraph';
import AnchorMark from './extensions/anchorMark';
import { AudioNode } from './extensions/audio';
import { ClearMarksOnEnter } from './extensions/clearFormattingOnEnter';
import EventLogger from './extensions/customEvents';
import { ExtendedBulletList } from './extensions/extendedBulletList';
import { ExtendedOrderedList } from './extensions/extendedOrderedList';
import { IframeNode } from './extensions/iframeNode';
import { ResizableImage } from './extensions/imageResizeExtension';
import { InsertMedia } from './extensions/media';
import { PageBreak } from './extensions/pageBreak';
import { PopupExtension } from './extensions/popup';
import HighlightMark from './extensions/searchHighlight';
import TextColor from './extensions/textColor';
import { TextDirection } from './extensions/textDirection';
import { VisualBlocks } from './extensions/visualBlocks';
import { VisualCharacters } from './extensions/visualCharacters';

export const getExtensions = (editorConfig: EditorOptions) => [
    AlignedBlockquote,
    AlignedHeading,
    AlignedParagraph,
    AnchorMark,
    AudioNode,
    CharacterCount,
    ClearMarksOnEnter,
    EventLogger,
    ExtendedBulletList,
    ExtendedOrderedList,
    Highlight.configure({ multicolor: true }),
    HighlightMark,
    IframeNode,
    InsertMedia,
    PageBreak,
    PopupExtension,
    ResizableImage.configure({ allowBase64: true }),
    StarterKit.configure({
        orderedList: false,
        blockquote: false,
        bulletList: false,
        heading: { levels: [1, 2, 3, 4, 5, 6] },
    }),
    Subscript,
    Superscript,
    TableKit,
    TaskItem.configure({ nested: true }),
    TaskList,
    TextAlign.configure({ types: ['heading', 'paragraph', 'blockquote'] }),
    TextColor,
    TextDirection,
    TextStyleKit,
    VisualBlocks,
    VisualCharacters,
];
