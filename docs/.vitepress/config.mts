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
      { text: "指南", link: "/guide/getting-started" },
      { text: "API", link: "/api/overview" }
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [
            { text: "快速开始", link: "/guide/getting-started" },
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
