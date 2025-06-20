export let iframeWindow: Window;
export let iframeDocument: Document;

export function setIframeContext(win: Window, doc: Document) {
    iframeWindow = win;
    iframeDocument = doc;
}
