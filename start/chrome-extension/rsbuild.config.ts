import path from 'node:path';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginChrome } from './plugins/plugin-chrome';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [
    pluginReact(),
    pluginChrome({
      baseManifest: {
        file: path.resolve(__dirname, './chrome-config.ts'),
        exportKey: 'manifest',
      },
      background: path.resolve(__dirname, './src/background/index.ts'),
      contentScripts: [
        {
          file: path.resolve(__dirname, './src/content/index.ts'),
          name: 'content',
          matches: ['http://localhost:*/*'],
        },
      ],
    }),
  ],
  dev: {
    assetPrefix: './',
  },
});
