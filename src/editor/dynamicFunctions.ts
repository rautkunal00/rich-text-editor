export const loadCSS = (href: string, doc: Document = document) => {
    return new Promise<void>((resolve, reject) => {
        const link = doc.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => reject(`Failed to load CSS: ${href}`);
        doc.head.appendChild(link);
    });
};

export const loadScript = (src: string, document: any, async: boolean = true): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = async;
        script.crossOrigin = 'anonymous';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
}
