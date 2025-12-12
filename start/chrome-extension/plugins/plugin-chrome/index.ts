import type { RsbuildPlugin } from '@rsbuild/core';
import type { PluginChromeOptions } from './types';
import { generateEntryConfig, generateManifest, getManifest, normalizeManifest, patchBaseConfig } from './utils';

export * from './manifest-type';

export function pluginChrome(options: PluginChromeOptions): RsbuildPlugin {
  return {
    name: '@cmtlyt/plugin-chrome-framework',
    async setup(api) {
      const manifestInfo = normalizeManifest(options.baseManifest);
      const manifest = await getManifest(manifestInfo);
      const ctx = { api, manifest, manifestInfo, options };

      api.modifyRsbuildConfig((config) => {
        patchBaseConfig(config, ctx);

        generateEntryConfig(config, ctx);
      });

      api.onAfterBuild(() => generateManifest(api, ctx));

      api.onAfterDevCompile((opts) => {
        if (opts.isFirstCompile) {
          generateManifest(api, ctx).catch(api.logger.error);
        } else {
          api.logger.info('If changes occur in background/contentScripts/manifest.json, please reload the extension.');
        }
      });
    },
  };
}
