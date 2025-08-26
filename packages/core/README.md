# Meta Env Typed

**[English Documentation](https://github.com/JsonLee12138/meta-env-typed/blob/main/README.en.md)**

## 简介

`meta-env-typed` 是一个支持多种构建工具的插件，可以自动生成 `import_meta.d.ts` 文件，为你的环境变量提供完整的 TypeScript 类型支持。目前支持 Vite 和 Rsbuild，后续将支持 Rspack。

## 特性

- 🚀 自动生成环境变量类型定义
- 💡 完整的 TypeScript 支持
- ⚡️ 零配置，开箱即用
- 🔒 类型安全的环境变量访问
- 🔄 环境文件变化时自动更新类型定义
- 🛠️ 支持多种构建工具（Vite、Rsbuild，即将支持 Rspack）

## 安装

```bash
# 使用 npm
npm install meta-env-typed -D

# 使用 yarn
yarn add meta-env-typed -D

# 使用 pnpm
pnpm add meta-env-typed -D
```

## 使用方法

### Vite

在你的 `vite.config.ts` 中配置插件：

```typescript
import { defineConfig } from 'vite'
import envTyped from 'meta-env-typed/vite'

export default defineConfig({
  plugins: [
    envTyped({
      // 可选：指定环境变量前缀，默认为 'VITE_'
      envPrefix: ['VITE_', 'CUSTOM_'],
      // 可选：指定类型定义文件输出路径，默认为 'src/import_meta.d.ts'
      filePath: './src/types/import_meta.d.ts',
      // 可选：是否在类型中包含实际值，默认为 false
      valueInType: true,
      // 可选：是否在类型定义中使用分号，默认为 true
      semi: false
    })
  ]
})
```

### Rsbuild

在你的 `rsbuild.config.ts` 中配置插件：

```typescript
import { defineConfig } from '@rsbuild/core'
import envTyped from 'meta-env-typed/rsbuild'

export default defineConfig({
  plugins: [
    envTyped({
      // 可选：指定环境变量前缀，默认为 ''（空字符串，匹配所有变量）
      envPrefix: ['CUSTOM_', 'APP_'],
      // 可选：指定类型定义文件输出路径，默认为 'src/import_meta.d.ts'
      filePath: './src/types/import_meta.d.ts',
      // 可选：是否在类型中包含实际值，默认为 false
      valueInType: true
    })
  ]
})
```

### 在代码中使用

```typescript
// 现在你可以获得完整的类型提示
console.log(import.meta.env.VITE_API_URL)
console.log(import.meta.env.CUSTOM_SECRET_KEY)
```

## 配置选项

插件支持以下配置选项：

```typescript
interface EnvTypedOptions {
  /**
   * 环境文件目录
   * @default process.cwd()
   */
  envDir?: string

  /**
   * 环境变量前缀
   * Vite: @default 'VITE_'
   * Rsbuild: @default ''
   */
  envPrefix?: string | string[]

  /**
   * 类型定义文件输出路径
   * @default 'src/import_meta.d.ts'
   */
  filePath?: string

  /**
   * 是否在类型中包含实际值
   * @default false
   * @example
   * // 当 valueInType 为 false 时
   * VITE_API_URL: string
   * // 当 valueInType 为 true 时
   * VITE_API_URL: 'https://api.example.com'
   */
  valueInType?: boolean

  /**
   * 是否在类型定义中使用分号
   * @default true
   */
  semi?: boolean
}
```

## 示例

### 基础配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import envTyped from 'meta-env-typed/vite'

export default defineConfig({
  plugins: [envTyped()]
})
```

### 自定义环境变量前缀

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    envTyped({
      envPrefix: ['VITE_', 'CUSTOM_']
    })
  ]
})
```

### 包含实际值

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    envTyped({
      valueInType: true
    })
  ]
})
```

### Rsbuild 示例

```typescript
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import envTyped from 'meta-env-typed/rsbuild'

export default defineConfig({
  plugins: [
    envTyped({
      envPrefix: ['APP_', 'PUBLIC_'],
      filePath: './types/env.d.ts'
    })
  ]
})
```

## 支持的构建工具

- ✅ **Vite** (v6.0.0+)
- ✅ **Rsbuild** (v1.3.22+)
- 🚧 **Rspack** (即将支持)

## 📝 贡献指南

欢迎提交 `issues` 或 `pull requests` 来帮助改进 `meta-env-typed`。

## 📄 许可证

MIT

## 联系我们

- [GitHub Issues](https://github.com/JsonLee12138/meta-env-typed/issues)
- 邮箱: jsonlee_12138@icloud.com
- Discord: https://discord.gg/666U6JTCQY
- [QQ频道](https://pd.qq.com/s/fjwy3eo20?b=9) [![图片描述](./qq.jpg)](https://pd.qq.com/s/fjwy3eo20?b=9)