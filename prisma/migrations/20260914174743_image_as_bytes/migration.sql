/*
  Warnings:

  - The `image` column on the `Advertisements` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `image` column on the `News` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Advertisements" ADD COLUMN     "imageMime" TEXT,
DROP COLUMN "image",
ADD COLUMN     "image" BYTEA;

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "imageMime" TEXT,
DROP COLUMN "image",
ADD COLUMN     "image" BYTEA;
