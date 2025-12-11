-- DropIndex
DROP INDEX "Products_createdAt_idx";

-- DropIndex
DROP INDEX "Products_userId_name_idx";

-- CreateIndex
CREATE INDEX "Products_userId_name_createdAt_idx" ON "Products"("userId", "name", "createdAt");
