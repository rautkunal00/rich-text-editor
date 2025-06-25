# 📘 API Documentation: Tiptap Enhanced Rich Text Editor

This guide covers the complete API available for the rich text editor instance created using the `initTiptapEditor` function.

---

## 🛠️ Initialization

### `initTiptapEditor(options: TiptapEditorOptions): EditorAPI`

Initializes the rich text editor inside a specified container.

#### Parameters:

| Name         | Type                | Description                                 |
| ------------ | ------------------- | ------------------------------------------- |
| selector     | `string`            | CSS selector for the container element      |
| editorConfig | `object` (optional) | Configuration for height, toolbar, features |

#### Example:

```ts
const editor = initTiptapEditor({
  selector: '#editor-container',
  editorConfig: {
    height: '300px',
    showToolbar: true,
    displayWordCount: true,
    footerMessage: 'Editing HTML...',
    resize: true,
    cssFiles: './custom-editor.css',
  },
});
```

---

## 🧹 EditorAPI

The function `initTiptapEditor` returns an object with the following methods:

### 🔤 `setContent(html: string): void`

Sets HTML content inside the editor (sanitized).

```ts
editor.setContent('<p>Hello, world!</p>');
```

---

### 📅 `getContent(): string`

Returns sanitized HTML string of the current editor content.

```ts
const content = editor.getContent();
```

---

### ❌ `destroy(): void`

Destroys the editor instance and cleans up event listeners and iframe.

```ts
editor.destroy();
```

---

### 🟢 `enable(): void`

Makes the editor content editable.

```ts
editor.enable();
```

---

### 🔴 `disable(): void`

Disables editing (readonly view).

```ts
editor.disable();
```

---

## 🔁 Event Hooks

You can attach functions to lifecycle and user interaction events.

### 📌 `onUpdate(callback: (editorInstance) => void): void`

Triggered whenever the editor content is updated.

```ts
editor.onUpdate((instance) => {
  console.log('Updated content:', instance.getHTML());
});
```

---

### 📍 `onSelectionUpdate(callback: (editorInstance) => void): void`

Triggered when the selection (cursor/selected text) changes.

---

### 🧠 `onFocus(callback: (editorInstance) => void): void`

Triggered when the editor is focused.

---

### 💥 `onBlur(callback: (editorInstance) => void): void`

Triggered when the editor loses focus.

---

### 💫 `onDestroy(callback: (editorInstance) => void): void`

Triggered when the editor is about to be destroyed.

---

### 🚀 `afterInit(callback: (editorInstance) => void): void`

Fires once the editor is fully initialized.

---

### 🗃 `onPaste(callback: (editorInstance) => void): void`

Hook for intercepting paste events.

---

### 🔁 `onDrop(callback: (editorInstance) => void): void`

Hook for handling drag-drop of content.

---

## ⚙️ Editor Configuration (`TiptapEditorOptions.editorConfig`)

| Option             | Type      | Description                                             |
| ------------------ | --------- | ------------------------------------------------------- |
| `height`           | `string`  | Initial editor height (e.g., `'300px'`)                 |
| `width`            | `string`  | Editor width (defaults to 100%)                         |
| `resize`           | `boolean` | Enable vertical resizing with drag handle               |
| `footerMessage`    | `string`  | Optional message in the footer                          |
| `displayWordCount` | `boolean` | Show word count in the footer                           |
| `showToolbar`      | `boolean` | Whether to render the toolbar                           |
| `cssFiles`         | `string`  | Comma-separated list of additional CSS files to include |

---

## 📄 Example Setup

```html
<div id="editor-container"></div>
<script type="module">
  import { initTiptapEditor } from 'your-rich-text-editor';

  const editor = initTiptapEditor({
    selector: '#editor-container',
    editorConfig: {
      height: '300px',
      showToolbar: true,
      resize: true,
      footerMessage: 'Type your content...',
    },
  });

  editor.onUpdate(() => {
    console.log(editor.getContent());
  });
</script>
```

---

## 📄 Types

### `TiptapEditorOptions`

```ts
interface TiptapEditorOptions {
  selector: string;
  editorConfig?: {
    height?: string;
    width?: string;
    showToolbar?: boolean;
    resize?: boolean;
    footerMessage?: string;
    displayWordCount?: boolean;
    cssFiles?: string;
  };
}
```

### `EditorAPI`

```ts
interface EditorAPI {
  setContent: (html: string) => void;
  getContent: () => string;
  destroy: () => void;
  enable: () => void;
  disable: () => void;
  onUpdate: (fn: (editorInstance: Editor) => void) => void;
  onSelectionUpdate: (fn: (editorInstance: Editor) => void) => void;
  onFocus: (fn: (editorInstance: Editor) => void) => void;
  onBlur: (fn: (editorInstance: Editor) => void) => void;
  onDestroy: (fn: (editorInstance: Editor) => void) => void;
  afterInit: (fn: (editorInstance: Editor) => void) => void;
  onPaste: (fn: (editorInstance: Editor) => void) => void;
  onDrop: (fn: (editorInstance: Editor) => void) => void;
}
```

---
