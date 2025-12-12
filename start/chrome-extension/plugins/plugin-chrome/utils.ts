import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import type { RsbuildConfig, RsbuildEntry, RsbuildEntryDescription, RsbuildPluginAPI, WatchFiles } from '@rsbuild/core';
import { isArray, isFalse, isPlainObject, isString } from '@yuxu-palace/kun-mythos';
import type { ChromePluginCtx, ContentScriptOptions, ManifestOptions, PluginChromeOptions } from './types';

export const IS_DEV = process.env.NODE_ENV === 'development';

export async function generateManifest(api: RsbuildPluginAPI, ctx: ChromePluginCtx) {
  const manifest = await getManifest(ctx.manifestInfo);

  const config = api.getNormalizedConfig();
  const distRoot = config.output.distPath.root;
  fs.writeFile(path.resolve(distRoot, 'manifest.json'), JSON.stringify(manifest, null, 2), (err) => {
    if (err) {
      api.logger.error(err);
    } else {
      api.logger.success('manifest.json generated');
    }
  });
}

export function patchBaseConfig(config: RsbuildConfig, ctx: ChromePluginCtx) {
  const oldWatchFiles = [config.dev?.watchFiles || []].flat(1);

  const watchFiles = [
    ctx.manifestInfo.file,
    ctx.manifest.content_scripts?.map((item) => [item.js, item.css]),
    ctx.manifest.content_scripts?.map((item) => [item.js, item.css]),
  ]
    .flat(Number.POSITIVE_INFINITY)
    .filter(isString);

  const backgroundScript = ctx.options.background || ctx.manifest.background?.service_worker;
  if (backgroundScript) {
    watchFiles.push(backgroundScript);
  }

  config.dev = {
    ...config.dev,
    writeToDisk: true,
    watchFiles: [
      ...oldWatchFiles,
      {
        paths: watchFiles,
        type: 'reload-page',
      } satisfies WatchFiles,
    ],
  };
}

export function normalizeManifest(manifestOptions: PluginChromeOptions['baseManifest']) {
  const manifestInfo = {
    file: '',
    exportKey: 'default',
    autoInjectFileInfo: true,
  };
  if (isString(manifestOptions)) {
    manifestInfo.file = manifestOptions;
  } else if (isPlainObject(manifestOptions)) {
    Object.assign(manifestInfo, manifestOptions);
  }
  return manifestInfo;
}

export async function getManifest(manifestInfo: Required<ManifestOptions>) {
  return import(manifestInfo.file).then((module) => module[manifestInfo.exportKey]);
}

export function registerEntry(entry: RsbuildEntry, name: string, options: RsbuildEntryDescription) {
  entry[name] = options;
}

export function registerBackground(ctx: ChromePluginCtx) {
  const entry: RsbuildEntry = {};
  if (ctx.options.background) {
    registerEntry(entry, 'background', {
      import: ctx.options.background,
      filename: 'background.js',
      html: false,
    });
    if (isFalse(ctx.manifestInfo.autoInjectFileInfo)) {
      return;
    }
    ctx.manifest.background = {
      ...ctx.manifest.background,
      // biome-ignore lint/style/useNamingConvention: chrome manifest
      service_worker: 'background.js',
    };
  }
  return entry;
}

export function normalizeContentScript(
  content: Required<PluginChromeOptions>['contentScripts'][number],
): ContentScriptOptions {
  const contentInfo = {
    file: '',
    name: 'contentScript',
    html: false,
    matches: ['*'],
  };
  if (isString(content)) {
    contentInfo.file = content;
  } else if (isPlainObject(content)) {
    Object.assign(contentInfo, content);
  }
  return contentInfo;
}

export function registerContentScripts(ctx: ChromePluginCtx) {
  const entry: RsbuildEntry = {};
  if (isArray(ctx.options.contentScripts)) {
    ctx.options.contentScripts.forEach((content, index) => {
      const contentScripts = normalizeContentScript(content);
      const filename = `${contentScripts.name}-${index}.js`;
      registerEntry(entry, 'contentScripts', {
        import: contentScripts.file,
        filename,
        html: false,
      });
      if (isFalse(ctx.manifestInfo.autoInjectFileInfo)) {
        return;
      }
      ctx.manifest.content_scripts = [
        ...(ctx.manifest.content_scripts || ([] as any[])),
        {
          matches: contentScripts.matches,
          js: [filename],
        },
      ];
    });
  }
  return entry;
}

export function generateEntryConfig(config: RsbuildConfig, ctx: ChromePluginCtx) {
  const backgroundEntry = registerBackground(ctx);
  const contentScriptsEntry = registerContentScripts(ctx);

  const { environments, ...otherConfig } = config;

  config.environments = {
    ...environments,
    chromePopup: {
      ...otherConfig,
      source: {
        ...config.source,
        entry: {
          ...config.source?.entry,
          index: {
            import: path.resolve(process.cwd(), './src/index'),
          },
        },
      },
    },
    chromeBackground: {
      source: { entry: backgroundEntry },
      output: { target: 'web-worker' },
    },
    chromeContentScripts: {
      source: { entry: contentScriptsEntry },
      output: { target: 'web-worker' },
    },
  };

  if (IS_DEV) {
    if (ctx.manifest.action) {
      ctx.manifest.action.default_popup = 'devIndex.html';
    }

    config.environments.chromeDevPopup = {
      source: {
        entry: {
          devIndex: {
            import: path.resolve(process.cwd(), './src/index'),
          },
        },
      },
      dev: {
        hmr: false,
        liveReload: false,
      },
    };
  }
}
