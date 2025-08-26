---
sidebar_position: 1
---

# Vite Configuration

Learn how to configure Meta Env Typed for Vite projects.

## Basic Setup

Add the plugin to your `vite.config.ts`:

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped()
  ]
});
```

## Configuration Options

The Vite plugin accepts the following options:

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      // Environment variable prefixes (default: 'VITE_')
      envPrefix: ['VITE_', 'CUSTOM_'],

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

By default, Vite only exposes environment variables that start with `VITE_`. Meta Env Typed respects this convention:

```bash title=".env"
# ✅ Will be included (starts with VITE_)
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App

# ❌ Will be ignored (no VITE_ prefix)
DATABASE_URL=postgresql://...
SECRET_KEY=abc123
```

You can customize the prefixes:

```typescript title="vite.config.ts"
export default defineConfig({
  plugins: [
    envTyped({
      envPrefix: ['VITE_', 'PUBLIC_', 'CUSTOM_']
    })
  ]
});
```

## Type Generation Modes

### String Types (Default)

```typescript title="vite.config.ts"
envTyped({
  valueInType: false // default
});
```

Generates:

```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PORT: string;
}
```

### Literal Types

```typescript title="vite.config.ts"
envTyped({
  valueInType: true
});
```

Generates:

```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: 'https://api.example.com';
  readonly VITE_PORT: '3000';
}
```

## Environment Files

Meta Env Typed automatically detects and processes these environment files:

- `.env`
- `.env.local`
- `.env.[mode]`
- `.env.[mode].local`

Where `[mode]` is your current Vite mode (development, production, etc.).

## File Watching

The plugin automatically watches for changes to environment files and regenerates types when:

- Environment files are modified
- Environment files are added or removed
- The development server is running

## Integration with Vite's loadEnv

Meta Env Typed uses Vite's built-in `loadEnv` function, ensuring compatibility with Vite's environment variable handling:

```typescript
// This works exactly like Vite's native behavior
const env = import.meta.env.VITE_API_URL;
```

## TypeScript Configuration

Make sure your `tsconfig.json` includes the generated types:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "types": ["vite/client"]
  },
  "include": [
    "src/**/*",
    "src/import_meta.d.ts" // Include the generated file
  ]
}
```

## Examples

### Basic React Project

```typescript title="vite.config.ts"
import react from '@vitejs/plugin-react';
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    envTyped()
  ]
});
```

### Vue Project with Custom Configuration

```typescript title="vite.config.ts"
import vue from '@vitejs/plugin-vue';
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    vue(),
    envTyped({
      envPrefix: ['VITE_', 'VUE_APP_'],
      filePath: './src/types/env.d.ts',
      valueInType: true
    })
  ]
});
```

### Monorepo Setup

```typescript title="packages/web/vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      // Look for env files in the workspace root
      envDir: '../../',
      // Output types to the package's src directory
      filePath: './src/env.d.ts'
    })
  ]
});
```

## Troubleshooting

### Types Not Updating

1. **Restart the dev server** - Sometimes Vite needs a restart to pick up new types
2. **Check file paths** - Ensure your environment files are in the correct location
3. **Verify prefixes** - Make sure your environment variables have the correct prefix

### TypeScript Errors

If you see TypeScript errors about missing properties:

1. **Check your tsconfig.json** includes the generated file
2. **Restart your TypeScript server** in your editor
3. **Verify the generated file exists** at the specified path

### Plugin Not Running

If the plugin doesn't seem to be running:

1. **Check plugin order** - Make sure `envTyped()` is in your plugins array
2. **Verify installation** - Ensure `meta-env-typed` is installed
3. **Check console output** - Look for any error messages during build
