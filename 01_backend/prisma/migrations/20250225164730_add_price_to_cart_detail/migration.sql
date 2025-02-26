/*
  Warnings:

  - Added the required column `price` to the `CartDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartDetail" ADD COLUMN     "price" INTEGER NOT NULL;
