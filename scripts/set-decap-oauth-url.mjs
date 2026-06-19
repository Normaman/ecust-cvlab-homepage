import fs from "node:fs";
import path from "node:path";

const inputUrl = process.argv[2];

if (!inputUrl) {
  console.error("用法: node scripts/set-decap-oauth-url.mjs https://your-worker.workers.dev");
  process.exit(1);
}

let parsedUrl;

try {
  parsedUrl = new URL(inputUrl);
} catch {
  console.error("提供的地址不是合法 URL。");
  process.exit(1);
}

const configPath = path.join(process.cwd(), "public", "admin", "config.yml");
const content = fs.readFileSync(configPath, "utf8");
const nextContent = content.replace(
  /^(\s*base_url:\s*).+$/m,
  `$1${parsedUrl.origin}`
);

if (content === nextContent) {
  console.error("未找到可更新的 base_url 字段。");
  process.exit(1);
}

fs.writeFileSync(configPath, nextContent, "utf8");
console.log(`已更新 Decap OAuth 地址: ${parsedUrl.origin}`);
