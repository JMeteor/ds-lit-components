import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts({ include: ['src'] })],
  build: {
    lib: {
      entry: {
        index: './src/components/index.ts',
        button: './src/components/ds-button/ds-button.component.ts',
        icon: './src/components/ds-icon/ds-icon.component.ts',
        inputText: './src/components/ds-text-input/ds-text-input.component.ts',
        select: './src/components/ds-select/ds-select.component.ts',
      },
      formats: ['es', 'cjs'],
      fileName: (format, name) => `${name}.${format === 'es' ? 'js' : 'cjs'}`,
    },
    minify: false,
    sourcemap: true,
    outDir: 'dist',
    target: 'esnext',
    // rollupOptions: {
    //   // If we want to publish standalone components we don't externalize lit,
    //   // if you are going to use lit in your own project, you can make it a dep instead.
    //   // external: /^lit/, <-- comment this line
    //   external: ['lit'],
    //   output: {
    //     globals: {
    //       lit: 'lit',
    //     },
    //     format: 'cjs',
    //   },
    // },
    // emptyOutDir: true,
  },
  resolve: {
    alias: {},
  },
});
