import type { GenEnvTypeOptions } from './types';
import fs from 'node:fs';
import path from 'node:path';
import handlebars from 'handlebars';
import { __dirname__ } from './utils';

export class EnvTyped {
  #loadEnv: (options: Omit<GenEnvTypeOptions, 'loadEnv'>) => Record<string, any>;
  #templateInstance: any;
  #options: Omit<GenEnvTypeOptions, 'loadEnv'>;

  constructor({ loadEnv, ...options }: GenEnvTypeOptions) {
    this.#options = options;
    this.#loadEnv = loadEnv;
  }

  get #tmplFn() {
    if (!this.#templateInstance) {
      const tmplStr = fs.readFileSync(path.resolve(__dirname__, '../tmpl/import.meta.hbs'), 'utf-8');
      this.#templateInstance = handlebars.compile(tmplStr, { noEscape: true });
    }

    return this.#templateInstance;
  }

  #genType(v: any) {
    const _type_ = typeof v;
    if (this.#options.valueInType) {
      if (_type_ === 'string') {
        return `'${v}'`;
      }
      return v;
    }
    return _type_;
  }

  gen() {
    const properties: { key: string; type: string }[] = [];
    const metaObj = this.#loadEnv(this.#options);
    for (const key in metaObj) {
      if (Object.prototype.hasOwnProperty.call(metaObj, key)) {
        let v = metaObj[key];
        try {
          v = JSON.parse(v);
        }
        catch (error) {
          console.error(error);
        }
        properties.push({
          key,
          type: this.#genType(v),
        });
      }
    }
    const content = this.#tmplFn({
      properties,
      semi: this.#options.semi,
    });
    fs.writeFileSync(this.#options.filePath, content, 'utf-8');
  }
}
