#!/usr/bin/env bash

set -u

gateway_pid=""
webhook_pid=""

cleanup() {
  status=$?
  trap - INT TERM EXIT

  if [[ -n "$gateway_pid" ]]; then
    kill "$gateway_pid" 2>/dev/null || true
  fi

  if [[ -n "$webhook_pid" ]]; then
    kill "$webhook_pid" 2>/dev/null || true
  fi

  wait "$gateway_pid" "$webhook_pid" 2>/dev/null || true
  exit "$status"
}

trap cleanup INT TERM EXIT

pnpm exec nest start api-gateway --watch &
gateway_pid=$!

pnpm run dev:webhook &
webhook_pid=$!

wait -n "$gateway_pid" "$webhook_pid"
