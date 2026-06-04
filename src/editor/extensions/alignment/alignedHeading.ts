import { Node, mergeAttributes } from '@tiptap/core'
import { alignmentAttributes } from './alignAttributes'

const defaultLevels = [1, 2, 3, 4, 5, 6]

export const AlignedHeading = Node.create({
    name: 'heading',

    addOptions() {
        return {
            levels: defaultLevels,
        }
    },

    content: 'inline*',
    group: 'block',
    defining: true,

    addAttributes() {
        return {
            ...alignmentAttributes,
            level: {
                default: 1,
                parseHTML: (element: HTMLElement) => {
                    const tag = element.tagName.toLowerCase()
                    return parseInt(tag.replace('h', ''), 10)
                },
                renderHTML: (attributes: { level: number }) => ({
                    level: attributes.level,
                }),
            },
        }
    },

    parseHTML() {
        return [
            ...defaultLevels.map(level => ({
                tag: `h${level}`,
                getAttrs: (element: HTMLElement) => ({
                    level,
                    textAlign: element.style.textAlign || null,
                }),
            })),

            {
                tag: 'p',
                getAttrs: (element: HTMLElement) => {
                    const size = parseInt(getComputedStyle(element).fontSize || '', 10)

                    if (size >= 30) {
                        return { level: 1, textAlign: element.style.textAlign || null }
                    } else if (size >= 24) {
                        return { level: 2, textAlign: element.style.textAlign || null }
                    } else if (size >= 20) {
                        return { level: 3, textAlign: element.style.textAlign || null }
                    }

                    return false
                },
            },
        ]
    },

    renderHTML({ node, HTMLAttributes }) {
        const tag = `h${node.attrs.level}`
        return [tag, mergeAttributes(HTMLAttributes), 0]
    },
})
