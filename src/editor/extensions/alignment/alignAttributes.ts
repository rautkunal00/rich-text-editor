export const alignmentAttributes = {
    textAlign: {
        default: null,
        parseHTML: (element: HTMLElement) => {
            return element.style.textAlign || null
        },
        renderHTML: (attributes: Record<string, any>) => {
            if (!attributes.textAlign) return {}
            return {
                style: `text-align: ${attributes.textAlign}`,
            }
        },
    },
}
