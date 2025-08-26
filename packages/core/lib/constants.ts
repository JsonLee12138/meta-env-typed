import type { GenEnvTypeOptions } from './types';
import path from 'node:path';
import process from 'node:process';
import packageJson from '../package.json';

export const PLUGIN_NAME = packageJson.name as string;

export const DEFAULT_OPTIONS: GenEnvTypeOptions = {
  envMode: (process.env as { NODE_ENV: string }).NODE_ENV,
  envDir: process.cwd(),
  envPrefix: '',
  filePath: path.join(process.cwd(), 'src', 'import_meta.d.ts'),
  valueInType: false,
  semi: true,
  loadEnv: () => ({}),
};
