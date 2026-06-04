# Rich Text Enhanced Editor API Documentation

This document provides a comprehensive overview of the **Rich Text Enhanced Editor**, a modular, iframe-based rich text editor built using **Tiptap v3**.

## 🚀 Overview

The editor runs inside an isolated `iframe` to ensure style encapsulation and security. It offers a rich set of features including advanced formatting, tables, media embedding, and direct source code editing.

## 📦 Installation & Usage

The editor is package-ready and exposed as a native **Web Component** custom element: `<wolken-rich-text-editor>`. It can also be initialized programmatically via a legacy helper function `initRichTextEditor`.

### 1. Web Component Usage (Recommended)
Simply import the package to register the custom element globally:
```typescript
import 'rich-text-enhanced-editor';
```
Then declare the element in your HTML:
```html
<wolken-rich-text-editor
  id="my-editor"
  height="400px"
  show-toolbar="true"
  display-word-count="true"
  footer-message="My Custom Editor"
  resize="true"
></wolken-rich-text-editor>
```
You can access all editor methods directly on the element ref:
```javascript
const editor = document.getElementById('my-editor');

// APIs are immediately available and return promises if invoked before initial loading completes
editor.setContent('<p>Hello World</p>');

editor.onUpdate(() => {
  editor.getContent().then(html => console.log(html));
});
```

### 2. Legacy Programmatic Helper
If you prefer mounting the editor dynamically inside a selector element:
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
    cssFiles: 'path/to/extra.css'
  }
}).then(editor => {
  // editor matches the EditorAPI instance
  editor.setContent('<p>Hello World</p>');
});
```

---

## ⚙️ Configuration & Attributes

The custom element `<wolken-rich-text-editor>` accepts the following configuration attributes in HTML and properties in JS:

| HTML Attribute | JS Property | Type | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `disabled` | `disabled` | `boolean` | `false` | Read-only mode when true. |
| `show-menu` | `showMenu` | `boolean` | - | *Deprecated/Internal usage*. |
| `show-toolbar` | `showToolbar` | `boolean` | `true` | Show or hide the editing toolbar. |
| `height` | `height` | `string` | `'250px'` | Height of the editor area. |
| `width` | `width` | `string` | `'100%'` | Width of the editor iframe. |
| `css-files` | `cssFiles` | `string` | - | Comma-separated URLs of stylesheets to load inside the sandboxed iframe. |
| `resize` | `resize` | `boolean` | `false` | Enable the vertical resize handle in the footer. |
| `display-word-count`| `displayWordCount`| `boolean` | `false` | Show word count in the footer. |
| `footer-message` | `footerMessage` | `string` | - | Custom text displayed in the footer. |

You can also pass all configuration options programmatically via the `editorConfig` property:
```javascript
const editor = document.querySelector('wolken-rich-text-editor');
editor.editorConfig = {
  height: '500px',
  showToolbar: true
};
```

---

## 🛠 API Methods

All methods are exposed directly on the custom element instance (and resolved asynchronously if called before initial load completes) or on the object returned by `initRichTextEditor`.

| Method | Signature | Description |
| :--- | :--- | :--- |
| `setContent` | `(html: string) => Promise<void> \| void` | Sets the HTML content inside the editor. The input HTML is automatically sanitized. |
| `getContent` | `() => Promise<string> \| string` | Returns the current editor content as a sanitized HTML string. |
| `getContentAsText` | `() => Promise<string> \| string` | Returns the current editor content in plain text format. |
| `enable` | `() => Promise<void> \| void` | Sets the editor to editable mode. |
| `disable` | `() => Promise<void> \| void` | Sets the editor to read-only mode. |
| `destroy` | `() => Promise<void> \| void` | Destroys the editor instance and cleans up DOM elements and resize observers. |

---

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

## 🧩 Framework Integration

### 1. Plain HTML / Vanilla JS
Import the package directly or link it via a script tag. Custom elements register themselves automatically:
```html
<script type="module">
  import 'rich-text-enhanced-editor';

  const editor = document.getElementById('my-editor');
  editor.setContent('<p>Hello from Vanilla JS</p>');
</script>
```

### 2. React / TSX
The package exports global JSX typings, enabling custom element syntax support in TSX files. Use a ref to interact with the element's DOM methods:
```tsx
import React, { useEffect, useRef } from 'react';
import 'rich-text-enhanced-editor';

export function Editor() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const editor = ref.current;
    if (editor) {
      (editor as any).setContent('<p>Initial Text</p>');
    }
  }, []);

  return <wolken-rich-text-editor ref={ref} height="400px" />;
}
```

### 3. Next.js (SSR Handling)
Since Web Components use browser-only globals (`window`, `customElements`, etc.), direct loading will throw errors on server-side rendering. Load it dynamically inside `useEffect` or use `next/dynamic` with `ssr: false`:

#### App Router / Client Component
```tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function NextEditor() {
  const editorRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import('rich-text-enhanced-editor').then(() => setReady(true));
  }, []);

  if (!ready) return <div>Loading...</div>;

  return <wolken-rich-text-editor ref={editorRef} height="450px" />;
}
```

#### Pages Router (Dynamic Import)
```tsx
import dynamic from 'next/dynamic';

const EditorNoSSR = dynamic(
  () => import('../components/EditorComponent'),
  { ssr: false }
);
```

### 4. Angular
1. Allow custom element tags by adding the `CUSTOM_ELEMENTS_SCHEMA` schema to your module file:
```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```
2. Import the component script inside your component or module file:
```typescript
import 'rich-text-enhanced-editor';
```
3. Use the element inside templates:
```html
<wolken-rich-text-editor [attr.height]="'400px'" [attr.show-toolbar]="true"></wolken-rich-text-editor>
```

## 🔒 Security

- **DOMPurify**: All content input and output is sanitized to prevent XSS attacks.
- **Iframe Isolation**: Styles and scripts from the host application do not leak into the editor, and editor styles do not leak out.
