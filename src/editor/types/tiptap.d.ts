import '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType
      unsetFontSize: () => ReturnType
    },
    fontFamily: {
      setFontFamily: (font: string) => ReturnType
      unsetFontFamily: () => ReturnType
    },
    textColor: {
      setTextColor: (color: string) => ReturnType
      unsetTextColor: () => ReturnType
    },
    capitalization: {
      setCapitalization: (type: 'uppercase' | 'lowercase' | 'capitalize') => ReturnType
      unsetCapitalization: () => ReturnType
    },
    popup: {
      showPopup: (config: {
        html: HTMLElement;
        position?: { top: number; left: number };
        width?: string;
        height?: string;
        onMount?: (popup: HTMLElement) => void;
        closeOnOutsideClick?: boolean;
      }) => ReturnType;
      closePopup: () => ReturnType;
    },
    textDirection: {
      setLTR: () => ReturnType;
      setRTL: () => ReturnType;
    },
    pageBreak: {
      insertPageBreak: () => ReturnType;
    },
    visualBlocks: {
      toggleVisualBlocks: () => ReturnType
    },
    visualCharacters: {
      toggleVisualCharacters: () => ReturnType
    },
    insertMedia: {
      insertMedia: (attrs: { src: string; type: 'audio' | 'video' }) => ReturnType
    }
  }
}
