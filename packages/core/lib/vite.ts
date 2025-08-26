import type { ConfigEnv, PluginOption } from 'vite';
import type { GenEnvTypeOptions } from './types';
import { loadEnv } from 'vite';
import { PLUGIN_NAME } from './constants';
import { EnvTyped } from './core';
import { isConfigFile, mergeOptions } from './utils';

export type ViteGenEnvTypeOptions = Partial<Omit<GenEnvTypeOptions, 'envMode'> & {
  envMode: ConfigEnv['mode'];
}>;

const iLoadEnv = (opts: Omit<GenEnvTypeOptions, 'loadEnv'>) => loadEnv(opts.envMode, opts.envDir, opts.envPrefix);

function metaEnvTyped(options: ViteGenEnvTypeOptions = {}): PluginOption {
  const _options_ = mergeOptions(options);
  const core = new EnvTyped({ ..._options_, loadEnv: iLoadEnv });

  return {
    name: PLUGIN_NAME,
    enforce: 'pre',
    buildStart: () => {
      core.gen();
    },
    configureServer: (server) => {
      server.watcher.on('unlink', (file) => {
        if (isConfigFile(file, _options_.envDir)) {
          core.gen();
        }
      });
      server.watcher.on('change', (file) => {
        if (isConfigFile(file, _options_.envDir)) {
          core.gen();
        }
      });
    },
  };
}

export default metaEnvTyped;
