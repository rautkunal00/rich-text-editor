import { loadCSS, loadScript } from './editor/dynamicFunctions';
import { sanitizeHTML } from './editor/extensions/sanitizer';
import { createFooter } from './editor/footer';
import { setIframeContext } from './editor/globalVariables';
import { createEditor } from './editor/header';
import { initMenu } from './editor/initMenu';
import { createToolbar } from './editor/toolbar';
import { EditorAPI, TiptapEditorOptions, EditorOptions } from './globalInterface';
import styleContent from './assets/styles/style.css?raw';

const coreInit = (editorParentContainer: HTMLElement, editorConfig: EditorOptions = {}): Promise<EditorAPI> => {
    // Clear container to prevent duplicate iframes and memory leaks on reconnection
    editorParentContainer.innerHTML = '';
    return new Promise((resolve, reject) => {

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

        editorParentContainer.style.display = 'block';
        editorParentContainer.style.boxSizing = 'border-box';
        editorParentContainer.style.position = 'relative';
        editorParentContainer.style.border = '1px solid #ccc';
        editorParentContainer.style.borderRadius = '8px';
        editorParentContainer.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';

        editorParentContainer.appendChild(loader);

        const editoriframe = document.createElement('iframe');
        editoriframe.style.display = 'block';
        editoriframe.style.boxSizing = 'border-box';
        editoriframe.style.width = editorConfig.width || '100%';
        editoriframe.style.border = 'none';
        editoriframe.style.opacity = '0';
        editoriframe.srcdoc = `<!DOCTYPE html><html><head></head><body></body></html>`;
        editoriframe.style.transition = 'opacity 0.3s ease-in-out';

        editorParentContainer.appendChild(editoriframe);

        window.addEventListener('message', (event) => {
            if (event.source !== editoriframe.contentWindow) return;
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

            const editorElement = editorDocument.createElement('div');
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

class WolkenRichTextEditor extends HTMLElement {
    private _editorConfig: EditorOptions = {};
    private _api: EditorAPI | null = null;
    private _initPromise: Promise<EditorAPI> | null = null;
    private _isInitialized = false;

    static get observedAttributes() {
        return [
            'disabled',
            'show-menu',
            'show-toolbar',
            'height',
            'width',
            'css-files',
            'resize',
            'display-word-count',
            'footer-message'
        ];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.readAttributes();
        setTimeout(() => {
            if (!this._isInitialized) {
                this.initialize();
            }
        }, 0);
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue === newValue) return;
        const propName = this.attributeToProperty(name);
        const parsedValue = this.parseAttributeValue(name, newValue);
        (this._editorConfig as any)[propName] = parsedValue;

        if (this._api) {
            if (name === 'disabled') {
                if (parsedValue) this._api.disable();
                else this._api.enable();
            }
            if (name === 'height' || name === 'width') {
                const iframe = this.querySelector('iframe');
                if (iframe) iframe.style[name as any] = newValue || '';
            }
        }
    }

    get editorConfig(): EditorOptions {
        return this._editorConfig;
    }

    set editorConfig(val: EditorOptions) {
        this._editorConfig = { ...this._editorConfig, ...val };
        if (this.isConnected) {
            if (!this._isInitialized) {
                this.initialize();
            } else if (this._api) {
                if (val.disabled !== undefined) {
                    if (val.disabled) this._api.disable();
                    else this._api.enable();
                }
                if (val.height) {
                    const iframe = this.querySelector('iframe');
                    if (iframe) iframe.style.height = val.height;
                }
                if (val.width) {
                    const iframe = this.querySelector('iframe');
                    if (iframe) iframe.style.width = val.width;
                }
            }
        }
    }

    private attributeToProperty(attr: string): string {
        return attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }

    private parseAttributeValue(attr: string, value: string | null): any {
        if (value === null) return undefined;
        if (value === 'true') return true;
        if (value === 'false') return false;
        if (attr === 'disabled' || attr === 'show-menu' || attr === 'show-toolbar' || attr === 'resize' || attr === 'display-word-count') {
            return value !== 'false';
        }
        return value;
    }

    private readAttributes() {
        const attrs = WolkenRichTextEditor.observedAttributes;
        for (const attr of attrs) {
            if (this.hasAttribute(attr)) {
                const propName = this.attributeToProperty(attr);
                const val = this.getAttribute(attr);
                (this._editorConfig as any)[propName] = this.parseAttributeValue(attr, val);
            }
        }
    }

    async initialize() {
        if (this._isInitialized) return;
        this._isInitialized = true;

        this._initPromise = coreInit(this, this._editorConfig);
        try {
            this._api = await this._initPromise;
            this.dispatchEvent(new CustomEvent('ready', {
                detail: { api: this._api },
                bubbles: true,
                composed: true
            }));
        } catch (error) {
            console.error('Failed to initialize WolkenRichTextEditor:', error);
            this.dispatchEvent(new CustomEvent('error', {
                detail: { error },
                bubbles: true,
                composed: true
            }));
        }
    }

    async setContent(html: string) {
        const api = this._api || await this._initPromise;
        if (api) api.setContent(html);
    }

    async getContent(): Promise<string> {
        const api = this._api || await this._initPromise;
        return api ? api.getContent() : '';
    }

    async getContentAsText(): Promise<string> {
        const api = this._api || await this._initPromise;
        return api ? api.getContentAsText() : '';
    }

    async destroy() {
        if (this._api) {
            this._api.destroy();
            this._api = null;
            this._isInitialized = false;
        }
    }

    async enable() {
        const api = this._api || await this._initPromise;
        if (api) api.enable();
    }

    async disable() {
        const api = this._api || await this._initPromise;
        if (api) api.disable();
    }

    async onUpdate(fn: (editor: any) => void) {
        const api = this._api || await this._initPromise;
        if (api) api.onUpdate(fn);
    }

    async onSelectionUpdate(fn: (editor: any) => void) {
        const api = this._api || await this._initPromise;
        if (api) api.onSelectionUpdate(fn);
    }

    async onFocus(fn: (editor: any) => void) {
        const api = this._api || await this._initPromise;
        if (api) api.onFocus(fn);
    }

    async onBlur(fn: (editor: any) => void) {
        const api = this._api || await this._initPromise;
        if (api) api.onBlur(fn);
    }

    async onDestroy(fn: (editor: any) => void) {
        const api = this._api || await this._initPromise;
        if (api) api.onDestroy(fn);
    }

    async afterInit(fn: (editor: any) => void) {
        const api = this._api || await this._initPromise;
        if (api) api.afterInit(fn);
    }

    async onPaste(fn: (editor: any) => void) {
        const api = this._api || await this._initPromise;
        if (api) api.onPaste(fn);
    }

    async onDrop(fn: (editor: any) => void) {
        const api = this._api || await this._initPromise;
        if (api) api.onDrop(fn);
    }

    disconnectedCallback() {
        this.destroy();
    }
}

const initRichTextEditor = (options: TiptapEditorOptions): Promise<EditorAPI> => {
    const { selector, editorConfig = {} } = options;

    if (!selector) {
        return Promise.reject(new Error("Selector is required when calling initRichTextEditor directly."));
    }

    const editorParentContainer = document.querySelector(selector) as HTMLElement;

    if (!editorParentContainer) {
        return Promise.reject(new Error(`Selector "${selector}" did not match any element in the DOM.`));
    }

    const element = document.createElement('wolken-rich-text-editor') as WolkenRichTextEditor;
    element.editorConfig = editorConfig;
    editorParentContainer.appendChild(element);

    return new Promise((resolve) => {
        element.addEventListener('ready', (event: any) => {
            resolve(event.detail.api);
        });
    });
}

const contentAsText = (value: any) => {
    return value.replaceAll('&nbsp;', ' ').replaceAll('<br>', '\\n');
}

(window as any).initRichTextEditor = initRichTextEditor;

if (!customElements.get('wolken-rich-text-editor')) {
    customElements.define('wolken-rich-text-editor', WolkenRichTextEditor);
}

export { initRichTextEditor, WolkenRichTextEditor };
