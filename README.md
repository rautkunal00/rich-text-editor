````markdown
# Tiptap Enhanced Rich Text Editor

A modular, iframe-based rich text editor built using **Tiptap v2**, offering advanced editing features with enhanced UI, plugin support, and secure isolation via iframes.

---

## 🚀 Features

### ✒️ Core Editing Features

- **Tiptap v2 Integration**
- **MIT License Compliance** (Ace, Tiptap, DOMPurify, etc.)
- **Iframe-Based Rendering** for style/script isolation
- **Toolbar with Essential Formatting Tools:**
  - Undo / Redo
  - Bold, Italic, Underline, Strikethrough
  - Subscript / Superscript
  - Text Alignment: Left, Center, Right, Justify
  - Clear Formatting
  - Text Direction (LTR/RTL)
  - Font Family & Font Size dropdowns (configurable)
  - Heading levels (H1–H6)
  - Capitalization options (Uppercase, Lowercase, Title Case)
  - Text & Background color highlighting
  - Horizontal Line
- **Lists**
  - Ordered, Unordered
  - Custom Styles
- **Anchors & Hyperlinks**
- **Checkboxes / Task Lists**
- **Tables**: Add/delete rows & columns
- **Special Characters & Emojis**
- **Date & Time Insertion**
- **Search & Replace**
- **Preview Mode**
- **Visual Blocks** (e.g., block-level indicators)
- **Visual Characters** (e.g., `¶` for soft/hard returns)

---

### 🔐 Security & Flexibility

- **DOM Sanitization** via [DOMPurify](https://github.com/cure53/DOMPurify)
- **Lifecycle Hooks**: `onUpdate`, `onFocus`, `onBlur`, `onDestroy`, etc.
- **TypeScript-safe API**:
  - `setContent()`, `getContent()`, `enable()`, `disable()`, etc.

---

### 🧩 Code Support

- **Code Block** with syntax highlighting via [lowlight]
- **View & Edit HTML Source** with embedded Ace Editor
- **Dynamic Resource Loader**: Load scripts & styles at runtime

---

### 🪟 UI Enhancements

- **Isolated Iframe Editing Environment**
- **Custom Popup Component** with overlay and lifecycle control
- **Auto Iframe Resizing** with `ResizeObserver`
- **Draggable Vertical Resize Handle**
- **Configurable Footer**:
  - Word Count
  - Footer Message

---

## 🛠 Currently in Progress

- Media Insertion (Images, Videos)
- Fullscreen Mode
- Format Painter
- Page Break Support
- Spellcheck Integration
- Toolbar Customization via Config
- Custom Icons Support

---

## 🔧 Installation

```bash
npm install your-rich-text-editor
````

Or use via CDN (coming soon).

---

## 🧑‍💻 Usage

```ts
import { initTiptapEditor } from 'your-rich-text-editor';

initTiptapEditor({
  selector: '#editor-container',
  editorConfig: {
    height: '300px',
    showToolbar: true,
    displayWordCount: true,
    footerMessage: 'Powered by Tiptap',
    resize: true
  }
}).then(editor => {
  editor.setContent('<p>Hello World!</p>');
});
```

---

## 📦 Dependencies

* [Tiptap v2](https://tiptap.dev)
* [Ace Editor](https://ace.c9.io)
* [DOMPurify](https://github.com/cure53/DOMPurify)
* [lowlight](https://github.com/wooorm/lowlight)
* Lucide Icons (via CDN)

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📣 Feedback

Feature suggestions, bug reports, or contributions are welcome! Feel free to open an issue or pull request.

```
