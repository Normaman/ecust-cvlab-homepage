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

### 通过 CMS 后台维护

项目已接入 Decap CMS，后台地址为：

```text
/admin/
```

GitHub Pages 部署后的完整地址为：

```text
https://<你的 GitHub 用户名>.github.io/<你的仓库名>/admin/
```

后台支持通过表单界面维护这些内容：

- 首页信息与招生信息
- 最新动态
- 指导教师
- 研究方向
- 代表性成果
- 科研项目
- 团队成员
- 团队氛围相册

上传的图片会写入 `public/images/` 下对应目录，保存后会自动更新 `data/*.yml`。

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

本地调试 CMS：

```bash
npx decap-server
```

然后访问：

```text
http://localhost:3000/admin/
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

## 启用 Decap CMS 登录

### 已完成的部分

项目中已经包含：

- `public/admin/index.html`
- `public/admin/config.yml`
- `/admin/` 正式后台入口

### 还需要你配置的部分

由于站点部署在 `GitHub Pages`，Decap CMS 使用 GitHub 账号登录时，还需要一个单独的 OAuth 授权端点。也就是说：

- `GitHub Pages` 负责托管前台网站和 `/admin/` 页面
- OAuth 代理负责完成 GitHub 登录握手
- 登录成功后，Decap CMS 才能代表你修改仓库中的 `YAML` 和图片文件

推荐做法：

1. 单独部署一个 Decap OAuth 代理服务
2. 在 GitHub `Developer settings -> OAuth Apps` 中创建一个 OAuth App
3. 将 OAuth App 的回调地址指向你的代理服务
4. 把 `public/admin/config.yml` 里的 `backend.base_url` 改成你的 OAuth 服务地址

也可以直接执行：

```bash
node scripts/set-decap-oauth-url.mjs https://your-worker.workers.dev
```

建议优先使用这些托管方式之一部署 OAuth 代理：

- `Cloudflare Workers / Pages Functions`
- `Vercel Serverless Functions`
- `Netlify Functions`

### 当前后台配置位置

- 后台入口：`public/admin/index.html`
- CMS 配置：`public/admin/config.yml`
- Cloudflare Worker 代理：`cloudflare/decap-oauth-proxy/`

## 说明

- `next.config.mjs` 已处理 GitHub Pages 仓库子路径部署所需的 `basePath` 和 `assetPrefix`。
- `public/.nojekyll` 会随静态导出一起发布，避免 Pages 对文件进行 Jekyll 处理。
- 如果后续改用 `Vercel`，当前项目结构仍然通用，只需调整部署方式即可。
