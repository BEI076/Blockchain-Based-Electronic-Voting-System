-- CreateTable
CREATE TABLE `Admin` (
    `a_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    PRIMARY KEY (`a_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Party` (
    `p_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`p_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `c_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`c_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidate` (
    `ca_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `citizenshipid` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `c_id` INTEGER NOT NULL,
    `p_id` INTEGER NOT NULL,
    `candidate_address` VARCHAR(191) NOT NULL,

    INDEX `c_id`(`c_id`),
    INDEX `p_id`(`p_id`),
    PRIMARY KEY (`ca_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voter` (
    `v_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `citizenshipid` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `voter_address` VARCHAR(191) NOT NULL,
    `voter_id` VARCHAR(191) NOT NULL,
    `flag` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Voter_email_key`(`email`),
    UNIQUE INDEX `Voter_citizenshipid_key`(`citizenshipid`),
    UNIQUE INDEX `Voter_voter_address_key`(`voter_address`),
    UNIQUE INDEX `Voter_voter_id_key`(`voter_id`),
    PRIMARY KEY (`v_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Result` (
    `r_id` INTEGER NOT NULL AUTO_INCREMENT,
    `candidate_name` VARCHAR(191) NULL,
    `candidate_address` VARCHAR(191) NULL,
    `party_name` VARCHAR(191) NULL,
    `category_name` VARCHAR(191) NULL,
    `votes` BIGINT NULL,

    PRIMARY KEY (`r_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prevoter` (
    `v_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `citizenshipid` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `frontImage` VARCHAR(191) NOT NULL,
    `backImage` VARCHAR(191) NOT NULL,
    `flag` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Prevoter_email_key`(`email`),
    UNIQUE INDEX `Prevoter_citizenshipid_key`(`citizenshipid`),
    PRIMARY KEY (`v_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_c_id_fkey` FOREIGN KEY (`c_id`) REFERENCES `Category`(`c_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_p_id_fkey` FOREIGN KEY (`p_id`) REFERENCES `Party`(`p_id`) ON DELETE CASCADE ON UPDATE CASCADE;
