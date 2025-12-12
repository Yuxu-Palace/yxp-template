import type { RsbuildPluginAPI } from '@rsbuild/core';
import type { ManifestConfig } from './manifest-type';

export interface ManifestOptions {
  /**
   * 文件路径
   */
  file: string;
  /**
   * 导出字段
   *
   * @default 'default';
   */
  exportKey?: string;
  /**
   * 是否自动注入文件信息
   *
   * 自动将 content/background 等文件信息注入到 manifest.json 中
   *
   * @default true
   */
  autoInjectFileInfo?: boolean;
}

export interface ContentScriptOptions {
  file: string;
  name: string;
  matches: string[];
}

export interface PluginChromeOptions {
  baseManifest: string | ManifestOptions;
  background?: string;
  contentScripts?: (string | ContentScriptOptions)[];
}

export interface ChromePluginCtx {
  api: RsbuildPluginAPI;
  manifest: ManifestConfig;
  manifestInfo: Required<ManifestOptions>;
  options: PluginChromeOptions;
}
