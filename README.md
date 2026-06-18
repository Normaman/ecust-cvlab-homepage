# ECUST CVAI Lab Homepage

这是一个基于 `Next.js + TailwindCSS + YAML` 的学术团队主页项目，适合后续持续维护图片、论文和团队信息，并可直接部署到 `GitHub Pages`。

## 核心特性

- 使用 `Next.js App Router` 构建页面结构
- 使用 `TailwindCSS` 实现 Wiki 风格学术主页
- 使用 `data/*.yml` 管理团队、研究方向、时间线、论文数据
- 使用 `public/images/` 管理图片资源，后续替换图片不需要改页面代码
- 使用 GitHub Actions 自动构建并发布到 GitHub Pages

## 项目结构

```text
.
|-- .github/workflows/deploy.yml
|-- app/
|-- data/
|-- lib/
|-- public/
|-- next.config.mjs
|-- package.json
`-- README.md
```

## 内容维护方式

### 修改论文

编辑 `data/publications.yml`，每篇论文为一个条目，例如：

```yml
- title: Example Paper Title
  venue: CVPR
  year: 2026
  note: Oral
  links:
    - label: Paper
      url: https://example.com/paper
    - label: Code
      url: https://github.com/example/repo
```

### 修改时间线

编辑 `data/timeline.yml`，并把图片放到 `public/images/timeline/`。

### 修改团队成员

编辑 `data/team.yml`。

### 修改整体简介

编辑 `data/site.yml`。

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

默认访问地址：

```text
http://localhost:3000
```

## GitHub Pages 部署

1. 将项目推送到 GitHub 仓库的 `main` 或 `master` 分支。
2. 进入仓库 `Settings -> Pages`。
3. 将 `Source` 设置为 `GitHub Actions`。
4. 推送代码后，仓库会自动执行 `.github/workflows/deploy.yml`。
5. 构建产物会导出到 `out/`，并自动发布到 GitHub Pages。

部署成功后，访问地址通常为：

```text
https://<你的 GitHub 用户名>.github.io/<你的仓库名>/
```

## 说明

- `next.config.mjs` 已处理 GitHub Pages 仓库子路径部署所需的 `basePath` 和 `assetPrefix`。
- `public/.nojekyll` 会随静态导出一起发布，避免 Pages 对文件进行 Jekyll 处理。
- 如果后续改用 `Vercel`，当前项目结构仍然通用，只需调整部署方式即可。
