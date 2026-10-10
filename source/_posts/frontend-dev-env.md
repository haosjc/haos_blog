---
title: 从零搭建现代前端开发环境
date: 2026-10-08 09:30:00
updated: 2026-10-08 09:30:00
tags:
  - 前端
  - 工程化
  - 工具链
categories:
  - 前端开发知识
description: 从 Node 版本管理到构建工具，一步步搭起一个清爽、可维护的前端开发环境。
top_img: /img/page-hero.svg
---

一个顺手的前端开发环境，能让「写代码」这件事事半功倍。这篇文章梳理一套现代、清爽、可复用的搭建流程。

## 1. Node 版本管理

项目之间 Node 版本经常不一致，推荐用版本管理器统一管理：

```bash
# fnm（快，跨平台）
fnm install 20
fnm use 20

# 或 nvm
nvm install 20
nvm use 20
```

> 建议在项目根目录放一个 `.nvmrc` 或 `.node-version`，锁定团队统一的 Node 版本。

## 2. 包管理器

如今 `npm`、`pnpm`、`yarn` 各有拥趸。个人推荐 **pnpm**：磁盘占用小、安装快，且依赖结构更严格。

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm init
```

## 3. 构建工具

从「打包器」到「开发服务器」，主流选择已经收敛：

| 工具 | 定位 | 特点 |
| --- | --- | --- |
| Vite | 开发服务器 + 构建 | 冷启动快、HMR 极速 |
| esbuild | 极速打包 | Go 编写，转译飞快 |
| Rolldown | 新一代打包 | 兼容 Rollup 生态 |

一个最小 Vite 工程：

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: { port: 5173, open: true },
  build: { sourcemap: true },
})
```

## 4. 代码质量

`ESLint` + `Prettier` 是标配，再加一个 `lint-staged` 在提交前自动检查：

```json
{
  "lint-staged": {
    "*.{js,ts,vue}": ["eslint --fix", "prettier --write"]
  }
}
```

## 小结

环境搭建的核心原则是：**版本锁定、职责单一、自动执行**。把重复的事情交给工具，把精力留给真正的问题。
