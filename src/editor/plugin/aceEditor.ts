export const initAceInIframe = (iframeWindow: Window, iframeDocument: Document) => {
    const ace = (iframeWindow as any).ace;
    if (!ace) {
        console.error('Ace editor not loaded in iframe.');
        return;
    }

    const editor = ace.edit(iframeDocument.getElementById("source-editor"), {
        mode: "ace/mode/html",
        theme: "ace/theme/monokai",
        fontSize: "14px",
        wrap: true,
        tabSize: 2,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
    });

    // Attach it to iframe's window
    (iframeWindow as any).aceEditor = editor;
}
