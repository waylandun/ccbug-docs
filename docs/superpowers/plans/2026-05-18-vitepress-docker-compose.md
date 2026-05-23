# VitePress Docker Compose Docs Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal VitePress documentation site in this repository that can run locally, build statically, serve from Docker, start with Docker Compose, and deploy to a remote server with one command.

**Architecture:** The site is authored in VitePress under `docs/`, built into static assets, and served by an internal Nginx container created from a multi-stage Dockerfile. Docker Compose binds the service to a host-local port only, while an existing host Nginx instance proxies a dedicated subdomain to the container.

**Tech Stack:** Node.js, VitePress, Docker, Docker Compose, Nginx, POSIX shell, Make

---

## File Structure

- Create: `package.json`
- Create: `.gitignore`
- Create: `.dockerignore`
- Create: `docs/.vitepress/config.mts`
- Create: `docs/index.md`
- Create: `docs/guide/getting-started.md`
- Create: `docs/guide/deployment.md`
- Create: `docs/api/overview.md`
- Create: `Dockerfile`
- Create: `nginx/default.conf`
- Create: `docker-compose.yml`
- Create: `Makefile`
- Create: `deploy.sh`
- Create: `README.md`

Each file has one clear responsibility:

- `package.json` defines VitePress scripts and dependencies.
- ignore files keep local artifacts out of builds and deploy syncs.
- `docs/` contains the site content and VitePress navigation.
- `Dockerfile` defines build and runtime images.
- `nginx/default.conf` configures static serving inside the container.
- `docker-compose.yml` defines the runtime service and host-local port mapping.
- `Makefile` provides the short command surface.
- `deploy.sh` performs remote sync and remote Compose restart.
- `README.md` explains local development, deployment, and host Nginx integration.

### Task 1: Scaffold the package and ignore files

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `.dockerignore`

- [ ] **Step 1: Write the initial package definition**

```json
{
  "name": "ccbug-docs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "docs:dev": "vitepress dev docs --host 0.0.0.0 --port 5173",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs --host 0.0.0.0 --port 4173"
  },
  "devDependencies": {
    "vitepress": "^1.6.3"
  },
  "engines": {
    "node": ">=20"
  }
}
```

- [ ] **Step 2: Write the Git ignore rules**

```gitignore
node_modules/
docs/.vitepress/cache/
docs/.vitepress/dist/
.DS_Store
```

- [ ] **Step 3: Write the Docker ignore rules**

```dockerignore
node_modules
docs/.vitepress/cache
docs/.vitepress/dist
.git
.DS_Store
```

- [ ] **Step 4: Run install to generate the lockfile**

Run: `npm install`
Expected: install completes and creates `package-lock.json`

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .gitignore .dockerignore
git commit -m "chore: scaffold vitepress package"
```

### Task 2: Create the VitePress site configuration and starter content

**Files:**
- Create: `docs/.vitepress/config.mts`
- Create: `docs/index.md`
- Create: `docs/guide/getting-started.md`
- Create: `docs/guide/deployment.md`
- Create: `docs/api/overview.md`

- [ ] **Step 1: Write the VitePress site config**

```ts
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
          items: [
            { text: "概览", link: "/api/overview" }
          ]
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
```

- [ ] **Step 2: Write the homepage**

```md
---
layout: home

hero:
  name: CCBug Docs
  text: 一套可以直接部署的一键式文档站
  tagline: 基于 VitePress、Docker Compose 和现有 Nginx 反向代理
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 部署说明
      link: /guide/deployment

features:
  - title: 开箱即用
    details: 内置本地开发、静态构建、Docker 镜像和 Compose 启动。
  - title: 可直接上线
    details: 容器只监听宿主机本地端口，适合接入现有 Nginx。
  - title: 便于扩展
    details: 先提供最小可用骨架，后续可以继续补内容和流程。
---
```

- [ ] **Step 3: Write the getting-started guide**

```md
# 快速开始

## 安装依赖

```bash
npm install
```

## 本地开发

```bash
npm run docs:dev
```

默认访问地址：

- `http://127.0.0.1:5173`

## 生产构建

```bash
npm run docs:build
```

构建产物位于：

- `docs/.vitepress/dist`
```

- [ ] **Step 4: Write the deployment guide**

```md
# 部署说明

## 本地 Docker 运行

```bash
docker compose up -d --build
```

默认访问地址：

- `http://127.0.0.1:8080`

## 接入宿主机 Nginx

将你的二级域名反代到本机端口：

- `http://127.0.0.1:8080`

## 远程一键部署

```bash
DEPLOY_HOST=deploy@example.com DEPLOY_PATH=/srv/ccbug-docs make deploy
```
```

- [ ] **Step 5: Write the API overview**

```md
# API 概览

这里可以放你的接口约定、鉴权说明、错误码和示例请求。

## 推荐结构

- 每个模块单独建页
- 保持请求与响应示例同步更新
- 将变更记录写进对应页面
```

- [ ] **Step 6: Run the VitePress build**

Run: `npm run docs:build`
Expected: PASS and output under `docs/.vitepress/dist`

- [ ] **Step 7: Commit**

```bash
git add docs
git commit -m "feat: add vitepress site content"
```

### Task 3: Add container runtime files

**Files:**
- Create: `Dockerfile`
- Create: `nginx/default.conf`
- Test: local image build and runtime

- [ ] **Step 1: Write the Dockerfile**

```dockerfile
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY docs ./docs
RUN npm run docs:build

FROM nginx:1.27-alpine AS runtime

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html

EXPOSE 80
```

- [ ] **Step 2: Write the internal Nginx config**

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /healthz {
        access_log off;
        add_header Content-Type text/plain;
        return 200 "ok\n";
    }
}
```

- [ ] **Step 3: Build the runtime image**

Run: `docker build -t ccbug-docs:local .`
Expected: PASS and image `ccbug-docs:local` exists

- [ ] **Step 4: Run the image on a temporary port**

Run: `docker run --rm -p 18080:80 ccbug-docs:local`
Expected: container starts and serves the site on `http://127.0.0.1:18080`

- [ ] **Step 5: Verify the health endpoint**

Run: `curl -fsS http://127.0.0.1:18080/healthz`
Expected: output `ok`

- [ ] **Step 6: Stop the temporary container**

Run: stop the `docker run` process started in Step 4
Expected: the port `18080` is released

- [ ] **Step 7: Commit**

```bash
git add Dockerfile nginx/default.conf
git commit -m "feat: add container runtime"
```

### Task 4: Add Docker Compose and command shortcuts

**Files:**
- Create: `docker-compose.yml`
- Create: `Makefile`

- [ ] **Step 1: Write the Compose file**

```yaml
services:
  docs:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ccbug-docs
    restart: unless-stopped
    ports:
      - "${DOCS_BIND_ADDRESS:-127.0.0.1}:${DOCS_PORT:-8080}:80"
```

- [ ] **Step 2: Write the Makefile**

```makefile
SHELL := /bin/sh

.PHONY: dev build preview up down logs deploy

dev:
	npm run docs:dev

build:
	npm run docs:build

preview:
	npm run docs:preview

up:
	docker compose up -d --build

down:
	docker compose down

logs:
	docker compose logs -f docs

deploy:
	./deploy.sh
```

- [ ] **Step 3: Start the stack through Compose**

Run: `docker compose up -d --build`
Expected: docs service starts successfully

- [ ] **Step 4: Verify the site through the bound local port**

Run: `curl -I http://127.0.0.1:8080`
Expected: HTTP `200 OK`

- [ ] **Step 5: Stop the stack**

Run: `docker compose down`
Expected: container is removed and port `8080` is released

- [ ] **Step 6: Commit**

```bash
git add docker-compose.yml Makefile
git commit -m "feat: add compose workflow"
```

### Task 5: Add the deploy script

**Files:**
- Create: `deploy.sh`
- Test: script argument and environment validation

- [ ] **Step 1: Write the deploy script**

```sh
#!/bin/sh
set -eu

: "${DEPLOY_HOST:?DEPLOY_HOST is required, e.g. user@example.com}"
: "${DEPLOY_PATH:?DEPLOY_PATH is required, e.g. /srv/ccbug-docs}"

REMOTE_PORT="${DOCS_PORT:-8080}"
REMOTE_BIND_ADDRESS="${DOCS_BIND_ADDRESS:-127.0.0.1}"

printf '%s\n' "Deploying to ${DEPLOY_HOST}:${DEPLOY_PATH}"

ssh "$DEPLOY_HOST" "mkdir -p '$DEPLOY_PATH'"

rsync -az --delete \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude 'docs/.vitepress/cache' \
  --exclude 'docs/.vitepress/dist' \
  ./ "$DEPLOY_HOST":"$DEPLOY_PATH"/

ssh "$DEPLOY_HOST" "
  cd '$DEPLOY_PATH' && \
  DOCS_PORT='$REMOTE_PORT' DOCS_BIND_ADDRESS='$REMOTE_BIND_ADDRESS' docker compose up -d --build
"

printf '%s\n' 'Deploy complete'
```

- [ ] **Step 2: Make the script executable**

Run: `chmod +x deploy.sh`
Expected: `deploy.sh` has executable permissions

- [ ] **Step 3: Verify required environment validation**

Run: `env -u DEPLOY_HOST -u DEPLOY_PATH ./deploy.sh`
Expected: FAIL immediately with a clear missing-variable message

- [ ] **Step 4: Commit**

```bash
git add deploy.sh
git commit -m "feat: add remote deploy script"
```

### Task 6: Document usage and host Nginx integration

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write the README**

```md
# CCBug Docs

一个可直接部署的 VitePress 文档站骨架，适合挂到现有服务器的 Nginx 之后。

## 本地开发

```bash
npm install
make dev
```

## 本地构建

```bash
make build
```

## Docker 运行

```bash
make up
```

默认访问：

- `http://127.0.0.1:8080`

## 服务器直接启动

将项目放到服务器后执行：

```bash
docker compose up -d --build
```

## 本地一键部署

```bash
DEPLOY_HOST=deploy@example.com DEPLOY_PATH=/srv/ccbug-docs make deploy
```

可选环境变量：

- `DOCS_PORT`，默认 `8080`
- `DOCS_BIND_ADDRESS`，默认 `127.0.0.1`

## 宿主机 Nginx 示例

```nginx
server {
    listen 80;
    server_name docs.example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 故障排查

- 域名打不开：先检查 DNS 是否解析到服务器
- 返回 `502`：检查 `docker compose ps` 和反代端口是否一致
- 页面样式丢失：确认 `docs/.vitepress/config.mts` 中 `base` 为 `/`
- 部署失败：确认 `DEPLOY_HOST`、`DEPLOY_PATH`、SSH 登录和服务器 Docker 环境
```

- [ ] **Step 2: Review the docs for command consistency**

Run: manually verify every command in `README.md` matches `package.json`, `Makefile`, `docker-compose.yml`, and `deploy.sh`
Expected: all commands and variable names match exactly

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add setup and deployment guide"
```

### Task 7: Run end-to-end verification

**Files:**
- Verify: `package.json`
- Verify: `docs/.vitepress/config.mts`
- Verify: `Dockerfile`
- Verify: `docker-compose.yml`
- Verify: `Makefile`
- Verify: `deploy.sh`
- Verify: `README.md`

- [ ] **Step 1: Install dependencies cleanly**

Run: `npm install`
Expected: PASS with no missing-package errors

- [ ] **Step 2: Verify the static build**

Run: `npm run docs:build`
Expected: PASS and build output under `docs/.vitepress/dist`

- [ ] **Step 3: Verify the container image**

Run: `docker build -t ccbug-docs:verify .`
Expected: PASS and image `ccbug-docs:verify` exists

- [ ] **Step 4: Verify the Compose stack**

Run: `docker compose up -d --build`
Expected: docs service starts successfully

- [ ] **Step 5: Verify the HTTP endpoint**

Run: `curl -fsS http://127.0.0.1:8080 | head`
Expected: HTML output containing the VitePress page shell

- [ ] **Step 6: Verify the health endpoint**

Run: `curl -fsS http://127.0.0.1:8080/healthz`
Expected: output `ok`

- [ ] **Step 7: Verify deploy script validation again**

Run: `env -u DEPLOY_HOST -u DEPLOY_PATH ./deploy.sh`
Expected: FAIL immediately with a clear missing-variable message

- [ ] **Step 8: Tear down the Compose stack**

Run: `docker compose down`
Expected: stack stops cleanly

- [ ] **Step 9: Commit**

```bash
git add .
git commit -m "chore: verify deployable docs starter"
```
