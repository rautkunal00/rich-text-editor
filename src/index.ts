import { Editor } from '@tiptap/core';
import { createFooter } from './editor/footer';
import { createEditor } from './editor/header';
import { initMenu } from './editor/initMenu';
import { createToolbar } from './editor/toolbar';
import { sanitizeHTML } from './editor/extensions/sanitizer';
import { loadScript, loadCSS } from './editor/dynamicFunctions';
import { setIframeContext } from './editor/globalVariables';
import { EditorAPI, TiptapEditorOptions } from './globalInterface';





export const initTiptapEditor = (options: TiptapEditorOptions): EditorAPI => {
    const { selector, editorConfig = {} } = options;
    const editorParentContainer = document.querySelector(selector);

    const editoriframe = document.createElement('iframe');
    editoriframe.style.width = editorConfig.width || '100%';
    editoriframe.style.border = 'none';
    editoriframe.srcdoc = `<!DOCTYPE html><html><head></head><body></body></html>`;

    editorParentContainer?.appendChild(editoriframe);

    let editorInstance: Editor;

    editoriframe.onload = () => {
        const editorWindow = editoriframe.contentWindow as Window;
        const editorDocument = editorWindow.document as Document;

        editorDocument.body.style.margin = '0';
        editorDocument.body.style.boxSizing = 'border-box';

        setIframeContext(editorWindow, editorDocument);

        const editorContainer = editorDocument.body;
        const uniqueId = 'editor-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

        const editorElement = editorDocument.createElement('div');
        editorElement.id = uniqueId;
        editorElement.className = 'tiptap-editor rich-text-editor';
        editorElement.style.height = editorConfig.height || '250px';
        editorElement.style.width = '100%';
        editorElement.style.boxSizing = 'border-box';
        editorElement.style.overflowY = 'auto';

        editorContainer.appendChild(editorElement);

        editorInstance = createEditor(editorElement, editorConfig);

        loadScript('https://unpkg.com/lucide@latest', editorDocument)
            .then(() => editorWindow.lucide?.createIcons())
            .catch(console.error);

        loadCSS('./src/assets/styles/style.css', editorDocument);

        if (editorConfig?.showToolbar) {
            const toolbar = createToolbar(editorInstance);
            editorContainer.prepend(toolbar);
            initMenu(editorInstance, editorElement);
        }

        const footerElement = editorDocument.createElement('div');
        createFooter(footerElement, editorConfig);
        editorContainer.append(footerElement);

        // Optional: Auto-resize iframe based on content
        const resizeObserver = new ResizeObserver(() => {
            editoriframe.style.height = editorDocument.body.scrollHeight + 'px';
        });
        resizeObserver.observe(editorDocument.body);

        const resizeIframe = () => {
            const newHeight = editorContainer.scrollHeight;
            editoriframe.style.height = newHeight + 'px';
        };
        resizeIframe();
    };

    return {
        setContent: (html: string) => editorInstance?.commands.setContent(sanitizeHTML(html)),
        getContent: () => sanitizeHTML(editorInstance?.getHTML() || ''),
        destroy: () => editorInstance?.destroy(),
        enable: () => editorInstance?.setEditable(true),
        disable: () => editorInstance?.setEditable(false),
        onUpdate: fn => editorInstance?.on('update', () => fn(editorInstance)),
        onSelectionUpdate: fn => editorInstance?.on('selectionUpdate', () => fn(editorInstance)),
        onFocus: fn => editorInstance?.on('focus', () => fn(editorInstance)),
        onBlur: fn => editorInstance?.on('blur', () => fn(editorInstance)),
        onDestroy: fn => editorInstance?.on('destroy', () => fn(editorInstance)),
        afterInit: fn => editorInstance?.on('create', () => fn(editorInstance)),
        onPaste: fn => editorInstance?.on('paste', () => fn(editorInstance)),
        onDrop: fn => editorInstance?.on('drop', () => fn(editorInstance)),
    };
};

