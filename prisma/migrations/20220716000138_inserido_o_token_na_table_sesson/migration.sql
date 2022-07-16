/*
  Warnings:

  - Added the required column `token` to the `Sesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sesson" ADD COLUMN     "token" TEXT NOT NULL;
