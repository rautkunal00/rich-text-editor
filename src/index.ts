import { loadCSS, loadScript } from './editor/dynamicFunctions';
import { sanitizeHTML } from './editor/extensions/sanitizer';
import { createFooter } from './editor/footer';
import { setIframeContext } from './editor/globalVariables';
import { createEditor } from './editor/header';
import { initMenu } from './editor/initMenu';
import { createToolbar } from './editor/toolbar';
import { EditorAPI, TiptapEditorOptions } from './globalInterface';
import styleContent from './assets/styles/style.css?raw';

const coreInit = (options: TiptapEditorOptions): Promise<EditorAPI> => {
    return new Promise((resolve, reject) => {
        const { selector, editorConfig = {} } = options;
        const editorParentContainer = document.querySelector(selector) as HTMLElement;

        if (!editorParentContainer) {
            reject(new Error(`Selector "${selector}" did not match any element in the DOM.`));
            return;
        }

        // Create and show loader
        const loader = document.createElement('div');
        loader.id = 'editor-loader';
        loader.innerHTML = `
            <div class="editor-loading-spinner">
                <div class="spinner"></div>
            </div>
        `;
        loader.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255, 255, 255, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            border-radius: 8px;
        `;

        const spinnerStyles = `
            .editor-loading-spinner {
                text-align: center;
                color: #666;
            }
            .spinner {
                width: 40px;
                height: 40px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #3498db;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 10px;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = spinnerStyles;
        document.head.appendChild(styleSheet);

        editorParentContainer.style.position = 'relative';
        editorParentContainer.style.border = '1px solid #ccc';
        editorParentContainer.style.borderRadius = '8px';
        editorParentContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';

        editorParentContainer.appendChild(loader);

        const editoriframe = document.createElement('iframe');
        editoriframe.style.width = editorConfig.width || '100%';
        editoriframe.style.border = 'none';
        editoriframe.style.opacity = '0';
        editoriframe.srcdoc = `<!DOCTYPE html><html><head></head><body></body></html>`;
        editoriframe.style.transition = 'opacity 0.3s ease-in-out';

        editorParentContainer.appendChild(editoriframe);

        window.addEventListener('message', (event) => {
            if (event.data?.type === 'TOGGLE_FULLSCREEN') {
                if (!document.fullscreenElement) {
                    editoriframe.requestFullscreen().catch(err => {
                        console.error('Failed to enter fullscreen', err);
                    });
                } else {
                    document.exitFullscreen();
                }
            }
        });

        editoriframe.onload = () => {
            const editorWindow = editoriframe.contentWindow as Window;
            const editorDocument = editorWindow.document as Document;
            const editorContainer = editorDocument.body;

            // add css from css file
            const styleTag = editorDocument.createElement('style');
            styleTag.innerHTML = styleContent;
            editorDocument.head.appendChild(styleTag);

            editorContainer.classList.add('editor-container');
            setIframeContext(editorWindow, editorDocument);

            const uniqueId = 'editor-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

            const editorElement = editorDocument.createElement('div');
            editorElement.id = uniqueId;
            editorElement.className = 'tiptap-editor rich-text-editor';
            editorElement.style.height = editorConfig.height || '250px';
            editorContainer.appendChild(editorElement);

            const editorInstance = createEditor(editorElement, editorConfig);

            const scripts = [
                'https://unpkg.com/lucide@latest',
                'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.3/ace.js',
                'https://cdnjs.cloudflare.com/ajax/libs/ace/1.32.3/ext-language_tools.min.js'
            ];

            let loadedScripts = 0;
            const totalScripts = scripts.length;

            scripts.forEach(scriptUrl => {
                loadScript(scriptUrl, editorDocument)
                    .then(() => {
                        loadedScripts++;
                        if (scriptUrl.includes('lucide')) {
                            const win = editorWindow as Window & { lucide?: { createIcons: () => void } };
                            win.lucide?.createIcons();
                        }

                        // Check if all scripts are loaded
                        if (loadedScripts === totalScripts) {
                            finishLoading();
                        }
                    })
                    .catch(console.error);
            });

            const styles = [];

            if (editorConfig?.cssFiles) {
                styles.push(...editorConfig.cssFiles.split(','));
            }
            styles.forEach(style => loadCSS(style, editorDocument));

            if (editorConfig?.showToolbar) {
                const toolbar = createToolbar(editorInstance);
                editorContainer.prepend(toolbar);
                initMenu(editorInstance, editorElement);
            }

            const footerElement = editorDocument.createElement('div');
            createFooter(editorElement, footerElement, editorConfig);
            editorContainer.append(footerElement);

            resizeIframe(editoriframe, editorContainer);

            function finishLoading() {
                // Fade in the iframe
                editoriframe.style.opacity = '1';

                // Remove loader after a short delay to ensure smooth transition
                setTimeout(() => {
                    if (loader.parentNode) {
                        loader.parentNode.removeChild(loader);
                    }
                    if (styleSheet.parentNode) {
                        styleSheet.parentNode.removeChild(styleSheet);
                    }
                }, 300);

                resolve({
                    setContent: (html: string) => editorInstance.commands.setContent(sanitizeHTML(html)),
                    getContent: () => sanitizeHTML(editorInstance.getHTML() || ''),
                    getContentAsText: () => contentAsText(editorInstance.getText()),
                    destroy: () => editorInstance.destroy(),
                    enable: () => editorInstance.setEditable(true),
                    disable: () => editorInstance.setEditable(false),

                    onUpdate: fn => editorInstance.on('update', () => fn(editorInstance)),
                    onSelectionUpdate: fn => editorInstance.on('selectionUpdate', () => fn(editorInstance)),
                    onFocus: fn => editorInstance.on('focus', () => fn(editorInstance)),
                    onBlur: fn => editorInstance.on('blur', () => fn(editorInstance)),
                    onDestroy: fn => editorInstance.on('destroy', () => fn(editorInstance)),
                    afterInit: fn => editorInstance.on('create', () => fn(editorInstance)),
                    onPaste: fn => editorInstance.on('paste', () => fn(editorInstance)),
                    onDrop: fn => editorInstance.on('drop', () => fn(editorInstance)),
                });
            }
        };
    });
};


const resizeIframe = (editoriframe: HTMLIFrameElement, editorContainer: HTMLElement) => {
    const resizeObserver = new ResizeObserver(() => {
        editoriframe.style.height = editorContainer.scrollHeight + 'px';
    });
    resizeObserver.observe(editorContainer);

    const resizeframe = () => {
        const newHeight = editorContainer.scrollHeight;
        editoriframe.style.height = newHeight + 'px';
    };
    resizeframe();
};

const initRichTextEditor = (config: any) => {
    return coreInit(config);
}

const contentAsText = (value: any) => {
    return value.replaceAll('&nbsp;', ' ').replaceAll('<br>', '\\n');
}

(window as any).initRichTextEditor = initRichTextEditor;

export { initRichTextEditor };
