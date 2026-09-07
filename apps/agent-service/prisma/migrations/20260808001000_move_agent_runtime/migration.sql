CREATE SCHEMA IF NOT EXISTS "agent_runtime";
SET search_path TO "agent_runtime";

CREATE TYPE "ConversationThreadStatus" AS ENUM ('IDLE', 'RUNNING', 'DELETING');
CREATE TYPE "AgentRunStatus" AS ENUM ('RUNNING', 'COMPLETED', 'ERROR', 'STOPPED');
CREATE TYPE "AgentRunKind" AS ENUM ('ROOT', 'SUBAGENT');

CREATE TABLE "ConversationThread" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'New conversation',
    "status" "ConversationThreadStatus" NOT NULL DEFAULT 'IDLE',
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ConversationThread_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AgentRun" (
    "id" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "parentRunId" TEXT,
    "rootRunId" TEXT NOT NULL,
    "depth" INTEGER NOT NULL DEFAULT 0,
    "kind" "AgentRunKind" NOT NULL DEFAULT 'ROOT',
    "status" "AgentRunStatus" NOT NULL DEFAULT 'RUNNING',
    "input" JSONB NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "errorCode" TEXT,
    CONSTRAINT "AgentRun_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AgentEvent" (
    "runId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "event" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AgentEvent_pkey" PRIMARY KEY ("runId", "sequence")
);

CREATE INDEX "ConversationThread_userId_updatedAt_idx" ON "ConversationThread"("userId", "updatedAt");
CREATE INDEX "ConversationThread_userId_agentId_status_idx" ON "ConversationThread"("userId", "agentId", "status");
CREATE INDEX "AgentRun_threadId_startedAt_idx" ON "AgentRun"("threadId", "startedAt");
CREATE INDEX "AgentRun_threadId_status_idx" ON "AgentRun"("threadId", "status");
CREATE INDEX "AgentRun_rootRunId_idx" ON "AgentRun"("rootRunId");
CREATE INDEX "AgentEvent_threadId_createdAt_idx" ON "AgentEvent"("threadId", "createdAt");

ALTER TABLE "AgentRun" ADD CONSTRAINT "AgentRun_threadId_fkey"
  FOREIGN KEY ("threadId") REFERENCES "ConversationThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AgentEvent" ADD CONSTRAINT "AgentEvent_runId_fkey"
  FOREIGN KEY ("runId") REFERENCES "AgentRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;

DO $$
BEGIN
  IF to_regclass('public."ConversationThread"') IS NOT NULL THEN
    INSERT INTO agent_runtime."ConversationThread"
      ("id", "userId", "agentId", "title", "status", "archivedAt", "createdAt", "updatedAt")
    SELECT "id", "userId", "agentId", "title",
      "status"::text::agent_runtime."ConversationThreadStatus",
      "archivedAt", "createdAt", "updatedAt"
    FROM public."ConversationThread"
    ON CONFLICT ("id") DO NOTHING;
  END IF;

  IF to_regclass('public."AgentRun"') IS NOT NULL THEN
    INSERT INTO agent_runtime."AgentRun"
      ("id", "threadId", "agentId", "parentRunId", "rootRunId", "depth", "kind", "status", "input", "startedAt", "finishedAt", "errorCode")
    SELECT "id", "threadId", "agentId", "parentRunId", "rootRunId", "depth",
      "kind"::text::agent_runtime."AgentRunKind",
      "status"::text::agent_runtime."AgentRunStatus",
      "input", "startedAt", "finishedAt", "errorCode"
    FROM public."AgentRun"
    ON CONFLICT ("id") DO NOTHING;
  END IF;

  IF to_regclass('public."AgentEvent"') IS NOT NULL THEN
    INSERT INTO agent_runtime."AgentEvent"
      ("runId", "threadId", "sequence", "event", "createdAt")
    SELECT "runId", "threadId", "sequence", "event", "createdAt"
    FROM public."AgentEvent"
    ON CONFLICT ("runId", "sequence") DO NOTHING;
  END IF;
END $$;
