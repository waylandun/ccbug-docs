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
