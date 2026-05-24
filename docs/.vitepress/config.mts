import { defineConfig } from "vitepress";

const zhGuideSidebar = [
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
];

const enGuideSidebar = [
  {
    text: "Guide",
    items: [
      { text: "Install CC Switch", link: "/en/guide/install-cc-switch" },
      { text: "Create API Key", link: "/en/guide/create-api-key" },
      { text: "Codex Config", link: "/en/guide/codex-config" },
      { text: "Claude Code Config", link: "/en/guide/claude-code-config" },
      { text: "Deployment", link: "/en/guide/deployment" }
    ]
  }
];

export default defineConfig({
  lang: "zh-CN",
  title: "CCBug Docs",
  description: "让 AI 编程更简单的文档站",
  base: "/",
  lastUpdated: true,
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/",
      title: "CCBug Docs",
      description: "让 AI 编程更简单的文档站",
      themeConfig: {
        nav: [
          { text: "首页", link: "/" },
          { text: "指南", link: "/guide/install-cc-switch" },
          { text: "API", link: "/api/overview" }
        ],
        sidebar: {
          "/guide/": zhGuideSidebar,
          "/api/": [
            {
              text: "API",
              items: [{ text: "概览", link: "/api/overview" }]
            }
          ]
        },
        outlineTitle: "本页目录",
        docFooter: {
          prev: "上一页",
          next: "下一页"
        },
        darkModeSwitchLabel: "切换深色模式",
        sidebarMenuLabel: "菜单",
        returnToTopLabel: "返回顶部",
        langMenuLabel: "切换语言"
      }
    },
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      title: "CCBug Docs",
      description: "Documentation for making AI programming simpler",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "Guide", link: "/en/guide/install-cc-switch" },
          { text: "API", link: "/en/api/overview" }
        ],
        sidebar: {
          "/en/guide/": enGuideSidebar,
          "/en/api/": [
            {
              text: "API",
              items: [{ text: "Overview", link: "/en/api/overview" }]
            }
          ]
        },
        outlineTitle: "On this page",
        docFooter: {
          prev: "Previous page",
          next: "Next page"
        },
        darkModeSwitchLabel: "Toggle dark mode",
        sidebarMenuLabel: "Menu",
        returnToTopLabel: "Return to top",
        langMenuLabel: "Change language"
      }
    }
  },
  themeConfig: {
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
