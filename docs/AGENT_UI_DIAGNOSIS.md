# Thread UI diagnosis

## Current status

The active backend now exposes a self-managed CopilotKit multi-route runtime at
`/v1/api/copilotkit`. The frontend may connect to it only with the canonical
agent id `dashboard`.

Use:

```text
GET    /v1/api/copilotkit/threads
POST   /v1/api/copilotkit/threads
PATCH  /v1/api/copilotkit/threads/:id
DELETE /v1/api/copilotkit/threads/:id
GET    /v1/api/copilotkit/threads/:id/events
```

`DELETE` is soft-delete. Refreshing the default list must hide the archived
thread, while `includeArchived=true` is reserved for recovery/admin views.

## Previous runtime errors

The following errors indicate an old route/agent configuration:

```text
Runtime info request failed with status 404
Agent 'default' not found
```

Fix the runtime URL to `/v1/api/copilotkit` and use multi-route mode. Do not use
the `default` agent id; use `dashboard`. If `/info` is 200 but `/run` returns
`503 AGENT_UNAVAILABLE`, the Gateway is correct and only the upstream
`AGENT_URL` process is missing.

## Event/A2UI note

A2UI middleware is disabled until a concrete catalog is registered, but the
backend event model is ready: an A2UI payload is stored as an AG-UI
`ACTIVITY_SNAPSHOT` in `AgentEvent.event`, then replayed with the compacted run
history. There is no separate A2UI table.
