# {{projectName}}

[English](./README.md) | [中文](./README.zh-CN.md)

## 项目简介
- yuxu-palace 工具库模板，配套 `@yuxu-palace/yxp-starter` 开发脚手架。
- 内置 Rslib 库开发工具、Biome 代码规范工具以及 Vitest 测试框架。

## 使用前置条件
- `pnpm` 8 及以上版本。
- Node.js 18 或更新版本（建议与 `package.json` 中 `devEngines` 一致）。

## 快速开始
1. 执行 `pnpm install` 安装依赖。
2. 运行 `pnpm test` 确认基线测试通过。
3. 在迭代开发时启动 `pnpm dev` 进行构建监听。

## 常用脚本
```bash
# 产物构建
pnpm build

# Vitest 测试（监听模式）
pnpm test

# Biome 检查与自动修复
pnpm check

# Module Federation 开发流程（如需）
pnpm dev:mf
```

## 目录结构
- `src/index.ts` — 入口文件，导出来自 `package.json` 的 `VERSION`。
- `tests/` — Vitest 测试套件，包含 `utils.ts` 提供的辅助函数。
- `rslib.config.ts` — 配置 RSLib 构建 ESM 与 CJS 包。
- `.husky/` — Git 钩子设置，配合提交规范与格式化流程。

## 发布检查清单
- 使用 `pnpm version` 或手动修改 `package.json` 更新版本号。
- 执行 `pnpm build` 并检查 `dist/` 中生成的产物。
- 确认 `pnpm test`、`pnpm check` 均通过后再发布。

## License
MIT
