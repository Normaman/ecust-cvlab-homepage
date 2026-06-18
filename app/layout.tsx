import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "华东理工大学 计算机视觉与人工智能课题组",
  description: "基于 Next.js、TailwindCSS 和 YAML 内容库构建的学术团队主页。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
