-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('PERCENTAGE', 'QUOTE');

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "priceType" "PriceType" NOT NULL DEFAULT 'QUOTE';
