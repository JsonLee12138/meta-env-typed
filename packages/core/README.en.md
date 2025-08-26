# Meta Env Typed

**[中文文档](https://github.com/JsonLee12138/meta-env-typed/blob/main/README.md)**

## Introduction

`meta-env-typed` is a multi-build-tool plugin that automatically generates `import_meta.d.ts` files to provide complete TypeScript type support for your environment variables. Currently supports Vite and Rsbuild, with Rspack support coming soon.

## Features

- 🚀 Automatic generation of environment variable type definitions
- 💡 Full TypeScript support
- ⚡️ Zero configuration, ready to use
- 🔒 Type-safe environment variable access
- 🔄 Auto-updates type definitions when environment files change
- 🛠️ Multi-build-tool support (Vite, Rsbuild, Rspack coming soon)

## Installation

```bash
# Using npm
npm install meta-env-typed -D

# Using yarn
yarn add meta-env-typed -D

# Using pnpm
pnpm add meta-env-typed -D
```

## Usage

### Vite

Configure the plugin in your `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import envTyped from 'meta-env-typed/vite'

export default defineConfig({
  plugins: [
    envTyped({
      // Optional: Specify environment variable prefixes, defaults to 'VITE_'
      envPrefix: ['VITE_', 'CUSTOM_'],
      // Optional: Specify type definition file output path, defaults to 'src/import_meta.d.ts'
      filePath: './src/types/import_meta.d.ts',
      // Optional: Whether to include actual values in types, defaults to false
      valueInType: true,
      // Optional: Whether to use semicolons in type definitions, defaults to true
      semi: false
    })
  ]
})
```

### Rsbuild

Configure the plugin in your `rsbuild.config.ts`:

```typescript
import { defineConfig } from '@rsbuild/core'
import envTyped from 'meta-env-typed/rsbuild'

export default defineConfig({
  plugins: [
    envTyped({
      // Optional: Specify environment variable prefixes, defaults to '' (empty string, matches all variables)
      envPrefix: ['CUSTOM_', 'APP_'],
      // Optional: Specify type definition file output path, defaults to 'src/import_meta.d.ts'
      filePath: './src/types/import_meta.d.ts',
      // Optional: Whether to include actual values in types, defaults to false
      valueInType: true
    })
  ]
})
```

### Use in Your Code

```typescript
// Now you get full type hints
console.log(import.meta.env.VITE_API_URL)
console.log(import.meta.env.CUSTOM_SECRET_KEY)
```

## Configuration Options

The plugin supports the following configuration options:

```typescript
interface EnvTypedOptions {
  /**
   * Environment file directory
   * @default process.cwd()
   */
  envDir?: string

  /**
   * Environment variable prefixes
   * Vite: @default 'VITE_'
   * Rsbuild: @default ''
   */
  envPrefix?: string | string[]

  /**
   * Type definition file output path
   * @default 'src/import_meta.d.ts'
   */
  filePath?: string

  /**
   * Whether to include actual values in types
   * @default false
   * @example
   * // When valueInType is false
   * VITE_API_URL: string
   * // When valueInType is true
   * VITE_API_URL: 'https://api.example.com'
   */
  valueInType?: boolean

  /**
   * Whether to use semicolons in type definitions
   * @default true
   */
  semi?: boolean
}
```

## Examples

### Basic Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import envTyped from 'meta-env-typed/vite'

export default defineConfig({
  plugins: [envTyped()]
})
```

### Custom Environment Variable Prefixes

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    envTyped({
      envPrefix: ['VITE_', 'CUSTOM_']
    })
  ]
})
```

### Include Actual Values

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    envTyped({
      valueInType: true
    })
  ]
})
```

### Rsbuild Example

```typescript
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import envTyped from 'meta-env-typed/rsbuild'

export default defineConfig({
  plugins: [
    envTyped({
      envPrefix: ['APP_', 'PUBLIC_'],
      filePath: './types/env.d.ts'
    })
  ]
})
```

## Supported Build Tools

- ✅ **Vite** (v6.0.0+)
- ✅ **Rsbuild** (v1.3.22+)
- 🚧 **Rspack** (Coming Soon)

## 📝 Contribution Guide

Feel free to submit `issues` or `pull requests` to help improve `meta-env-typed`.

## 📄 License

MIT

## Contact Us

- [GitHub Issues](https://github.com/JsonLee12138/meta-env-typed/issues)
- Email: jsonlee_12138@icloud.com
- Discord: https://discord.gg/666U6JTCQY