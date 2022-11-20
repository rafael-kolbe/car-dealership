/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Sellers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Sellers_name_key" ON "Sellers"("name");
