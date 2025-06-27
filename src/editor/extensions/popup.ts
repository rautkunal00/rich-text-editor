import { CommandProps, Extension } from "@tiptap/core"
import { iframeDocument } from "../globalVariables"

export interface PopupExtensionOptions {
    overlayClass?: string
    popupClass?: string
    injectStyles?: boolean
}

export const PopupExtension = Extension.create<PopupExtensionOptions>({
    name: 'customPopup',

    addOptions() {
        return {
            overlayClass: 'tiptap-popup-overlay',
            popupClass: 'tiptap-popup-container',
            injectStyles: true,
        }
    },
    addCommands() {
        return {
            showPopup:
                (config: {
                    html: HTMLElement;
                    position?: { top: number; left: number };
                    height?: string;
                    width?: string;
                    onMount?: (popup: HTMLElement) => void;
                    closeOnOutsideClick?: boolean;
                }) =>
                    (_props: CommandProps) => {
                        const existing = iframeDocument.querySelector('.tiptap-popup');
                        if (existing) existing.remove();

                        const popup = iframeDocument.createElement('div');
                        popup.className = 'tiptap-popup';
                        popup.appendChild(config.html);

                        popup.style.position = 'absolute';
                        popup.style.top = `${config.position?.top || 0}px`;
                        popup.style.left = `${config.position?.left || 0}px`;
                        popup.style.width = `${config.width}`;
                        popup.style.height = `${config.height}`;
                        popup.style.zIndex = '9999';
                        popup.style.background = 'white';
                        popup.style.border = '1px solid #ccc';
                        popup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                        popup.style.padding = '10px';
                        popup.style.borderRadius = '8px';

                        const overlay = iframeDocument.createElement('div');
                        overlay.className = this.options.overlayClass!;
                        iframeDocument.body.appendChild(overlay);
                        
                        iframeDocument.body.appendChild(popup);

                        if (config.onMount) {
                            config.onMount(popup);
                        }

                        const escHandler = (e:KeyboardEvent) => {
                            if(e.key === 'Escape') {
                                overlay.remove();
                                popup.remove();
                                iframeDocument.removeEventListener('keydown', escHandler);
                            }
                        }
                        iframeDocument.addEventListener('keydown',escHandler);

                        (popup as any).escHandler = escHandler;

                        if (config.closeOnOutsideClick) {
                            const outsideClickHandler = (event: MouseEvent) => {
                                if (!popup.contains(event.target as Node)) {
                                    overlay.remove();
                                    popup.remove();
                                    iframeDocument.removeEventListener('mousedown', outsideClickHandler);
                                }
                            };
                            iframeDocument.addEventListener('mousedown', outsideClickHandler);
                        }

                        return true;
                    },

            closePopup:
                () =>
                    (_props: CommandProps) => {
                        const existing = iframeDocument.querySelector('.tiptap-popup');
                        const overlay = iframeDocument.querySelector('.tiptap-popup-overlay');
                        if (existing){
                            const escHandler = (existing as any).escHandler;
                            if(escHandler) {
                                iframeDocument.removeEventListener('keydown',escHandler);
                            }
                            existing.remove();
                            
                        }
                        if(overlay) overlay.remove();
                        return true;
                    },
        };
    },
    onCreate() {
        if (this.options.injectStyles) {
            const style = iframeDocument.createElement('style')
            style.innerHTML = `
        .${this.options.popupClass} { transition: opacity 0.2s ease-in-out; }
        .${this.options.overlayClass} 
        {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.3);
            z-index: 9998;
            transition: background 0.2s ease-in-out; 
        }`
        iframeDocument.head.appendChild(style)
        }
    },
})
