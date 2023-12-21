/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `user_account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_account_phoneNumber_key" ON "user_account"("phoneNumber");
