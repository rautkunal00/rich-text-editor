# Rich Text Enhanced Editor

A modular, iframe-based rich text editor built using **Tiptap v3**, offering advanced editing features with enhanced UI, secure isolation, and extensive plugin support.

---

## 🚀 Features

### ✒️ Core Editing
- **Tiptap v3 Engine**: Built on the latest powerful headless editor framework.
- **Iframe Isolation**: Styles and scripts are completely isolated from the host application.
- **History Management**: Robust Undo / Redo functionality.
- **Security**: Full HTML sanitization via **DOMPurify**.

### 🎨 Text & Formatting
- **Typography**:
  - Customizable **Font Family** and **Font Size** (12px - 28px).
  - **Capitalization**: Uppercase, Lowercase, Capitalize.
  - **Heading Levels**: H1 through H6 + Paragraph.
- **Styling**:
  - Bold, Italic, Underline, Strikethrough.
  - Subscript & Superscript.
  - **Text Color** & **Highlight Color** with custom palette support.
  - **Clear Formatting** utility.

### 📋 Lists & Layout
- **Advanced Lists**:
  - **Bullet Lists**: Disc, Circle, Square, Dash, Checkmark.
  - **Ordered Lists**: Decimal, Alpha (Lower/Upper), Roman (Lower/Upper), Greek.
  - **Task Lists**: Interactive checkboxes (Checklist).
- **Alignment**: Left, Center, Right, Justify.
- **Text Direction**: RTL / LTR support.
- **Structure**:
  - **Page Breaks** for print-layout simulation.
  - **Horizontal Lines**.
  - **Indentation**.

### 🎬 Media & Objects
- **Images**: Drag-and-drop upload with **Resizing** capabilities.
- **Media Embedding**: Support for Audio and other media types.
- **Tables**: Comprehensive table management (Add/Delete Rows, Cols, Tables).
- **Links**: Hyperlinks and Anchor support.
- **Special Characters**: Emoji and Symbol insertion.
- **Date & Time**: Quick insertion of current date/time.

### 🛠 Powerful Tools
- **Format Painter**: Copy formatting from one text section to another.
- **Search & Replace**: Advanced find/replace within the editor.
- **Source Code Editor**: Direct HTML editing via embedded **Ace Editor** with syntax highlighting.
- **Visual Aids**:
  - **Visual Blocks**: View block-level element boundaries.
  - **Visual Characters**: View invisible characters (tabs, spaces, breaks).
- **Preview Mode**: Toggle between edit and read-only preview.
- **Fullscreen**: Distraction-free editing.

---

## 🔧 Installation

```bash
npm install rich-text-enhanced-editor
```

---

## 🧑‍💻 Usage

The editor is initialized via the `initRichTextEditor` function.

```typescript
import { initRichTextEditor } from 'rich-text-enhanced-editor';

initRichTextEditor({
  selector: '#editor-container',
  editorConfig: {
    height: '400px',
    width: '100%',
    showToolbar: true,
    displayWordCount: true,
    footerMessage: 'My Custom Editor',
    resize: true,
    // Load custom CSS inside the iframe
    cssFiles: 'https://example.com/my-styles.css'
  }
}).then(editor => {
  console.log('Editor initialized!');
  
  // Set initial content
  editor.setContent('<p>Hello World</p>');
  
  // Listen to updates
  editor.onUpdate(() => {
    console.log('Content changed:', editor.getContent());
  });
});
```

---

## ⚙️ Configuration

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selector` | String | *Required* | CSS selector for the container element. |
| `editorConfig.height` | String | `'250px'` | Height of the editor area. |
| `editorConfig.width` | String | `'100%'` | Width of the editor iframe. |
| `editorConfig.showToolbar` | Boolean | `true` | Show or hide the toolbar. |
| `editorConfig.resize` | Boolean | `false` | Enable vertical resizing handle. |
| `editorConfig.displayWordCount` | Boolean | `false` | Show word count in footer. |
| `editorConfig.footerMessage` | String | `''` | Custom text for the footer. |
| `editorConfig.cssFiles` | String | `undefined` | Comma-separated URLs for external CSS. |

---

## 📦 Dependencies

*   [Tiptap v3](https://tiptap.dev) - The headless editor framework.
*   [Ace Editor](https://ace.c9.io) - For source code editing.
*   [DOMPurify](https://github.com/cure53/DOMPurify) - For HTML sanitization.
*   [Lucide Icons](https://lucide.dev) - For UI icons.
*   [Floating UI](https://floating-ui.com/) - For positioning popups.

---

## 📄 License

This project is licensed under the **MIT License**.
