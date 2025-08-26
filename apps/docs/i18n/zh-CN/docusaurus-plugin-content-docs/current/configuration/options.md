# 配置选项

Meta Env Typed 提供了丰富的配置选项来满足不同项目的需求。

## 基础选项

### envDir

- **类型**: `string`
- **默认值**: `'./`
- **描述**: 环境变量文件所在的目录

```typescript
metaEnvTyped({
  envDir: './config'
});
```

### prefix

- **类型**: `string`
- **默认值**: `'VITE_'` (Vite) / `'PUBLIC_'` (Rsbuild)
- **描述**: 环境变量的前缀

```typescript
metaEnvTyped({
  prefix: 'MY_APP_'
});
```

### outputDir

- **类型**: `string`
- **默认值**: `'./types'`
- **描述**: 类型文件的输出目录

```typescript
metaEnvTyped({
  outputDir: './src/types'
});
```

### fileName

- **类型**: `string`
- **默认值**: `'env.d.ts'`
- **描述**: 生成的类型文件名

```typescript
metaEnvTyped({
  fileName: 'environment.d.ts'
});
```

## 完整配置示例

```typescript
import { metaEnvTyped } from 'meta-env-typed/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    metaEnvTyped({
      // 基础配置
      envDir: './',
      prefix: 'VITE_',
      outputDir: './src/types',
      fileName: 'env.d.ts'
    })
  ]
});
```
