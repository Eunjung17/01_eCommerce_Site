/*
  Warnings:

  - A unique constraint covering the columns `[productId,cartId,isDeleted]` on the table `CartDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartDetail_productId_cartId_isDeleted_key" ON "CartDetail"("productId", "cartId", "isDeleted");
