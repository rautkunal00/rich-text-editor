import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'TiptapEnhancedEditor',
      formats: ['es', 'umd'],
      fileName: (format) => `tiptap-enhanced-editor.${format}.min.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
        }
      }
    }
  }
});
