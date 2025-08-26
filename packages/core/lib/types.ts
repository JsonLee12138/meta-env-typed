export interface GenEnvTypeOptions {
  envMode: string;
  envDir: string;
  envPrefix: string | string[];
  filePath: string;
  valueInType: boolean;
  semi: boolean;
  loadEnv: (options: Omit<GenEnvTypeOptions, 'loadEnv'>) => Record<string, any>;
}

export type EnvTypedOptions = Partial<GenEnvTypeOptions>;
