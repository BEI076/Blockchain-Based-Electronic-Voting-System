/*
  Warnings:

  - A unique constraint covering the columns `[voter_address]` on the table `Voter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[voter_id]` on the table `Voter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Voter_voter_address_key" ON "Voter"("voter_address");

-- CreateIndex
CREATE UNIQUE INDEX "Voter_voter_id_key" ON "Voter"("voter_id");
