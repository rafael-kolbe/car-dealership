/*
  Warnings:

  - You are about to alter the column `price` on the `Cars` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `sold_for` on the `Sales` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Cars" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Sales" ALTER COLUMN "sold_for" SET DATA TYPE INTEGER;
