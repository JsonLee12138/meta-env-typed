---
sidebar_position: 1
---

# 简介

**Meta Env Typed** 是一个支持多种构建工具的插件，可以自动生成 `import_meta.d.ts` 文件，为你的环境变量提供完整的 TypeScript 类型支持。

## 为什么选择 Meta Env Typed？

在 TypeScript 项目中使用环境变量时，通常缺乏适当的类型安全性。你可能会发现自己编写这样的代码：

```typescript
// ❌ 没有类型安全，容易出现拼写错误
const apiUrl = import.meta.env.VITE_API_URL; // string | undefined
const port = import.meta.env.VITE_PORT; // string | undefined
```

使用 **Meta Env Typed**，你可以获得：

```typescript
// ✅ 完整的类型安全和智能提示
const apiUrl = import.meta.env.VITE_API_URL; // 'https://api.example.com'
const port = import.meta.env.VITE_PORT; // '3000'
```

## 主要特性

- 🚀 **自动生成**：自动生成环境变量类型定义
- 💡 **完整的 TypeScript 支持**：完整的智能提示和类型检查
- ⚡️ **零配置**：开箱即用，具有合理的默认设置
- 🔒 **类型安全**：防止拼写错误和运行时错误
- 🔄 **自动更新**：环境文件更改时重新生成类型
- 🛠️ **多工具支持**：支持 Vite、Rsbuild 和 Rspack（即将推出）

## 支持的构建工具

| 构建工具    | 状态        | 版本     |
| ----------- | ----------- | -------- |
| **Vite**    | ✅ 已支持   | v6.0.0+  |
| **Rsbuild** | ✅ 已支持   | v1.3.22+ |
| **Rspack**  | 🚧 即将推出 | -        |

## 快速示例

安装和配置插件后，它会自动生成类型定义文件：

```typescript
// src/import_meta.d.ts (自动生成)
interface ImportMetaEnv {
  readonly VITE_API_URL: 'https://api.example.com';
  readonly VITE_APP_TITLE: 'My Awesome App';
  readonly VITE_PORT: '3000';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

现在你可以使用完全类型安全的环境变量：

```typescript
// ✅ TypeScript 知道确切的类型和值
console.log(import.meta.env.VITE_API_URL); // 类型: 'https://api.example.com'
console.log(import.meta.env.VITE_APP_TITLE); // 类型: 'My Awesome App'

// ✅ TypeScript 会在编译时捕获拼写错误
console.log(import.meta.env.VITE_API_URl); // ❌ 错误: 属性 'VITE_API_URl' 不存在
```

## 下一步

准备开始了吗？查看我们的[安装指南](./getting-started/installation)将 Meta Env Typed 添加到你的项目中。

或者直接跳转到你的构建工具配置：

- [Vite 配置](./build-tools/vite)
- [Rsbuild 配置](./build-tools/rsbuild)
