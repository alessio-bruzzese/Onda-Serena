/*
  Warnings:

  - You are about to drop the column `priceType` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "priceType";

-- DropEnum
DROP TYPE "PriceType";
