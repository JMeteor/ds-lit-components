import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ include: ['src'] })],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts', // good practice to import each components
        button: 'src/ds-button/ds-button.ts',
        icon: 'src/ds-icon/ds-icon.ts',
        inputText: 'src/ds-inputText/ds-inputText',
        select: 'src/ds-select/ds-select',
      },
      formats: ['es', 'cjs'],
      // fileName: 'ds-components',
    },
    rollupOptions: {
      // If we want to publish standalone components we don't externalize lit,
      // if you are going to use lit in your own project, you can make it a dep instead.
      // external: /^lit/, <-- comment this line
      external: ['lit'],
      output: {
        globals: {
          lit: 'lit',
        },
        format: 'cjs',
      },
    },
    emptyOutDir: true,
  },
  resolve: {
    alias: {},
  },
});
