import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import TextAlign from '@tiptap/extension-text-align';
import { FontSize } from './extensions/fontSize';
import { FontFamily } from './extensions/fontFamily';
import { TextColor } from './extensions/textColor';
import { Capitalization } from './extensions/capitalization';
import CharacterCount from '@tiptap/extension-character-count';
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
export const getExtensions = () => [
    StarterKit,
    Underline,
    Highlight,
    Link,
    Image,
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    FontSize,
    FontFamily,
    TextColor,
    Capitalization,
    CharacterCount.configure({limit: 10000}),
    TaskList,
    TaskItem.configure({nested: true,})
];