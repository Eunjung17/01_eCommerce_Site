/*
  Warnings:

  - You are about to drop the column `userRole` on the `User` table. All the data in the column will be lost.
  - Added the required column `userRoleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "userRole",
ADD COLUMN     "userRoleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES "UserRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
