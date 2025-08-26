---
sidebar_position: 2
---

# Rsbuild Configuration

Learn how to configure Meta Env Typed for Rsbuild projects.

## Basic Setup

Add the plugin to your `rsbuild.config.ts`:

```typescript title="rsbuild.config.ts"
import { defineConfig } from '@rsbuild/core';
import envTyped from 'meta-env-typed/rsbuild';

export default defineConfig({
  plugins: [
    envTyped()
  ]
});
```

## Configuration Options

The Rsbuild plugin accepts the following options:

```typescript title="rsbuild.config.ts"
import { defineConfig } from '@rsbuild/core';
import envTyped from 'meta-env-typed/rsbuild';

export default defineConfig({
  plugins: [
    envTyped({
      // Environment variable prefixes (default: '' - matches all)
      envPrefix: ['PUBLIC_', 'APP_'],

      // Output file path (default: 'src/import_meta.d.ts')
      filePath: './src/types/env.d.ts',

      // Include actual values in types (default: false)
      valueInType: true,

      // Use semicolons in type definitions (default: true)
      semi: false,

      // Environment files directory (default: process.cwd())
      envDir: './config'
    })
  ]
});
```

## Environment Variable Prefixes

Unlike Vite, Rsbuild doesn't enforce environment variable prefixes by default. Meta Env Typed follows this convention:

```bash title=".env"
# ✅ All variables are included by default
API_URL=https://api.example.com
APP_TITLE=My App
DATABASE_URL=postgresql://...
SECRET_KEY=abc123
```

You can add prefixes for security:

```typescript title="rsbuild.config.ts"
export default defineConfig({
  plugins: [
    envTyped({
      envPrefix: ['PUBLIC_', 'APP_'] // Only include variables with these prefixes
    })
  ]
});
```

## Type Generation Modes

### String Types (Default)

```typescript title="rsbuild.config.ts"
envTyped({
  valueInType: false // default
});
```

Generates:

```typescript
interface ImportMetaEnv {
  readonly API_URL: string;
  readonly PORT: string;
}
```

### Literal Types

```typescript title="rsbuild.config.ts"
envTyped({
  valueInType: true
});
```

Generates:

```typescript
interface ImportMetaEnv {
  readonly API_URL: 'https://api.example.com';
  readonly PORT: '3000';
}
```

## Environment Files

Meta Env Typed automatically detects and processes these environment files:

- `.env`
- `.env.local`
- `.env.[mode]`
- `.env.[mode].local`

Where `[mode]` is your current Rsbuild mode (development, production, etc.).

## Build Integration

The plugin integrates with Rsbuild's build lifecycle:

- **Development**: Types are generated when the dev server starts
- **Production**: Types are generated before the build process
- **Watch Mode**: Types are regenerated when environment files change

## Integration with Rsbuild's Environment Variables

Meta Env Typed uses Rsbuild's built-in environment variable loading, ensuring compatibility:

```typescript
// Access environment variables with full type safety
const apiUrl = import.meta.env.API_URL;
const port = import.meta.env.PORT;
```

## TypeScript Configuration

Make sure your `tsconfig.json` includes the generated types:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "types": ["@rsbuild/core/types"]
  },
  "include": [
    "src/**/*",
    "src/import_meta.d.ts" // Include the generated file
  ]
}
```

## Examples

### Basic React Project

```typescript title="rsbuild.config.ts"
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import envTyped from 'meta-env-typed/rsbuild';

export default defineConfig({
  plugins: [
    pluginReact(),
    envTyped()
  ]
});
```

### Vue Project with Custom Configuration

```typescript title="rsbuild.config.ts"
import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import envTyped from 'meta-env-typed/rsbuild';

export default defineConfig({
  plugins: [
    pluginVue(),
    envTyped({
      envPrefix: ['VUE_APP_', 'PUBLIC_'],
      filePath: './src/types/env.d.ts',
      valueInType: true
    })
  ]
});
```

### Secure Configuration

```typescript title="rsbuild.config.ts"
import { defineConfig } from '@rsbuild/core';
import envTyped from 'meta-env-typed/rsbuild';

export default defineConfig({
  plugins: [
    envTyped({
      // Only expose variables with PUBLIC_ prefix to the client
      envPrefix: ['PUBLIC_'],
      valueInType: false // Don't expose actual values
    })
  ]
});
```

### Monorepo Setup

```typescript title="apps/web/rsbuild.config.ts"
import { defineConfig } from '@rsbuild/core';
import envTyped from 'meta-env-typed/rsbuild';

export default defineConfig({
  plugins: [
    envTyped({
      // Look for env files in the workspace root
      envDir: '../../',
      // Output types to the app's src directory
      filePath: './src/env.d.ts',
      // Use app-specific prefix
      envPrefix: ['WEB_APP_']
    })
  ]
});
```

## Differences from Vite

| Feature        | Vite               | Rsbuild              |
| -------------- | ------------------ | -------------------- |
| Default Prefix | `VITE_`            | None (all variables) |
| File Watching  | Dev server only    | Build + dev server   |
| Integration    | `loadEnv` function | Rsbuild env loading  |

## Troubleshooting

### Types Not Generating

1. **Check plugin registration** - Ensure the plugin is in your `plugins` array
2. **Verify Rsbuild version** - Requires Rsbuild v1.3.22 or higher
3. **Check environment files** - Ensure `.env` files exist and are readable

### Security Concerns

If you're exposing sensitive environment variables:

1. **Use prefixes** - Only expose variables with safe prefixes like `PUBLIC_`
2. **Avoid valueInType** - Don't include actual values in types for sensitive data
3. **Review generated types** - Check the generated file to ensure no secrets are exposed

### Build Errors

If you encounter build errors:

1. **Check TypeScript configuration** - Ensure the generated file is included
2. **Verify file paths** - Make sure the output path is correct
3. **Check permissions** - Ensure the plugin can write to the output directory
