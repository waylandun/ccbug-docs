# Deployment

The current scaffold can already build static site files. The build output is located at `docs/.vitepress/dist`.

This means the most practical deployment path is to serve that directory with any static file hosting environment.

## Local Docker Runtime

This is a future integration path: add Docker runtime files for the static build output and start a static site service with Compose.

## Connect Host Nginx

This is another planned integration path: after the local container runtime is ready, use the host Nginx to reverse proxy a subdomain to the static site service.

## Remote One-Click Deployment

This is an extension for future maintenance: after runtime files are stable, add a one-click deployment entry to sync the project and trigger remote updates.
