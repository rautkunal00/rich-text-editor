import { Node, mergeAttributes } from '@tiptap/core'
import { ResizableImageView } from '../plugin/resizableImageView'
import { NodeSelection } from 'prosemirror-state';


export interface ResizableImageOptions {
    allowBase64: boolean
}

export const ResizableImage = Node.create<ResizableImageOptions>({
    name: 'resizableImage',

    group: 'inline',
    inline: true,
    draggable: true,
    selectable: true,

    addOptions() {
        return {
            allowBase64: true,
        }
    },

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            width: {
                default: null,
            },
            height: {
                default: null,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'img[src]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['img', mergeAttributes(HTMLAttributes)]
    },

    addNodeView() {
        return ({ node, editor, getPos, view }) => {
            return new ResizableImageView({ node, editor, getPos: getPos as () => number, view })
        }
    },
    addCommands() {
        return {
            setImage:
                (attrs) =>
                    ({ commands }) => {
                        return commands.insertContent({
                            type: this.name,
                            attrs,
                        });
                    },
            updateImage:
                (attrs) =>
                    ({ state, commands }) => {
                        const { selection } = state;
                        if (selection instanceof NodeSelection && selection.node.type.name === this.name) {
                            return commands.updateAttributes(this.name, attrs);
                        }

                        const { $from } = state.selection;
                        const node = $from.nodeAfter;
                        if (node?.type.name === this.name) {
                            return commands.updateAttributes(this.name, attrs);
                        }

                        return false;
                    },
        }
    }
})
