/*
  Warnings:

  - The primary key for the `CartDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "CartDetail" DROP CONSTRAINT "CartDetail_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CartDetail_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CartDetail_id_seq";
