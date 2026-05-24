import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "CCBug Docs",
  description: "可直接部署的 VitePress 文档站脚手架",
  base: "/",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/install-cc-switch" },
      { text: "API", link: "/api/overview" }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "安装 CC Switch", link: "/guide/install-cc-switch" },
            { text: "创建 API Key", link: "/guide/create-api-key" },
            { text: "Codex 配置", link: "/guide/codex-config" },
            { text: "Claude Code 配置", link: "/guide/claude-code-config" },
            { text: "部署说明", link: "/guide/deployment" }
          ]
        }
      ],
      "/api/": [
        {
          text: "API",
          items: [{ text: "概览", link: "/api/overview" }]
        }
      ]
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/your-org/your-repo" }
    ],
    search: {
      provider: "local"
    },
    footer: {
      message: "Built with VitePress",
      copyright: "Copyright © 2026"
    }
  }
});
