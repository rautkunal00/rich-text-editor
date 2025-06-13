import CharacterCount from '@tiptap/extension-character-count';
import Color from '@tiptap/extension-color';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Strike from '@tiptap/extension-strike';
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
import AnchorMark from './extensions/anchorMark';
import FontFamily from './extensions/fontFamily';
import FontSize from './extensions/fontSize';
import HighlightMark from './extensions/searchHighlight';
import TextColor from './extensions/textColor';

export const getExtensions = () => [
    StarterKit,
    TextStyle,
    Color,
    Underline,
    Highlight.configure({ multicolor: true }),
    Link,
    Image.configure({ inline: false, allowBase64: true, }),
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
    FontSize,
    FontFamily,
    TextColor,
    CharacterCount.configure({ limit: 10000 }),
    TaskList,
    TaskItem.configure({ nested: true, }),
    HighlightMark,
    AnchorMark,
    Subscript,
    Superscript,
    Strike
];