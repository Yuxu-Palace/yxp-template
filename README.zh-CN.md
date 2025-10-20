## YXP 模版仓库

[English](./README.md) | [中文](./README.zh-CN.md)

### 项目简介
- 面向 yxp 组织内部的模板集合。
- 提供符合团队 TypeScript 工具链与包管理规范的 yuxu-palace 工具库模板。

### 使用前置条件
- `pnpm` 8 及以上版本。
- Node.js 18+（建议与模板默认运行时保持一致）。

### 快速开始
1. 从下方模板列表中选定需要的模板。
2. 将对应目录从 `starter/` 拷贝到新的工作空间。
3. 将所有占位符（如 `{{projectName}}`）替换为项目真实名称。
4. 执行 `pnpm install` 安装依赖，并遵循模板内的 README 进行后续操作。

### 仓库结构
- `starter/` — 统一存放所有维护中的模板。
  - `yxp-lib-start/` — TypeScript 库模板，预置 `@yuxu-palace/yxp-starter`、Biome、Vitest 以及发布工具链。

### 维护说明
- 保持模板依赖与组织基线的 Node.js、pnpm 版本同步。
- 当工作流命令或工具假设发生变化时，及时更新各模板 README。
- 在内部发布更新前，请至少完成 `pnpm install`、`pnpm test`、`pnpm build` 三项验证。
