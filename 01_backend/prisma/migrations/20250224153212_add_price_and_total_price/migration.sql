/*
  Warnings:

  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderDetail" ADD COLUMN     "price" INTEGER NOT NULL;
