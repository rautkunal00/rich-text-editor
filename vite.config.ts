import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'RichTextEnhancedEditor',
      formats: ['es', 'umd'],
      fileName: (format) => `rich-text-enhanced-editor.${format}.min.js`,
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
