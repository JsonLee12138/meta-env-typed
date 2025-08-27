---
sidebar_position: 1
---

# Custom Templates

Meta Env Typed allows you to customize the generated type definition files using your own templates.

## Why Custom Templates?

While the default templates work well for most projects, you might want to:

- Add additional type information
- Include custom documentation
- Format the output differently
- Support special use cases

## Creating a Custom Template

To use a custom template, create a file with your desired template and reference it in your configuration.

### Template Format

Templates use a simple placeholder syntax:

- `{{envVars}}` - Will be replaced with the environment variable declarations
- `{{importMeta}}` - Will be replaced with the ImportMeta interface declaration

### Example Custom Template

```typescript title="my-template.ts"
/**
 * Custom environment variables template
 * Generated on: {{date}}
 */

{ { envVars; } }

{ { importMeta; } }

// Add any additional custom types here
declare global {
  namespace NodeJS {
    interface ProcessEnv extends ImportMetaEnv {}
  }
}
```

## Using Your Custom Template

Configure your build tool to use your custom template:

```typescript title="vite.config.ts"
import path from 'node:path';
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      template: path.resolve(__dirname, './my-template.ts')
    })
  ]
});
```

## Available Template Variables

| Variable         | Description                                      |
| ---------------- | ------------------------------------------------ |
| `{{envVars}}`    | The environment variable interface declarations  |
| `{{importMeta}}` | The ImportMeta interface declaration             |
| `{{date}}`       | The current date and time                        |
| `{{prefix}}`     | The environment variable prefix (e.g., "VITE\_") |

## Advanced Template Customization

For more advanced customization, you can provide a template function instead of a file path:

```typescript
import envTyped from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    envTyped({
      template: (envVars, importMeta) => `
        // Custom template function
        // Generated on: ${new Date().toISOString()}

        ${envVars}

        ${importMeta}

        // Additional custom types
        declare global {
          namespace NodeJS {
            interface ProcessEnv extends ImportMetaEnv {}
          }
        }
      `
    })
  ]
});
```

This approach gives you full control over the generated output.
