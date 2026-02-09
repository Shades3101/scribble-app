/*
  Warnings:

  - A unique constraint covering the columns `[slug,adminId]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Room_adminId_key";

-- DropIndex
DROP INDEX "public"."Room_slug_key";

-- CreateIndex
CREATE INDEX "Room_adminId_idx" ON "Room"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "Room_slug_adminId_key" ON "Room"("slug", "adminId");
