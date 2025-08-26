# Vite 集成

Meta Env Typed 为 Vite 提供了完整的支持，让你能够在 Vite 项目中享受类型安全的环境变量。

## 安装

```bash
npm install meta-env-typed
```

## 基础配置

在你的 `vite.config.ts` 中添加插件：

```typescript
import { metaEnvTyped } from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    metaEnvTyped()
  ]
});
```

## 配置选项

### envDir

指定环境变量文件的目录。

```typescript
metaEnvTyped({
  envDir: './', // 默认值
});
```

### prefix

指定环境变量的前缀。

```typescript
metaEnvTyped({
  prefix: 'VITE_', // 默认值
});
```

## 使用示例

```typescript
// src/config.ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  appName: import.meta.env.VITE_APP_NAME,
  debug: import.meta.env.VITE_DEBUG,
};
```

## 环境变量文件

支持多种环境变量文件：

- `.env` - 所有环境加载
- `.env.development` - 开发环境
- `.env.production` - 生产环境

### 示例

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=我的应用
VITE_DEBUG=true
```
