# Codex 配置

本文介绍如何在 CC Switch 中添加并启用 Codex CLI 的 `ccbug` 配置。

::: warning 注意
Codex 分组的 Key 只能用于请求 OpenAI / GPT 相关模型。Claude Code 分组的 Key 只能用于请求 Claude 相关模型，不要混用。
:::

## 新增 Codex 配置

打开 CC Switch，切换到 `Codex`，点击右上角加号新增一个 Codex 配置。

![新增 Codex 配置](./images/cc-switch/05-add-codex-provider.png)

## 填写配置参数

按下列信息填写：

| 配置项 | 填写内容 |
| --- | --- |
| 供应商名称 | `ccbug` |
| 官网链接 | `https://ai.ccbug.cc/` |
| API Key | 创建的 Codex 分组 API Key，例如 `sk-xxxx` |
| API 请求地址 | `https://ai.ccbug.cc/v1` |
| 模型名称 | 点击「获取模型列表」后选择需要使用的 GPT / OpenAI 模型 |

![填写 Codex 配置](./images/cc-switch/06-codex-provider-form.png)

## 启用 Codex 配置

切换配置前请先关闭 Codex CLI。配置保存后，在 CC Switch 的 Codex 列表里找到 `ccbug`，点击「启用」即可。

![启用 Codex 配置](./images/cc-switch/07-enable-codex-provider.png)
