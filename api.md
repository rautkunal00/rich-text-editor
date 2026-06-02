# Rich Text Enhanced Editor API Documentation

This document provides a comprehensive overview of the **Rich Text Enhanced Editor**, a modular, iframe-based rich text editor built using **Tiptap v3**.

## 🚀 Overview

The editor runs inside an isolated `iframe` to ensure style encapsulation and security. It offers a rich set of features including advanced formatting, tables, media embedding, and direct source code editing.

## 📦 Installation & Usage

The editor is exposed globally via the `initRichTextEditor` function.

```typescript
import { initRichTextEditor } from 'your-package-name';

// OR if using via script tag
// window.initRichTextEditor({...})

initRichTextEditor({
  selector: '#editor-container', // Query selector for the container element
  editorConfig: {
    height: '400px',             // Optional: Editor height
    width: '100%',               // Optional: Editor width
    showToolbar: true,           // Optional: Show/Hide toolbar
    displayWordCount: true,      // Optional: Show word count in footer
    footerMessage: 'My Editor',  // Optional: Custom footer text
    resize: true,                // Optional: Enable vertical resizing
    cssFiles: 'path/to/extra.css' // Optional: Inject custom CSS into iframe
  }
}).then(editor => {
  // editor instance is ready
});
```

## ⚙️ Configuration Options

The `initRichTextEditor` function accepts an object with the following properties:

| Property | Type | Description |
| :--- | :--- | :--- |
| `selector` | `string` | **Required**. CSS selector for the DOM element where the editor will be mounted. |
| `editorConfig` | `EditorOptions` | Configuration object for editor behavior and appearance. |

### `EditorOptions` Interface

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | Whether the editor starts in read-only mode. |
| `showMenu` | `boolean` | - | *Deprecated/Internal usage*. |
| `showToolbar` | `boolean` | `true` | Toggles the visibility of the top toolbar. |
| `height` | `string` | `'250px'` | Initial height of the editor area. |
| `width` | `string` | `'100%'` | Initial width of the editor iframe. |
| `cssFiles` | `string` | - | Comma-separated URLs of CSS files to load inside the editor iframe. |
| `resize` | `boolean` | - | Enables the drag-handle to resize the editor height. |
| `displayWordCount` | `boolean` | - | Toggles the word count display in the footer. |
| `footerMessage` | `string` | - | Custom text to display on the left side of the footer. |

## 🛠 API Methods

The `initRichTextEditor` promise resolves to an `EditorAPI` object providing control over the editor instance.

| Method | Signature | Description |
| :--- | :--- | :--- |
| `setContent` | `(html: string) => void` | Replaces the current editor content with the provided HTML string. Content is sanitized. |
| `getContent` | `() => string` | Returns the current content as an HTML string. |
| `getContentAsText` | `() => string` | Returns the current content as plain text, stripping HTML tags. |
| `enable` | `() => void` | Enables the editor for user interaction. |
| `disable` | `() => void` | Disables the editor (read-only mode). |
| `destroy` | `() => void` | Destroys the editor instance and cleans up listeners. |

## � Events

You can subscribe to various lifecycle and interaction events using the methods on the `EditorAPI` object.

| Event Method | Description |
| :--- | :--- |
| `onUpdate(fn)` | Fired when the content changes. |
| `onSelectionUpdate(fn)` | Fired when the cursor or selection changes. |
| `onFocus(fn)` | Fired when the editor gains focus. |
| `onBlur(fn)` | Fired when the editor loses focus. |
| `onDestroy(fn)` | Fired when the editor is destroyed. |
| `afterInit(fn)` | Fired immediately after the editor is fully initialized. |
| `onPaste(fn)` | Fired when content is pasted into the editor. |
| `onDrop(fn)` | Fired when content is dropped into the editor. |

*Note: All callback functions receive the internal `Editor` instance as an argument.*

## 🎨 Features & Toolbar

The editor comes with a pre-configured toolbar offering a wide range of functionalities.

### Text Formatting
- **Basic**: Bold, Italic, Underline, Strikethrough.
- **Script**: Subscript, Superscript.
- **Color**: Text Color, Highlight Context (with custom palettes).
- **Typography**:
  - Font Family (e.g., Arial, Times New Roman, Roboto, etc.)
  - Font Size (12px - 28px)
  - Capitalization (Uppercase, Lowercase, Capitalize)
- **Clear Formatting**: Removes all marks from selection.

### Structure & Layout
- **Headings**: H1 to H6, Paragraph.
- **Lists**:
  - Bullet List (Disc, Circle, Square, Dash, Checkmark styles).
  - Ordered List (Decimal, Alpha, Roman, Greek styles).
  - CheckList (Task list).
- **Alignment**: Left, Center, Right, Justify.
- **Direction**: Left-to-Right (LTR), Right-to-Left (RTL).
- **Indentation**: Visual block handling.

### Insertable Elements
- **Media**:
  - Images (Upload/Resize).
  - Media/Audio embedding.
- **Tables**: Full table support (Add/Delete Table, Row, Column).
- **Links & Anchors**: Create hyperlinks and internal anchors.
- **Special**:
  - Horizontal Line.
  - Page Break.
  - Date & Time.
  - Special Characters & Emojis.

### Tools & Utilities
- **History**: Undo / Redo.
- **Search & Replace**: Advanced find and replace functionality.
- **Source Code**: View and edit raw HTML using an embedded **Ace Editor**.
- **Preview**: View content in a read-only preview mode.
- **Fullscreen**: Toggle fullscreen editing mode.
- **Visual Aids**: Toggle visibility of block boundaries and invisible characters (e.g., paragraph marks).
- **Format Painter**: Copy and paste formatting styles.

## 🧩 Extensions Included

The editor wraps a powerful suite of **Tiptap extensions**:

- `StarterKit` (Paragraph, Text, etc.)
- `Table`, `TableRow`, `TableHeader`, `TableCell`
- `TaskItem`, `TaskList`
- `Subscript`, `Superscript`
- `TextAlign`, `TextDirection`
- `Highlight`, `TextColor`, `TextStyle`
- `CharacterCount`
- **Custom Extensions**:
  - `AlignedHeading`, `AlignedParagraph`, `AlignedBlockquote`
  - `AnchorMark`
  - `AudioNode`
  - `ExtendedBulletList`, `ExtendedOrderedList`
  - `IframeNode`
  - `ResizableImage`
  - `InsertMedia`
  - `PageBreak`
  - `PopupExtension`
  - `VisualBlocks`, `VisualCharacters`

## 🔒 Security

- **DOMPurify**: All content input and output is sanitized to prevent XSS attacks.
- **Iframe Isolation**: Styles and scripts from the host application do not leak into the editor, and editor styles do not leak out.
