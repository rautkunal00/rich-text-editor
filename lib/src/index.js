import { createFooter } from './editor/footer';
import { createEditor } from './editor/header';
import { initMenu } from './editor/menu/initMenu';
import { createToolbar } from './editor/toolbar';
export const initTiptapEditor = (options) => {
    const { selector, editorConfig = {} } = options;
    // use selector as wrapper component
    const editorContainer = document.querySelector(selector);
    // Create Editor
    const uniqueId = 'editor-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const editorId = uniqueId;
    const editorElement = document.createElement('div');
    editorElement.id = editorId;
    editorElement.className = 'tiptap-editor rich-text-editor';
    editorContainer === null || editorContainer === void 0 ? void 0 : editorContainer.appendChild(editorElement);
    const editor = createEditor(editorElement, editorConfig);
    // Create header
    if (editorConfig === null || editorConfig === void 0 ? void 0 : editorConfig.showToolbar) {
        const toolbar = createToolbar(editor);
        editorContainer === null || editorContainer === void 0 ? void 0 : editorContainer.prepend(toolbar);
        initMenu(editor, editorElement);
        lucide === null || lucide === void 0 ? void 0 : lucide.createIcons();
    }
    // Create Footer
    const footerElement = document.createElement('div');
    createFooter(footerElement, editorConfig);
    editorContainer === null || editorContainer === void 0 ? void 0 : editorContainer.append(footerElement);
    // editor Events
    editor.on('update', ({ editor }) => {
        console.log('Content updated:', editor.getHTML());
    });
    editor.on('selectionUpdate', ({ editor }) => {
        console.log('Selection changed:', editor.state.selection);
    });
    editor.on('focus', () => {
        console.log('Editor is focused');
    });
    editor.on('blur', () => {
        console.log('Editor lost focus');
    });
    return {
        setContent: (html) => editor.commands.setContent(html),
        getContent: () => editor.getHTML(),
        destroy: () => editor.destroy(),
        enable: () => editor.setEditable(true),
        disable: () => editor.setEditable(false),
    };
};
