import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    emptyOutDir: true,
    ssr: true,
    minify: false,
    outDir: 'dist-client',
    lib: {
      entry: path.resolve(__dirname, 'src', 'client-sdk.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['node_modules', '^node:'],
    },
  },
  plugins: [
    dts({
      outDir: 'dist-client',
      include: ['./src/**/*'],
    }),
  ],
});
