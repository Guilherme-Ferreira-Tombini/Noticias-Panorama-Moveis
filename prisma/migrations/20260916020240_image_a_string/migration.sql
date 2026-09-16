/*
  Warnings:

  - You are about to drop the column `imageMime` on the `Advertisements` table. All the data in the column will be lost.
  - You are about to drop the column `imageMime` on the `News` table. All the data in the column will be lost.
  - Made the column `image` on table `Advertisements` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `News` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Advertisements" DROP COLUMN "imageMime",
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "News" DROP COLUMN "imageMime",
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DATA TYPE TEXT;
