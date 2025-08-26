---
sidebar_position: 1
---

# Introduction

**Meta Env Typed** is a multi-build-tool plugin that automatically generates `import_meta.d.ts` files to provide complete TypeScript type support for your environment variables.

## Why Meta Env Typed?

Working with environment variables in TypeScript projects often lacks proper type safety. You might find yourself writing code like this:

```typescript
// ❌ No type safety, prone to typos
const apiUrl = import.meta.env.VITE_API_URL; // string | undefined
const port = import.meta.env.VITE_PORT; // string | undefined
```

With **Meta Env Typed**, you get:

```typescript
// ✅ Full type safety and IntelliSense
const apiUrl = import.meta.env.VITE_API_URL; // 'https://api.example.com'
const port = import.meta.env.VITE_PORT; // '3000'
```

## Key Features

- 🚀 **Automatic Generation**: Automatically generates environment variable type definitions
- 💡 **Full TypeScript Support**: Complete IntelliSense and type checking
- ⚡️ **Zero Configuration**: Works out of the box with sensible defaults
- 🔒 **Type Safety**: Prevents typos and runtime errors
- 🔄 **Auto-Updates**: Regenerates types when environment files change
- 🛠️ **Multi-Tool Support**: Works with Vite, Rsbuild, and Rspack (coming soon)

## Supported Build Tools

| Build Tool  | Status         | Version  |
| ----------- | -------------- | -------- |
| **Vite**    | ✅ Supported   | v6.0.0+  |
| **Rsbuild** | ✅ Supported   | v1.3.22+ |
| **Rspack**  | 🚧 Coming Soon | -        |

## Quick Example

After installing and configuring the plugin, it automatically generates a type definition file:

```typescript
// src/import_meta.d.ts (auto-generated)
interface ImportMetaEnv {
  readonly VITE_API_URL: 'https://api.example.com';
  readonly VITE_APP_TITLE: 'My Awesome App';
  readonly VITE_PORT: '3000';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

Now you can use your environment variables with full type safety:

```typescript
// ✅ TypeScript knows the exact type and value
console.log(import.meta.env.VITE_API_URL); // Type: 'https://api.example.com'
console.log(import.meta.env.VITE_APP_TITLE); // Type: 'My Awesome App'

// ✅ TypeScript will catch typos at compile time
console.log(import.meta.env.VITE_API_URl); // ❌ Error: Property 'VITE_API_URl' does not exist
```

## Next Steps

Ready to get started? Check out our [Installation Guide](./getting-started/installation) to add Meta Env Typed to your project.

Or jump straight to the configuration for your build tool:

- [Vite Configuration](./build-tools/vite)
- [Rsbuild Configuration](./build-tools/rsbuild)
