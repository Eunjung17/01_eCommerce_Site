-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userRole" TEXT NOT NULL,
    "confirmAdmin" BOOLEAN NOT NULL,
    "taxId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "orderDetailId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "images" TEXT,
    "quantity" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "OrderDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartDetail" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "CartDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_orderDetailId_key" ON "Review"("orderDetailId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_orderDetailId_fkey" FOREIGN KEY ("orderDetailId") REFERENCES "OrderDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartDetail" ADD CONSTRAINT "CartDetail_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartDetail" ADD CONSTRAINT "CartDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
