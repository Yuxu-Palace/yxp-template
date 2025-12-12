/** biome-ignore-all lint/style/useNamingConvention: define chrome config */
import { defineManifest } from './plugins/plugin-chrome';

export const manifest = defineManifest({
  name: 'My Extension',
  description: 'My Awesome Extension',
  manifest_version: 3,
  version: '1.0',
  action: {
    default_icon: {
      16: 'favicon.png',
      32: 'favicon.png',
    },
    default_popup: 'index.html',
  },
});
