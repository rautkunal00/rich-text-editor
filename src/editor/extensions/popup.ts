import { CommandProps, Extension } from "@tiptap/core"

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
                    html: string;
                    position?: { top: number; left: number };
                    onMount?: (popup: HTMLElement) => void;
                    closeOnOutsideClick?: boolean;
                }) =>
                    (_props: CommandProps) => {
                        const existing = document.querySelector('.tiptap-popup');
                        if (existing) existing.remove();

                        const popup = document.createElement('div');
                        popup.className = 'tiptap-popup';
                        popup.innerHTML = config.html;

                        popup.style.position = 'absolute';
                        popup.style.top = `${config.position?.top || 100}px`;
                        popup.style.left = `${config.position?.left || 100}px`;
                        popup.style.zIndex = '9999';
                        popup.style.background = 'white';
                        popup.style.border = '1px solid #ccc';
                        popup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                        popup.style.padding = '10px';
                        popup.style.borderRadius = '8px';

                        document.body.appendChild(popup);

                        if (config.onMount) {
                            config.onMount(popup);
                        }

                        if (config.closeOnOutsideClick) {
                            const outsideClickHandler = (event: MouseEvent) => {
                                if (!popup.contains(event.target as Node)) {
                                    popup.remove();
                                    document.removeEventListener('mousedown', outsideClickHandler);
                                }
                            };
                            document.addEventListener('mousedown', outsideClickHandler);
                        }

                        return true;
                    },

            closePopup:
                () =>
                    (_props: CommandProps) => {
                        const existing = document.querySelector('.tiptap-popup');
                        if (existing) existing.remove();
                        return true;
                    },
        };
    },

    onCreate() {
        if (this.options.injectStyles) {
            const style = document.createElement('style')
            style.innerHTML = `
        .${this.options.popupClass} { transition: opacity 0.2s ease-in-out; }
        .${this.options.overlayClass} { transition: background 0.2s ease-in-out; }
      `
            document.head.appendChild(style)
        }
    },
})
