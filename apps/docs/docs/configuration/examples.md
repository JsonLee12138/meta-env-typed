---
sidebar_position: 2
---

# Configuration Examples

This page provides various configuration examples for Meta Env Typed with different build tools and scenarios.

## Basic Examples

### Vite

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped()
  ]
});
```

### Rsbuild

```typescript title="rsbuild.config.ts"
import { defineConfig } from '@rsbuild/core';
import envTyped from 'meta-env-typed/rsbuild';

export default defineConfig({
  plugins: [
    envTyped()
  ]
});
```

## Advanced Configuration

### Custom Output Path

```typescript title="vite.config.ts"
import path from 'node:path';
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      outputPath: path.resolve(__dirname, './src/types/env.d.ts')
    })
  ]
});
```

### Value Types

Enable literal types for your environment variables:

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      valueInType: true
    })
  ]
});
```

### Custom Environment Files

Specify custom environment files:

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      envFiles: [
        '.env',
        '.env.local',
        '.env.development',
        '.env.production'
      ]
    })
  ]
});
```

### Custom Prefix

Change the environment variable prefix:

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      prefix: 'APP_'
    })
  ]
});
```

### Type Inference

Enable automatic type inference based on values:

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      inferType: true
    })
  ]
});
```

This will generate types like:

```typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DEBUG_MODE: boolean; // Inferred from "true" value
  readonly VITE_PORT: number; // Inferred from "3000" value
}
```

### Combined Configuration

```typescript title="vite.config.ts"
import path from 'node:path';
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      prefix: 'VITE_',
      valueInType: true,
      inferType: true,
      outputPath: path.resolve(__dirname, './src/types/env.d.ts'),
      envFiles: ['.env', '.env.local'],
      template: path.resolve(__dirname, './env-template.ts')
    })
  ]
});
```

## Working with Multiple Environments

### Development vs Production

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      envTyped({
        envFiles: [
          '.env',
          `.env.${mode}`,
          `.env.${mode}.local`
        ]
      })
    ]
  };
});
```

### Environment-Specific Type Generation

```typescript title="vite.config.ts"
import path from 'node:path';
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      envTyped({
        outputPath: path.resolve(__dirname, `./src/types/env.${mode}.d.ts`),
        envFiles: [`.env.${mode}`]
      })
    ]
  };
});
```

## Integration with Other Tools

### With TypeScript Paths

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    envTyped()
  ]
});
```

### With React

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

## Troubleshooting

If you're experiencing issues with your configuration, try enabling debug mode:

```typescript title="vite.config.ts"
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      debug: true
    })
  ]
});
```

This will output additional information to the console during the build process.
