/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Prevoter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prevoter_email_key" ON "Prevoter"("email");
