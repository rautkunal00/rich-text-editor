import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

const EventLogger = Extension.create({
  name: 'eventLogger',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('eventLogger'),
        props: {
          handleDOMEvents: {
            keyup: (view, event) => {
              console.log('Key up:', event.key);
              return false;
            },
            handleKeyDown(view, event) {
              console.log('Key down:', event.key);
              return false;
            },
            input(view, event) {
              console.log('Input event:', event);
              return false;
            },
          },
        },
      }),
    ]
  }
});


export default EventLogger

