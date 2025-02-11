/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categoryDetailId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId",
ADD COLUMN     "categoryDetailId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CategoryDetail" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "CategoryDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryDetail_name_key" ON "CategoryDetail"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryDetailId_fkey" FOREIGN KEY ("categoryDetailId") REFERENCES "CategoryDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryDetail" ADD CONSTRAINT "CategoryDetail_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
