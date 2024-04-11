import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-element.ts',
      formats: ['es'],
      fileName: (format) => `ds-components.${format}.js`,
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
