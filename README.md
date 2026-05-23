# CCBug Docs

一个可直接部署到现有服务器环境中的 VitePress 文档站脚手架。站点通过 Docker Compose 运行，并由宿主机现有 Nginx 反向代理对外提供访问。

## 本地开发

安装依赖：

```bash
npm install
```

启动本地开发服务器：

```bash
make dev
```

## 本地构建

生成静态站点：

```bash
make build
```

构建产物默认位于 `docs/.vitepress/dist`。

## Docker 运行

启动本地容器：

```bash
make up
```

默认访问地址：

- `http://127.0.0.1:8080`

停止服务：

```bash
make down
```

查看日志：

```bash
make logs
```

## 服务器直接启动

如果项目已经位于服务器目标目录，可直接执行：

```bash
docker compose up -d --build
```

## 本地一键部署

从本地机器同步到远端并触发更新：

```bash
DEPLOY_HOST=deploy@example.com DEPLOY_PATH=/srv/ccbug-docs make deploy
```

默认情况下，部署同步不会删除远端额外文件。如果确实需要与本地完全对齐，可显式启用：

```bash
DEPLOY_DELETE=1 DEPLOY_HOST=deploy@example.com DEPLOY_PATH=/srv/ccbug-docs make deploy
```

## 可选环境变量

- `DOCS_PORT`
  默认值：`8080`
- `DOCS_BIND_ADDRESS`
  默认值：`127.0.0.1`

这些变量会影响 `docker-compose.yml` 中的本地绑定地址，也会由 `deploy.sh` 透传到远端 `docker compose up -d --build`。

## 宿主机 Nginx 示例

下面是一个将 `docs.example.com` 反向代理到本机文档容器的示例：

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

- DNS 没有指向服务器：
  检查域名解析是否已经正确指向部署服务器公网地址。
- Nginx 返回 `502`、Compose 没有运行或端口不正确：
  检查 `docker compose up -d --build` 是否成功，容器是否在运行，以及 `DOCS_PORT` 是否与宿主机 Nginx `proxy_pass` 保持一致。
- 资源路径异常：
  确认 VitePress 配置中的 `base` 仍为 `/`，否则静态资源路径可能不正确。
- 部署失败：
  检查 `DEPLOY_HOST`、`DEPLOY_PATH`、SSH 连通性，以及远端是否具备 Docker / Docker Compose 运行环境。
