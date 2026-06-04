import { Extension } from '@tiptap/core'
import { keymap } from 'prosemirror-keymap'
import { splitBlock } from 'prosemirror-commands'

export const ClearMarksOnEnter = Extension.create({
    name: 'clearMarksOnEnter',

    addProseMirrorPlugins() {
        return [
            keymap({
                Enter: (state, dispatch, view) => {
                    if (!dispatch || !view) return false

                    const { $from } = state.selection

                    const skipNodeTypes = ['listItem', 'taskItem', 'heading']
                    for (let d = $from.depth; d > 0; d--) {
                        const node = $from.node(d)
                        if (skipNodeTypes.includes(node.type.name)) {
                            return false
                        }
                    }

                    const marksToClear = ['bold', 'italic', 'underline', 'strike', 'code', 'subscript', 'superscript',
                        'link', 'highlight', 'color', 'textStyle', 'backgroundColor', 'alignment']

                    const activeMarks = state.storedMarks || $from.marks()

                    const filteredMarks = activeMarks?.filter(
                        mark => !marksToClear.includes(mark.type.name)
                    ) ?? []

                    view.dispatch(state.tr.setStoredMarks(filteredMarks.length ? filteredMarks : null))

                    return splitBlock(state, dispatch)
                },
            }),
        ]
    },
})
