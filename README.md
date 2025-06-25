# Tiptap Advanced Rich Text Editor

An advanced rich text editor built on top of [Tiptap v2](https://tiptap.dev/), enhanced with rich formatting tools, iframe-based isolation, source code editing, and plugin extensibility — perfect for modern web applications that require a robust and secure editor experience.

![License](https://img.shields.io/badge/license-MIT-green)
![Built With](https://img.shields.io/badge/built%20with-TypeScript-blue)
![Framework](https://img.shields.io/badge/editor-Tiptap%20v2-informational)

---

## ✨ Features

### ✅ Core Features

- **Tiptap v2 Integration**
- **MIT License Compliance** (Ace, Tiptap, DOMPurify, etc.)
- **Iframe-Based Rendering**: Full isolation of styles and scripts
- **Auto-Resizing**: Dynamic height adjustment using `ResizeObserver`
- **Configurable Height & Width**

#### 🛠 Toolbar Functionalities

- Undo / Redo
- Bold, Italic, Underline, Strikethrough
- Subscript / Superscript
- Clear Formatting
- Heading Levels (H1–H6)
- Font Size & Font Family (Configurable Dropdowns)
- Text Alignment (Left, Center, Right, Justify)
- Text Capitalization
- Text & Background Colors / Highlighting
- Ordered & Unordered Lists (with custom markers)
- Anchor / Hyperlink Support
- Checkboxes / Task Lists
- Horizontal Line
- Image Insertion (basic support)
- Special Characters / Emojis / Math Symbols
- Tables (Insert, Add/Delete Rows & Columns)
- Date & Time Insertion
- Search & Replace
- Text Direction (LTR / RTL)
- Visual Blocks (show block-level containers)
- Visual Characters (like `¶`)
- **Preview Mode**
- **Source Code View & Edit** (powered by Ace Editor)
- **Code Block with Syntax Highlighting**

---

### 🧩 Enhancements & Extensions

- **DOM Sanitization** via DOMPurify to prevent XSS
- **Lifecycle Hooks**: `focus`, `blur`, `update`, `destroy`
- **TypeScript-safe API**:
  ```ts
  setContent(html), getContent(), enable(), disable(), destroy()
  ```
- **Custom Popup Extension** with overlay and event hooks
- **Dynamic Script & Style Loading** (`loadScript`, `loadCSS`)
- **Customizable Footer Area**
- **Resizable Toolbar** with responsive behavior
- **Dark Mode Support** (via CSS theme switch)

---

### 🔧 Currently In Progress

- Media Insertion (Image, Video)
- Resizable Editor Area (vertical/horizontal)
- Spellcheck Integration
- Fullscreen Toggle
- Format Painter
- Page Breaks
- Custom Font Sizes / Font Families
- Icon Customization (Lucide, Custom SVGs)
- Toolbar Configuration via Editor Config

---

## 📦 Installation

```
npm install tiptap-enhanced-editor
```

> You may also integrate it via CDN for iframe-based sandboxed use.

---

## 📚 Usage

```ts
import { initTiptapEditor } from 'tiptap-enhanced-editor';

const editor = initTiptapEditor({
  selector: '#editor-container',
  editorConfig: {
    height: '300px',
    width: '100%',
    showToolbar: true,
    // more config...
  }
});
```

---

## 🛡 License

MIT License © Kunal Raut

---

## 💬 Contributing / Feedback

Have a suggestion, bug, or feature request? Open an issue or PR!

---

## 👀 Demo

Coming soon...

---