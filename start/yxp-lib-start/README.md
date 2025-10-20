# {{projectName}}

[English](./README.md) | [中文](./README.zh-CN.md)

## Overview
- yuxu-palace utility library template powered by `@yuxu-palace/yxp-starter` tooling.
- Bundled with RSLib build pipeline, Biome formatting, and Vitest testing utilities.

## Prerequisites
- `pnpm` 8 or later.
- Node.js 18 or newer (align with the `package.json` `devEngines` field).

## Quick Start
1. Install dependencies: `pnpm install`.
2. Run unit tests once to ensure the baseline passes: `pnpm test`.
3. Start watch build when iterating on the library: `pnpm dev`.

## Available Scripts
```bash
# One-off production build
pnpm build

# Run Vitest in watch mode
pnpm test

# Lint & format with Biome (auto-fix enabled)
pnpm check

# Module federation development flow (if applicable)
pnpm dev:mf
```

## Project Structure
- `src/index.ts` — entry point exporting `VERSION` sourced from `package.json`.
- `tests/` — Vitest-based suite with helper utilities in `utils.ts`.
- `rslib.config.ts` — Build configuration for generating ESM and CJS bundles.
- `.husky/` — Git hooks prepared for commit linting and formatting enforcement.

## Release Checklist
- Update version via `pnpm version` or manual `package.json` edit.
- Run `pnpm build` and check produced artifacts under `dist/`.
- Confirm tests (`pnpm test`) and lint checks (`pnpm check`) pass before publishing.

## License
MIT
