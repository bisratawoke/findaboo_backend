-- CreateTable
CREATE TABLE "user_account" (
    "id" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_account_pkey" PRIMARY KEY ("id")
);
