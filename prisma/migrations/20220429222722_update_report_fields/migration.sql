/*
  Warnings:

  - You are about to drop the column `reportStatus` on the `Report` table. All the data in the column will be lost.
  - Added the required column `status` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Report` 
    ADD COLUMN `latlong` VARCHAR(191) NULL,
    CHANGE `reportStatus` `status` ENUM('UPLOADED', 'ACCEPTED', 'REJECTED') NOT NULL;
