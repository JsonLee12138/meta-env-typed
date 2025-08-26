import type { RsbuildPlugin } from '@rsbuild/core';
import type { GenEnvTypeOptions } from './types';
import { loadEnv } from '@rsbuild/core';
import { PLUGIN_NAME } from './constants';
import { EnvTyped } from './core';
import { mergeOptions } from './utils';

export type RsbuildGenEnvTypeOptions = Partial<Omit<GenEnvTypeOptions, 'envMode'>>;

function iLoadEnv({ envMode, envDir, envPrefix }: Omit<GenEnvTypeOptions, 'loadEnv'>): Record<string, string> {
  const envConfig = loadEnv({
    cwd: envDir,
    mode: envMode,
    prefixes: Array.isArray(envPrefix) ? envPrefix : [envPrefix],
  });

  return Object.entries(envConfig.parsed || {}).reduce((acc, [key, value]) => {
    acc[key] = value;

    return acc;
  }, {} as Record<string, any>);
}

function metaEnvTyped(options: RsbuildGenEnvTypeOptions = {}): RsbuildPlugin {
  const _options_ = mergeOptions(options);
  const core = new EnvTyped({ ..._options_, loadEnv: iLoadEnv });

  return {
    name: PLUGIN_NAME,
    setup(api) {
      api.onBeforeBuild(() => {
        core.gen();
      });
    },
  };
}

export default metaEnvTyped;
