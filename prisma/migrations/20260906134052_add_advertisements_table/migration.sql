-- CreateTable
CREATE TABLE "Advertisements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Advertisements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Advertisements_isActive_idx" ON "Advertisements"("isActive");

-- CreateIndex
CREATE INDEX "Advertisements_startDate_idx" ON "Advertisements"("startDate");
