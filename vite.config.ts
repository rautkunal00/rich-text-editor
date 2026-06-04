import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    emptyOutDir: false,

    cssCodeSplit: false,

    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'WolkenUnifiedRichTextEditor',

      formats: ['es', 'umd'],

      fileName: (format) => {
        if (format === 'es') {
          return 'wolken-unified-rich-text-editor.es.min.js';
        }

        return 'wolken-unified-rich-text-editor.umd.min.cjs';
      },
    },

    rollupOptions: {
      external: [
        '@tiptap/core',
        '@tiptap/starter-kit',
        '@tiptap/extensions'
      ],

      output: {
        globals: {
          '@tiptap/core': 'TiptapCore',
          '@tiptap/starter-kit': 'StarterKit',
          '@tiptap/extensions': 'TiptapExtensions'
        }
      }
    }
  }
});