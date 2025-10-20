## YXP Template Repository

[English](./README.md) | [中文](./README.zh-CN.md)

### Overview
- Internal template collection for the yxp organization.
- Provides yuxu-palace utility library templates that align with the team's TypeScript tooling and package management conventions.

### Prerequisites
- `pnpm` 8 or later.
- Node.js 18+ (match the runtime used by the templates when possible).

### Quick Start
1. Choose a template from the list below.
2. Copy the template directory out of `starter/` to a new workspace.
3. Replace placeholder names (e.g., `{{projectName}}`) with your project identifier.
4. Install dependencies with `pnpm install` and follow the template-specific README.

### Repository Structure
- `starter/` — top-level directory that aggregates all maintained templates.
  - `yxp-lib-start/` — TypeScript library starter configured with `@yuxu-palace/yxp-starter`, Biome, Vitest, and release tooling.

### Maintenance Notes
- Keep template dependencies in sync with the organization’s baseline Node.js and pnpm versions.
- Update each template README whenever workflow commands or tooling assumptions change.
- Validate templates by running `pnpm install`, `pnpm test`, and `pnpm build` before distributing updates internally.
