import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import { History } from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
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
import FontFamily from './extensions/fontFamily';
import FontSize from './extensions/fontSize';
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
    CharacterCount.configure({ limit: 10000 }),
    ClearMarksOnEnter,
    Color,
    EventLogger,
    ExtendedBulletList,
    ExtendedOrderedList,
    FontFamily,
    FontSize,
    Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    Highlight.configure({ multicolor: true }),
    HighlightMark,
    History,
    IframeNode,
    InsertMedia,
    Link,
    PageBreak,
    PopupExtension,
    ResizableImage.configure({ allowBase64: true }),
    StarterKit.configure({ history: false, orderedList: false, blockquote: false, bulletList: false }),
    Subscript,
    Superscript,
    Table.configure({ resizable: true }),
    TableCell,
    TableHeader,
    TableRow,
    TaskItem.configure({ nested: true }),
    TaskList,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TextColor,
    TextDirection,
    TextStyle,
    Underline,
    VisualBlocks,
    VisualCharacters,
];
