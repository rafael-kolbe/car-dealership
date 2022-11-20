-- CreateTable
CREATE TABLE "Sellers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sold_amount" INTEGER NOT NULL DEFAULT 0,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sellers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL,
    "car_model" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "sold_for" DOUBLE PRECISION NOT NULL,
    "seller_id" TEXT NOT NULL,
    "sold_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cars_car_model_key" ON "Cars"("car_model");

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "Sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
