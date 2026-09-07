-- Adds dashboard fields and durable agent runtime tables to the shared dev database.
CREATE TYPE "ConversationThreadStatus" AS ENUM ('IDLE', 'RUNNING', 'DELETING');
CREATE TYPE "AgentRunStatus" AS ENUM ('RUNNING', 'COMPLETED', 'ERROR', 'STOPPED');
CREATE TYPE "AgentRunKind" AS ENUM ('ROOT', 'SUBAGENT');

ALTER TABLE "Order"
  ADD COLUMN "customerEmail" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "customerName" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "externalId" TEXT;

ALTER TABLE "Product"
  ADD COLUMN "categorySlug" TEXT NOT NULL DEFAULT 'uncategorized',
  ADD COLUMN "externalId" TEXT,
  ADD COLUMN "images" JSONB,
  ADD COLUMN "reorderPoint" INTEGER NOT NULL DEFAULT 20,
  ADD COLUMN "sku" TEXT;

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
  CONSTRAINT "AgentEvent_pkey" PRIMARY KEY ("runId","sequence")
);

CREATE INDEX "ConversationThread_userId_updatedAt_idx" ON "ConversationThread"("userId", "updatedAt");
CREATE INDEX "ConversationThread_userId_agentId_status_idx" ON "ConversationThread"("userId", "agentId", "status");
CREATE INDEX "AgentRun_threadId_startedAt_idx" ON "AgentRun"("threadId", "startedAt");
CREATE INDEX "AgentRun_threadId_status_idx" ON "AgentRun"("threadId", "status");
CREATE INDEX "AgentRun_rootRunId_idx" ON "AgentRun"("rootRunId");
CREATE INDEX "AgentEvent_threadId_createdAt_idx" ON "AgentEvent"("threadId", "createdAt");
CREATE UNIQUE INDEX "Order_externalId_key" ON "Order"("externalId");
CREATE UNIQUE INDEX "Product_externalId_key" ON "Product"("externalId");
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

ALTER TABLE "AgentRun" ADD CONSTRAINT "AgentRun_threadId_fkey"
  FOREIGN KEY ("threadId") REFERENCES "ConversationThread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AgentEvent" ADD CONSTRAINT "AgentEvent_runId_fkey"
  FOREIGN KEY ("runId") REFERENCES "AgentRun"("id") ON DELETE CASCADE ON UPDATE CASCADE;
