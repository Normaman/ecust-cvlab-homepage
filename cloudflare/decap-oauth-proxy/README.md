# Decap OAuth Proxy

这个子项目用于给 `GitHub Pages + Decap CMS` 提供 GitHub OAuth 登录代理。

## 作用

前台网站继续部署在：

```text
https://normaman.github.io/ecust-cvlab-homepage/
```

Decap CMS 后台继续部署在：

```text
https://normaman.github.io/ecust-cvlab-homepage/admin/
```

而 GitHub 登录代理单独部署到 Cloudflare Worker，例如：

```text
https://ecust-cvlab-decap-oauth.<your-subdomain>.workers.dev
```

然后把这个 Worker 地址填到：

`public/admin/config.yml`

中的 `backend.base_url`。

## 需要准备

1. 一个 Cloudflare 账号
2. 一个 GitHub OAuth App
3. 该 OAuth App 的：
   - Client ID
   - Client Secret

## GitHub OAuth App 配置

在 GitHub `Settings -> Developer settings -> OAuth Apps` 新建应用：

- Application name：`ECUST CV Lab Decap CMS`
- Homepage URL：你的 Worker 地址，例如 `https://ecust-cvlab-decap-oauth.<your-subdomain>.workers.dev`
- Authorization callback URL：你的 Worker 回调地址，例如 `https://ecust-cvlab-decap-oauth.<your-subdomain>.workers.dev/callback`

## 本地调试

进入当前目录：

```bash
cd cloudflare/decap-oauth-proxy
```

安装依赖：

```bash
npm install
```

创建本地密钥文件：

```text
.dev.vars
```

内容参考：

```text
GITHUB_OAUTH_ID=your-github-oauth-client-id
GITHUB_OAUTH_SECRET=your-github-oauth-client-secret
```

启动本地 Worker：

```bash
npm run dev
```

## 部署到 Cloudflare

首次使用先登录：

```bash
npx wrangler login
```

写入线上密钥：

```bash
npx wrangler secret put GITHUB_OAUTH_ID
npx wrangler secret put GITHUB_OAUTH_SECRET
```

部署：

```bash
npm run deploy
```

## 部署后要做的两步

1. 打开部署出来的 Worker 地址，确认返回一段 JSON 状态
2. 把 `public/admin/config.yml` 中的：

```yml
base_url: https://replace-with-your-decap-oauth.example.com
```

改成你的 Worker 地址，例如：

```yml
base_url: https://ecust-cvlab-decap-oauth.<your-subdomain>.workers.dev
```

也可以直接在项目根目录执行：

```bash
node scripts/set-decap-oauth-url.mjs https://ecust-cvlab-decap-oauth.<your-subdomain>.workers.dev
```

然后重新部署前台站点。

## 说明

- `wrangler.toml` 里的 `ALLOWED_ORIGINS` 默认限制为 `https://normaman.github.io`
- 如果以后改成自定义域名，需要同步更新这个值
- 如果仓库改成私有仓库，把 `GITHUB_REPO_PRIVATE` 改为 `"1"`
