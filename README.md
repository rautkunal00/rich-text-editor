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

You can use the editor either as a modern Web Component (recommended) or via the legacy programmatic initialization helper.

### 1. Web Component (Recommended)
You can directly declare the `<wolken-rich-text-editor>` custom element in your HTML:

```html
<wolken-rich-text-editor
  id="my-editor"
  height="400px"
  show-toolbar="true"
  display-word-count="true"
  footer-message="My Custom Editor"
></wolken-rich-text-editor>
```

```javascript
// Simply import the package to register the custom element
import 'rich-text-enhanced-editor';

const editor = document.getElementById('my-editor');

// Exposes all EditorAPI methods directly on the element (methods return promises before init is complete)
editor.setContent('<p>Hello World</p>');

editor.onUpdate(() => {
  editor.getContent().then(html => console.log('Content:', html));
});
```

### 2. Programmatic Helper (Legacy)
The editor can also be initialized dynamically via the `initRichTextEditor` function:

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
    cssFiles: 'https://example.com/my-styles.css'
  }
}).then(editor => {
  console.log('Editor initialized!');
  
  editor.setContent('<p>Hello World</p>');
  editor.onUpdate(() => {
    console.log('Content changed:', editor.getContent());
  });
});
```

---

## 🧩 Framework Integration

### React / TSX
For TSX projects, the package exports global JSX typings automatically.
```tsx
import React, { useEffect, useRef } from 'react';
import 'rich-text-enhanced-editor';

export function EditorComponent() {
  const editorRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      // Access APIs directly on the element ref
      (editor as any).onUpdate?.(() => {
        (editor as any).getContent().then(console.log);
      });
    }
  }, []);

  return (
    <wolken-rich-text-editor
      ref={editorRef}
      height="400px"
      show-toolbar="true"
    />
  );
}
```

### Next.js (SSR / App Router & Pages Router)
Because Web Components use browser-only APIs (`window`, `customElements`), importing them directly during server-side rendering (SSR) will throw errors. You must dynamically import the package or mount it only after client-side hydration.

#### App Router / Client Component
Add `"use client"` at the top and load the registration dynamically inside `useEffect`:
```tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function NextEditor() {
  const editorRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Dynamically import client-side component registry
    import('rich-text-enhanced-editor').then(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (mounted && editorRef.current) {
      const editor = editorRef.current;
      (editor as any).onUpdate?.(() => {
        (editor as any).getContent().then(console.log);
      });
    }
  }, [mounted]);

  if (!mounted) return <div>Loading editor...</div>;

  return (
    <wolken-rich-text-editor
      ref={editorRef}
      height="450px"
      show-toolbar="true"
    />
  );
}
```

#### Pages Router (Dynamic Import wrapper)
Or wrap the editor component dynamically with SSR disabled:
```tsx
import dynamic from 'next/dynamic';

const EditorWithNoSSR = dynamic(
  () => import('../components/EditorComponent'),
  { ssr: false }
);

export default function Page() {
  return <EditorWithNoSSR />;
}
```

### Angular
1. Add `CUSTOM_ELEMENTS_SCHEMA` to your module's `@NgModule` definition to allow non-Angular custom elements:
```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```
2. Import the package in your component or `main.ts`:
```typescript
import 'rich-text-enhanced-editor';
```
3. Add the tag in your template:
```html
<wolken-rich-text-editor height="400px" [attr.show-toolbar]="true"></wolken-rich-text-editor>
```

### Vue
1. Configure Vite compiler options in your `vite.config.js` to recognize the custom element tag:
```javascript
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('wolken-')
        }
      }
    })
  ]
})
```
2. Import the package and use:
```vue
<template>
  <wolken-rich-text-editor height="400px" show-toolbar="true"></wolken-rich-text-editor>
</template>

<script>
import 'rich-text-enhanced-editor';
</script>
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
