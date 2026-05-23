#!/bin/sh
set -eu

: "${DEPLOY_HOST:?DEPLOY_HOST is required, e.g. user@example.com}"
: "${DEPLOY_PATH:?DEPLOY_PATH is required, e.g. /srv/ccbug-docs}"

quote_sh() {
  printf "'%s'" "$(printf '%s' "$1" | sed "s/'/'\\\\''/g")"
}

REMOTE_PORT="${DOCS_PORT:-8080}"
REMOTE_BIND_ADDRESS="${DOCS_BIND_ADDRESS:-127.0.0.1}"
REMOTE_PATH_Q="$(quote_sh "$DEPLOY_PATH")"
REMOTE_BIND_ADDRESS_Q="$(quote_sh "$REMOTE_BIND_ADDRESS")"

case "$REMOTE_PORT" in
  ''|*[!0-9]*)
    printf '%s\n' "DOCS_PORT must be an integer between 1 and 65535" >&2
    exit 1
    ;;
esac

if [ "$REMOTE_PORT" -lt 1 ] || [ "$REMOTE_PORT" -gt 65535 ]; then
  printf '%s\n' "DOCS_PORT must be an integer between 1 and 65535" >&2
  exit 1
fi

RSYNC_DELETE_FLAG=''
case "${DEPLOY_DELETE:-0}" in
  0|'')
    ;;
  1)
    RSYNC_DELETE_FLAG='--delete'
    ;;
  *)
    printf '%s\n' "DEPLOY_DELETE must be unset, 0, or 1" >&2
    exit 1
    ;;
esac

printf '%s\n' "Deploying to ${DEPLOY_HOST}:${DEPLOY_PATH}"

ssh "$DEPLOY_HOST" "mkdir -p -- $REMOTE_PATH_Q"

rsync -az ${RSYNC_DELETE_FLAG:+$RSYNC_DELETE_FLAG} \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude 'docs/.vitepress/cache' \
  --exclude 'docs/.vitepress/dist' \
  ./ "$DEPLOY_HOST":"$REMOTE_PATH_Q"/

ssh "$DEPLOY_HOST" "
  cd -- $REMOTE_PATH_Q && \
  DOCS_PORT='$REMOTE_PORT' DOCS_BIND_ADDRESS=$REMOTE_BIND_ADDRESS_Q docker compose up -d --build
"

printf '%s\n' 'Deploy complete'
