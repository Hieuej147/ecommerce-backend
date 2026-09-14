-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ORDER_CREATED', 'ORDER_SHIPPED', 'ORDER_CANCELLED', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'PRODUCT_LOW_STOCK', 'NEW_CUSTOMER', 'SYSTEM_ALERT');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN "colors" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "sizes" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "targetRole" TEXT,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "href" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "dedupeKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_dedupeKey_key" ON "Notification"("dedupeKey");

-- CreateIndex
CREATE INDEX "Notification_userId_read_idx" ON "Notification"("userId", "read");

-- CreateIndex
CREATE INDEX "Notification_targetRole_read_idx" ON "Notification"("targetRole", "read");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");
