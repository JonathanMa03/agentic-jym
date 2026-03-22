#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

cleanup() {
  echo ""
  echo "Stopping frontend and backend..."
  jobs -p | xargs -r kill
}
trap cleanup EXIT INT TERM

echo "Starting backend..."
(
  cd "$ROOT_DIR/backend"
  source .venv/bin/activate
  python -m uvicorn app.main:app --reload --reload-dir app
) &

BACKEND_PID=$!

echo "Starting frontend..."
(
  cd "$ROOT_DIR/frontend"
  npm run dev
) &

FRONTEND_PID=$!

wait $BACKEND_PID $FRONTEND_PID