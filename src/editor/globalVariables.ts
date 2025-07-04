export let iframeWindow: Window;
export let iframeDocument: Document;

declare global {
    interface Window {
        iro?: any;
        ace?: any;
        aceEditor?: any;
    }
}

export const setIframeContext = (win: Window, doc: Document) => {
    iframeWindow = win;
    iframeDocument = doc;
}
