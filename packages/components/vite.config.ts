import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: {
        index: 'src/index.ts', // good practice to import each components
        button: 'src/ds-button/ds-button',
        icon: 'src/ds-icon/ds-icon',
        inputText: 'src/ds-inputText/ds-inputText',
        select: 'src/ds-select/ds-select',
      },
      formats: ['es'],
      // formats: ['es', 'cjs'],
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
      },
    },
    emptyOutDir: true,
  },
  resolve: {
    alias: {},
  },
});
