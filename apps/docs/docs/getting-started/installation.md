---
sidebar_position: 1
---

# Installation

Get started with Meta Env Typed by installing it in your project.

## Prerequisites

Before installing Meta Env Typed, make sure you have:

- **Node.js** version 18.0 or above
- One of the supported build tools:
  - **Vite** v6.0.0+
  - **Rsbuild** v1.3.22+
  - **Rspack** (coming soon)

## Install the Package

Install Meta Env Typed as a development dependency:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="npm" label="npm">

```bash
npm install meta-env-typed -D
```

</TabItem>
<TabItem value="yarn" label="yarn">

```bash
yarn add meta-env-typed -D
```

</TabItem>
<TabItem value="pnpm" label="pnpm">

```bash
pnpm add meta-env-typed -D
```

</TabItem>
<TabItem value="bun" label="bun">

```bash
bun add meta-env-typed -D
```

</TabItem>
</Tabs>

## Verify Installation

After installation, you can verify that the package is installed correctly by checking your `package.json`:

```json title="package.json"
{
  "devDependencies": {
    "meta-env-typed": "^1.0.0"
  }
}
```

## Next Steps

Now that you have Meta Env Typed installed, you need to configure it for your build tool:

- **Using Vite?** → [Vite Configuration](../build-tools/vite)
- **Using Rsbuild?** → [Rsbuild Configuration](../build-tools/rsbuild)
- **Want a quick start?** → [Quick Start Guide](./quick-start)

## Troubleshooting

### Installation Issues

If you encounter issues during installation:

1. **Clear your package manager cache:**

   ```bash
   # npm
   npm cache clean --force

   # yarn
   yarn cache clean

   # pnpm
   pnpm store prune
   ```

2. **Delete node_modules and reinstall:**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check Node.js version:**
   ```bash
   node --version
   # Should be 18.0.0 or higher
   ```

### Peer Dependencies

Meta Env Typed has peer dependencies on build tools. Make sure you have at least one of the supported build tools installed:

```json title="Peer Dependencies"
{
  "peerDependencies": {
    "@rsbuild/core": ">=1.3.22",
    "@rspack/core": ">=1.3.15",
    "vite": ">=6.0.0"
  }
}
```

If you see peer dependency warnings, install the appropriate build tool for your project.
