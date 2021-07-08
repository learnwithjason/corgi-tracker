/*
  Warnings:

  - A unique constraint covering the columns `[corgiId]` on the table `Toy` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Corgi" ADD COLUMN "toyId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Toy_corgiId_unique" ON "Toy"("corgiId");
