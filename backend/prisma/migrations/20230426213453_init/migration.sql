-- CreateTable
CREATE TABLE "Admin" (
    "a_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("a_id")
);

-- CreateTable
CREATE TABLE "Party" (
    "p_id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("p_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "c_id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "ca_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "citizenshipid" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "c_id" INTEGER NOT NULL,
    "p_id" INTEGER NOT NULL,
    "candidate_address" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("ca_id")
);

-- CreateTable
CREATE TABLE "Voter" (
    "v_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "citizenshipid" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "voter_address" TEXT NOT NULL,
    "voter_id" TEXT NOT NULL,
    "flag" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Voter_pkey" PRIMARY KEY ("v_id")
);

-- CreateTable
CREATE TABLE "Result" (
    "r_id" SERIAL NOT NULL,
    "candidate_name" TEXT,
    "candidate_address" TEXT,
    "party_name" TEXT,
    "category_name" TEXT,
    "votes" BIGINT,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("r_id")
);

-- CreateTable
CREATE TABLE "Prevoter" (
    "v_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "citizenshipid" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "frontImage" TEXT NOT NULL,
    "backImage" TEXT NOT NULL,
    "flag" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Prevoter_pkey" PRIMARY KEY ("v_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE INDEX "c_id" ON "Candidate"("c_id");

-- CreateIndex
CREATE INDEX "p_id" ON "Candidate"("p_id");

-- CreateIndex
CREATE UNIQUE INDEX "Voter_email_key" ON "Voter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Voter_citizenshipid_key" ON "Voter"("citizenshipid");

-- CreateIndex
CREATE UNIQUE INDEX "Prevoter_citizenshipid_key" ON "Prevoter"("citizenshipid");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_c_id_fkey" FOREIGN KEY ("c_id") REFERENCES "Category"("c_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_p_id_fkey" FOREIGN KEY ("p_id") REFERENCES "Party"("p_id") ON DELETE CASCADE ON UPDATE CASCADE;
