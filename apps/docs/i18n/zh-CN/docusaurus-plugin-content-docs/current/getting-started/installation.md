---
sidebar_position: 1
---

# 安装

通过在项目中安装 Meta Env Typed 来开始使用。

## 前置要求

在安装 Meta Env Typed 之前，请确保你有：

- **Node.js** 版本 18.0 或以上
- 支持的构建工具之一：
  - **Vite** v6.0.0+
  - **Rsbuild** v1.3.22+
  - **Rspack**（即将推出）

## 安装包

将 Meta Env Typed 作为开发依赖安装：

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

## 验证安装

安装后，你可以通过检查 `package.json` 来验证包是否正确安装：

```json title="package.json"
{
  "devDependencies": {
    "meta-env-typed": "^1.0.0"
  }
}
```

## 下一步

现在你已经安装了 Meta Env Typed，你需要为你的构建工具配置它：

- **使用 Vite？** → [Vite 配置](../build-tools/vite)
- **使用 Rsbuild？** → [Rsbuild 配置](../build-tools/rsbuild)
- **想要快速开始？** → [快速开始指南](./quick-start)

## 故障排除

### 安装问题

如果在安装过程中遇到问题：

1. **清除包管理器缓存：**

   ```bash
   # npm
   npm cache clean --force

   # yarn
   yarn cache clean

   # pnpm
   pnpm store prune
   ```

2. **删除 node_modules 并重新安装：**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **检查 Node.js 版本：**
   ```bash
   node --version
   # 应该是 18.0.0 或更高版本
   ```

### 对等依赖

Meta Env Typed 对构建工具有对等依赖。确保你至少安装了一个支持的构建工具：

```json title="对等依赖"
{
  "peerDependencies": {
    "@rsbuild/core": ">=1.3.22",
    "@rspack/core": ">=1.3.15",
    "vite": ">=6.0.0"
  }
}
```

如果你看到对等依赖警告，请为你的项目安装适当的构建工具。
