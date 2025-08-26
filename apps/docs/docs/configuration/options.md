---
sidebar_position: 1
---

# Configuration Options

Complete reference for all Meta Env Typed configuration options.

## Overview

Meta Env Typed accepts a configuration object with the following structure:

```typescript
interface EnvTypedOptions {
  envDir?: string;
  envPrefix?: string | string[];
  filePath?: string;
  valueInType?: boolean;
  semi?: boolean;
}
```

## Options Reference

### `envDir`

**Type:** `string`
**Default:** `process.cwd()`

The directory where environment files are located.

```typescript
envTyped({
  envDir: './config' // Look for .env files in ./config directory
});
```

**Examples:**

```typescript
// Look in project root (default)
envDir: process.cwd();

// Look in config directory
envDir: './config';

// Look in parent directory (monorepo)
envDir: '../';

// Absolute path
envDir: '/path/to/env/files';
```

### `envPrefix`

**Type:** `string | string[]`
**Default:**

- Vite: `'VITE_'`
- Rsbuild: `''` (empty string, matches all variables)

Environment variable prefixes to include in type generation.

```typescript
// Single prefix
envTyped({
  envPrefix: 'VITE_'
});

// Multiple prefixes
envTyped({
  envPrefix: ['VITE_', 'PUBLIC_', 'CUSTOM_']
});

// No prefix (include all variables)
envTyped({
  envPrefix: ''
});
```

**Examples:**

```bash title=".env"
VITE_API_URL=https://api.example.com
PUBLIC_APP_NAME=My App
CUSTOM_FEATURE_FLAG=true
DATABASE_URL=postgresql://...
SECRET_KEY=abc123
```

```typescript
// Only VITE_ variables
envPrefix: 'VITE_';
// Result: VITE_API_URL

// Multiple prefixes
envPrefix: ['VITE_', 'PUBLIC_'];
// Result: VITE_API_URL, PUBLIC_APP_NAME

// All variables
envPrefix: '';
// Result: All variables including DATABASE_URL, SECRET_KEY
```

### `filePath`

**Type:** `string`
**Default:** `'src/import_meta.d.ts'`

The output path for the generated TypeScript declaration file.

```typescript
envTyped({
  filePath: './src/types/env.d.ts'
});
```

**Examples:**

```typescript
// Default location
filePath: 'src/import_meta.d.ts';

// Custom types directory
filePath: './src/types/env.d.ts';

// Root level
filePath: './env.d.ts';

// Nested structure
filePath: './src/generated/environment.d.ts';
```

### `valueInType`

**Type:** `boolean`
**Default:** `false`

Whether to include actual environment variable values as literal types instead of generic `string` types.

```typescript
envTyped({
  valueInType: true
});
```

**When `false` (default):**

```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PORT: string;
  readonly VITE_ENABLED: string;
}
```

**When `true`:**

```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: 'https://api.example.com';
  readonly VITE_PORT: '3000';
  readonly VITE_ENABLED: 'true';
}
```

**Security Considerations:**

- ⚠️ **Be careful with sensitive data** - Actual values will be visible in the generated types
- ✅ **Good for public configuration** - API URLs, feature flags, public settings
- ❌ **Avoid for secrets** - API keys, passwords, database URLs

### `semi`

**Type:** `boolean`
**Default:** `true`

Whether to include semicolons in the generated TypeScript declarations.

```typescript
envTyped({
  semi: false
});
```

**When `true` (default):**

```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

**When `false`:**

```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## Build Tool Specific Defaults

### Vite Defaults

```typescript
{
  envDir: process.cwd(),
  envPrefix: 'VITE_',
  filePath: 'src/import_meta.d.ts',
  valueInType: false,
  semi: true
}
```

### Rsbuild Defaults

```typescript
{
  envDir: process.cwd(),
  envPrefix: '', // No prefix - includes all variables
  filePath: 'src/import_meta.d.ts',
  valueInType: false,
  semi: true
}
```

## Complete Configuration Examples

### Development Configuration

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      envPrefix: ['VITE_', 'PUBLIC_'],
      filePath: './src/types/env.d.ts',
      valueInType: true, // Show actual values for debugging
      semi: false
    })
  ]
});
```

### Production Configuration

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      envPrefix: 'VITE_', // Only safe public variables
      valueInType: false, // Don't expose actual values
      filePath: './src/env.d.ts'
    })
  ]
});
```

### Monorepo Configuration

```typescript title="apps/web/vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      envDir: '../../', // Look in workspace root
      envPrefix: ['WEB_', 'SHARED_'],
      filePath: './src/types/env.d.ts'
    })
  ]
});
```

## Environment-Specific Configuration

You can use different configurations based on the build mode:

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  plugins: [
    envTyped({
      valueInType: mode === 'development', // Only in dev mode
      envPrefix: mode === 'production' ? 'VITE_' : ['VITE_', 'DEV_']
    })
  ]
}));
```
