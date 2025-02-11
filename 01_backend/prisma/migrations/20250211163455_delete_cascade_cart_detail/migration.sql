-- DropForeignKey
ALTER TABLE "CartDetail" DROP CONSTRAINT "CartDetail_cartId_fkey";

-- AddForeignKey
ALTER TABLE "CartDetail" ADD CONSTRAINT "CartDetail_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
