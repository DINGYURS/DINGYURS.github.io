# CLAUDE.md

## 项目概述

这是一个基于 Astro 构建、部署到 GitHub Pages 的个人静态网站。

网站主要用途包括：

- 记录计算机学习过程中的问题和解决方案
- 整理技术 Bug、环境配置、开发经验
- 编写技术感悟、项目复盘和学习笔记
- 展示个人摄影作品
- 展示个人项目、科研和学习成果

本项目应保持简洁、可维护、内容优先，适合作为长期维护的个人博客和作品展示网站。

## 技术栈

当前项目使用的主要技术栈：

- Astro（主框架）
- TypeScript
- Markdown / MDX（`@astrojs/mdx`）
- CSS
- sharp（图片处理）
- `@astrojs/rss`（RSS 订阅）
- `@astrojs/sitemap`（站点地图生成）
- GitHub Pages
- GitHub Actions

部署地址：

```text
https://dingyurs.github.io/
```

这是 GitHub Pages 的用户主页仓库，因此不要配置类似下面这样的 `base` 路径：

```js
base: '/DINGYURS.github.io/'
```

`astro.config.mjs` 中应使用：

```js
site: 'https://dingyurs.github.io'
```

## 字体配置

项目使用本地 Atkinson 字体，文件位于 `src/assets/fonts/`。

在 `astro.config.mjs` 中通过 `fontProviders.local()` 配置，CSS 变量为 `--font-atkinson`。

修改字体相关样式时需注意保持此配置的一致性。

## 运行环境要求

当前 Astro 版本要求 Node.js 版本不低于：

```text
>=22.12.0
```

GitHub Actions 部署时应使用 Node.js 24。

不要在 GitHub Actions 中使用 Node.js 20 构建本项目，否则可能导致 Astro 构建失败。

## 常用命令

安装依赖：

```bash
npm install
```

启动本地开发服务器：

```bash
npm run dev
```

构建生产环境静态文件：

```bash
npm run build
```

本地预览构建结果：

```bash
npm run preview
```

在提交重要修改前，应优先执行：

```bash
npm run build
```

确保构建成功后再提交并推送到 GitHub。

## 项目目录结构

推荐保持如下结构：

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yaml
├── public/
├── src/
│   ├── assets/
│   │   └── fonts/          本地字体文件
│   ├── components/
│   ├── content/
│   │   └── blog/           博客文章
│   ├── layouts/
│   ├── pages/
│   ├── styles/             全局样式
│   ├── consts.ts           站点常量配置
│   └── content.config.ts   Astro 内容集合配置
├── astro.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
└── CLAUDE.md
```

主要目录说明：

```text
src/content/blog/     技术博客文章
src/pages/            页面文件
src/components/       可复用组件
src/layouts/          页面布局
src/styles/           全局 CSS 样式
src/assets/           由 Astro 处理的图片、字体等资源
src/consts.ts         站点标题、描述等常量
public/               直接公开访问的静态资源
```

## 不应提交的文件和目录

不要提交以下文件或目录：

```text
node_modules/          依赖目录
.astro/                Astro 生成的类型和缓存
dist/                  构建产物
.env                   环境变量
.DS_Store              macOS 系统文件
.idea/                 JetBrains IDE 配置
```

这些内容应由本地环境或 GitHub Actions 自动生成，完整列表见 `.gitignore`。

## GitHub Pages 部署规则

项目通过 GitHub Actions 自动部署到 GitHub Pages。

部署 workflow 使用官方 `withastro/action@v3`，自动完成安装依赖和构建。

workflow 关键配置：

```yaml
env:
  FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true

# build job 使用 withastro/action@v3，指定 node-version: 24
# deploy job 使用 actions/deploy-pages@v4
```

GitHub Pages 的 Source 应设置为：

```text
GitHub Actions
```

不要随意切换回分支部署方式，除非有明确原因。

## 内容写作规范

博客文章主要使用中文撰写。

写作风格应保持：

- 清晰
- 客观
- 结构化
- 可复现
- 偏技术记录
- 便于未来回顾

技术文章不要只写笼统总结，应尽量记录完整的问题处理过程。

推荐文章结构：

```md
---
title: "文章标题"
description: "文章简要描述"
pubDate: "YYYY-MM-DD"
tags: ["标签1", "标签2"]
---

## 问题背景

## 问题现象

## 环境信息

## 原因分析

## 解决过程

## 总结
```

## 适合记录的内容范围

适合写入本博客的内容包括：

- Git 和 GitHub 使用记录
- Astro 博客搭建与部署
- 前端开发学习笔记
- Vue / TypeScript 相关问题
- Linux 远程开发和服务器配置
- 深度学习环境配置
- 数据库和后端开发问题
- 毕业设计、课程项目、科研项目记录
- Bug 排查过程
- 技术学习心得
- 摄影作品和拍摄记录

不建议把博客变成纯生活流水账。个人感悟可以写，但最好与学习、技术、项目、科研、摄影或成长过程有关。

## 摄影作品模块规范

网站后续需要支持摄影作品展示。

摄影内容可以包括：

- 校园摄影
- 毕业季写真
- 人像约拍
- 旅行摄影
- 街头摄影
- 日常记录
- 建筑与风景

不要直接上传大量原始大图到仓库。

推荐图片规范：

```text
展示图宽度：约 1600px
缩略图宽度：400px ~ 800px
推荐格式：WebP / JPG
单张大小：建议控制在 300KB ~ 1MB
```

应尽量压缩图片，避免 Git 仓库体积过大。

## 代码风格规范

整体原则：

- 代码应简单清晰
- 不做过度封装
- 不引入不必要的复杂依赖
- 组件职责应单一
- 页面结构应清楚
- 优先使用语义化 HTML
- 不要把网站改造成复杂的单页应用

Astro 使用规范：

- 静态页面和布局优先使用 `.astro`
- 博客文章优先使用 Markdown / MDX
- 只有在确实需要交互时才引入客户端 JavaScript
- 不要把整个网站改成 Vue 或 React 应用

后续如果需要交互组件，可以局部引入 Vue，例如：

- 图片灯箱
- 摄影分类筛选
- 文章搜索
- 标签筛选
- 暗色模式切换
- 返回顶部按钮

Vue 只能作为 Astro 的局部交互组件使用，Astro 仍然是主框架。

## 设计风格方向

网站应保持简洁、清爽、内容优先的个人技术博客风格。

推荐风格：

- 简洁
- 易读
- 轻量
- 内容优先
- 适合长篇技术文章
- 适合展示摄影作品

避免：

- 过多动画
- 复杂视觉特效
- 大量 JavaScript
- 过度花哨的颜色
- 影响阅读的装饰元素

## 首页内容要求

首页应清楚表达网站定位。

推荐包含：

- 简短个人介绍
- 最新技术文章
- 摄影作品入口
- 项目展示入口
- 关于我入口

建议首页定位文案：

```text
记录计算机学习中的问题、思考与实践，也收藏我用镜头看见的日常。
```

## 提交信息规范

提交信息应清晰表达本次修改内容。

推荐示例：

```bash
git commit -m "更新网站基础信息"
git commit -m "添加第一篇 Astro 部署记录"
git commit -m "新增摄影作品页面"
git commit -m "修复 GitHub Pages 部署配置"
git commit -m "优化首页布局"
```

避免使用无意义提交信息，例如：

```text
update
test
fix
111
修改
```

## 从 Hexo 迁移的说明

本项目由之前的 Hexo 个人博客迁移而来。

旧 Hexo 静态站点应保存在备份分支中，例如：

```text
backup-hexo-static
```

不要随意删除该备份分支。

如果以后找到了旧 Hexo 项目的 Markdown 源文件，可以将：

```text
source/_posts/
```

中的文章迁移到：

```text
src/content/blog/
```

## 重要约束

不要随意执行以下操作：

- 删除 `.github/workflows/deploy.yaml`
- 提交 `node_modules`
- 提交 `.astro`
- 提交 `dist`
- 给 GitHub Pages 用户主页仓库添加错误的 `base` 路径
- 将 GitHub Pages 部署方式改回分支部署
- 在当前静态站点中直接添加依赖数据库的功能
- 在 GitHub Pages 上设计需要后端常驻服务的功能
- 全局引入 Vue 或 React 并重写整个网站

## 修改项目时的优先级

修改本项目时，应优先考虑：

1. 正确性
2. 可维护性
3. 最小改动
4. 构建成功
5. 部署稳定
6. 内容可长期维护

如果有多种实现方式，应优先选择简单、稳定、符合个人博客定位的方案。