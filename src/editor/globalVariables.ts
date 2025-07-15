export let iframeWindow: Window;
export let iframeDocument: Document;

declare global {
    interface Window {
        iro?: any;
        ace?: any;
        aceEditor?: any;
        lucide?: {
            createIcons: (options?: Record<string, any>) => void;
        };
    }
}

export const setIframeContext = (win: Window, doc: Document) => {
    iframeWindow = win;
    iframeDocument = doc;
}
