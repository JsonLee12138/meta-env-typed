# 快速开始

本指南将帮助你在 5 分钟内开始使用 Meta Env Typed。

## 前提条件

- Node.js 16+
- 支持的构建工具：Vite 或 Rsbuild
- TypeScript 项目

## 第一步：安装

```bash
npm install meta-env-typed
# 或
yarn add meta-env-typed
# 或
pnpm add meta-env-typed
```

## 第二步：配置构建工具

### Vite 配置

在你的 `vite.config.ts` 中添加插件：

```typescript
import { metaEnvTyped } from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    metaEnvTyped({
      // 配置选项
      envDir: './',
      prefix: 'VITE_',
    })
  ]
});
```

### Rsbuild 配置

在你的 `rsbuild.config.ts` 中添加插件：

```typescript
import { defineConfig } from '@rsbuild/core';
import { metaEnvTyped } from 'meta-env-typed/rsbuild';

export default defineConfig({
  plugins: [
    metaEnvTyped({
      // 配置选项
      envDir: './',
      prefix: 'PUBLIC_',
    })
  ]
});
```

## 第三步：创建环境变量文件

创建 `.env` 文件：

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=我的应用
VITE_DEBUG=true
VITE_PORT=3000
```

## 第四步：使用类型安全的环境变量

插件会自动生成类型定义，你可以这样使用：

```typescript
// 在你的 TypeScript 代码中
console.log(import.meta.env.VITE_API_URL); // 类型安全！
console.log(import.meta.env.VITE_APP_NAME); // 自动补全！
console.log(import.meta.env.VITE_DEBUG); // 类型推导！
console.log(import.meta.env.VITE_PORT); // 智能提示！
```

## 第五步：享受类型安全

现在你的环境变量拥有了：

- ✅ **类型安全**：TypeScript 会检查变量类型
- ✅ **自动补全**：IDE 提供智能提示
- ✅ **编译时检查**：在构建时发现错误
- ✅ **重构支持**：安全地重命名变量

## 下一步

- 了解更多[配置选项](../configuration/options.md)
- 查看[构建工具集成](../build-tools/vite.md)
- 探索[高级用法](../advanced/custom-templates.md)

## 常见问题

### 为什么我的环境变量没有类型？

确保：

1. 环境变量以正确的前缀开头（如 `VITE_`）
2. 插件已正确配置
3. 重启开发服务器

### 如何添加新的环境变量？

1. 在 `.env` 文件中添加变量
2. 重启开发服务器
3. 类型定义会自动更新

### 支持哪些环境变量类型？

插件会自动推导以下类型：

- `string`：默认类型
- `number`：纯数字值
- `boolean`：`true`/`false` 值
- `undefined`：未定义的变量
