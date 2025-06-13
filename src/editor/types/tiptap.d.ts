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
    }
  }
}
