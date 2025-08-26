import type { EnvTypedOptions, GenEnvTypeOptions } from './types';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_OPTIONS } from './constants';

export function mergeOptions(options: EnvTypedOptions): GenEnvTypeOptions {
  return {
    envMode: options.envMode ?? DEFAULT_OPTIONS.envMode,
    envDir: options.envDir ?? DEFAULT_OPTIONS.envDir,
    envPrefix: options.envPrefix ?? DEFAULT_OPTIONS.envPrefix,
    filePath: options.filePath ?? DEFAULT_OPTIONS.filePath,
    valueInType: options.valueInType ?? DEFAULT_OPTIONS.valueInType,
    loadEnv: options.loadEnv ?? DEFAULT_OPTIONS.loadEnv,
    semi: options.semi ?? DEFAULT_OPTIONS.semi,
  };
}

export function isConfigFile(file: string, envDir: string) {
  return file.startsWith(path.join(envDir, '.env'));
}

export const __dirname__
  = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
