export let iframeWindow: Window;
export let iframeDocument: Document;

export const setIframeContext = (win: Window, doc: Document) => {
    iframeWindow = win;
    iframeDocument = doc;
}
