# VitePress Documentation Site Design

Date: 2026-05-18

## Goal

Build a minimal, directly deployable VitePress documentation site in this repository with:

- local development support
- static production build
- Dockerized runtime
- Docker Compose startup on the server
- optional local one-command deploy from a developer machine
- integration with an existing host Nginx instance via reverse proxy

## Confirmed Decisions

- Deployment target: Docker on a server
- Runtime shape: Docker Compose plus static file hosting
- Scope: minimal viable documentation site
- Public URL shape: dedicated domain or subdomain, such as `docs.example.com`
- Deployment entrypoints:
  - local one-command deploy
  - direct server-side `docker compose up -d`
- Host environment:
  - the server already runs Nginx
  - the documentation service must not bind host `80` or `443`
  - host Nginx will proxy requests to the documentation container

## Recommended Architecture

Use a two-layer web serving model:

1. VitePress builds the static site.
2. A Docker image serves the built files from an internal Nginx container.
3. Docker Compose runs the container and binds it only to `127.0.0.1:<port>` on the host.
4. The existing host Nginx instance proxies `docs.example.com` to that local port.

This keeps the app self-contained while avoiding conflicts with the server's existing public web stack.

## Alternatives Considered

### 1. Recommended: internal Nginx container behind host Nginx

Pros:

- portable across servers
- predictable static asset behavior
- easy to rebuild and roll back
- no competition for host `80` or `443`

Cons:

- two layers of web serving instead of one

### 2. Node-based static server behind host Nginx

Pros:

- one less technology in the runtime image

Cons:

- weaker defaults for static serving and caching behavior
- less aligned with common production static-site deployments

### 3. Build artifacts copied directly into host Nginx web root

Pros:

- no app container required at runtime

Cons:

- tighter coupling to the server
- weaker portability
- harder rollback and repeatability

## Project Structure

The repository should be created with a small, maintenance-friendly layout:

```text
.
├── docs/
│   ├── .vitepress/
│   │   └── config.mts
│   ├── index.md
│   ├── guide/
│   │   ├── getting-started.md
│   │   └── deployment.md
│   └── api/
│       └── overview.md
├── deploy.sh
├── docker-compose.yml
├── Dockerfile
├── Makefile
├── package.json
├── .dockerignore
├── .gitignore
└── README.md
```

## Functional Requirements

The generated project must support:

- `npm install`
- local docs preview with a development server
- static build output via VitePress
- containerized runtime serving built files
- server startup with `docker compose up -d`
- local one-command deploy to a remote server
- at least a homepage, top navigation, sidebar, and a few example pages

## VitePress Configuration

The VitePress site should be configured for dedicated-domain deployment:

- `base` must be `/`
- site title and description should be present and easy to customize
- top navigation should include home and at least one doc section
- sidebar should support the sample guide pages

The initial content should be minimal but realistic enough to serve as a starter kit rather than a blank demo.

## Container Design

Use a multi-stage Docker build:

1. Build stage:
   - base image: Node LTS
   - install dependencies
   - run VitePress production build
2. Runtime stage:
   - base image: lightweight Nginx
   - copy built site into the Nginx web root
   - provide a small Nginx config suitable for static-file serving

The runtime container should expose port `80` internally only.

## Compose Design

`docker-compose.yml` should:

- define a single docs service
- build from the local `Dockerfile`
- bind a host-local port such as `127.0.0.1:8080:80`
- restart automatically unless stopped

This avoids public port exposure and lets host Nginx remain the only public entrypoint.

## Host Nginx Integration

The repository should include a sample host Nginx server block for a dedicated subdomain:

- `server_name docs.example.com`
- reverse proxy target: `http://127.0.0.1:8080`
- standard forwarded headers for host and client IP

This sample is documentation only. The repository should not attempt to change the user's existing host Nginx automatically.

## Deployment Entrypoints

Two deployment paths must be supported.

### 1. Server-local startup

After the project is present on the server:

```bash
docker compose up -d --build
```

This is the baseline deployment path and must work without any extra tooling.

### 2. Local one-command deploy

Provide `deploy.sh` and a `make deploy` shortcut that:

- validate required environment variables or arguments
- sync the project to the remote server
- run `docker compose up -d --build` remotely

The script should be idempotent and safe to rerun.

Expected configurable values:

- remote SSH target
- remote project path
- optional compose project name or port override

## Makefile Commands

The Makefile should provide a minimal and clear command surface:

- `make dev`
- `make build`
- `make up`
- `make down`
- `make logs`
- `make deploy`

## Error Handling Expectations

The README should document the shortest path to diagnose the most likely failures:

- DNS not pointing to the server
- host Nginx proxy misconfiguration
- container not running
- host-local port mismatch between Compose and Nginx
- VitePress asset path issues
- SSH or remote path issues during deploy

## Verification Plan

Before calling the setup complete, the project should be verifiable with this sequence:

1. `npm install`
2. `npm run docs:dev` or `make dev`
3. `npm run docs:build` or `make build`
4. `docker compose up -d --build`
5. open `http://127.0.0.1:8080`
6. confirm the homepage and doc pages render correctly
7. run the deploy path and confirm it can be repeated safely

## Non-Goals

This first version does not need:

- CI pipelines
- Kubernetes manifests
- full SEO tuning
- analytics
- authentication
- automatic host Nginx editing
- multi-environment promotion workflows

## Risks and Mitigations

### Port conflicts

Risk:

- the selected host-local port may already be in use

Mitigation:

- keep the host binding configurable
- document how to change the port in both Compose and host Nginx

### Host Nginx conflicts

Risk:

- a duplicate server name or incorrect proxy target could break routing

Mitigation:

- provide an isolated example config
- do not auto-modify the host Nginx setup

### Asset path issues

Risk:

- wrong `base` configuration can break static resources

Mitigation:

- explicitly use `/` for dedicated-domain deployment
- verify built pages through the containerized runtime

### Deploy script brittleness

Risk:

- remote deploy may fail because SSH access or remote path assumptions differ

Mitigation:

- keep the script simple and configurable
- document required environment variables clearly

## Implementation Readiness

This design is intentionally scoped for a single implementation pass. It is small enough to implement directly, yet complete enough to leave the user with a reusable starter for future docs work.
