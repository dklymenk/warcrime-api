/*
  Warnings:

  - You are about to drop the column `latlong` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Report` DROP COLUMN `latlong`,
    ADD COLUMN `latLong` VARCHAR(191) NULL;
