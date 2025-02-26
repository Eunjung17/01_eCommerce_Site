/*
  Warnings:

  - The primary key for the `Cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CategoryDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OrderDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CartDetail" DROP CONSTRAINT "CartDetail_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryDetail" DROP CONSTRAINT "CategoryDetail_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryDetailId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_orderDetailId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userRoleId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cart_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Cart_id_seq";

-- AlterTable
ALTER TABLE "CartDetail" ALTER COLUMN "cartId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Category_id_seq";

-- AlterTable
ALTER TABLE "CategoryDetail" DROP CONSTRAINT "CategoryDetail_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "categoryId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CategoryDetail_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CategoryDetail_id_seq";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Order_id_seq";

-- AlterTable
ALTER TABLE "OrderDetail" DROP CONSTRAINT "OrderDetail_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OrderDetail_id_seq";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryDetailId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "orderDetailId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Review_id_seq";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "userRoleId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserRole_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_orderDetailId_fkey" FOREIGN KEY ("orderDetailId") REFERENCES "OrderDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryDetailId_fkey" FOREIGN KEY ("categoryDetailId") REFERENCES "CategoryDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryDetail" ADD CONSTRAINT "CategoryDetail_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartDetail" ADD CONSTRAINT "CartDetail_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
