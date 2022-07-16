/*
  Warnings:

  - You are about to drop the `TitleCredentials` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `siteId` to the `Credentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TitleCredentials" DROP CONSTRAINT "TitleCredentials_CredentialsId_fkey";

-- AlterTable
ALTER TABLE "Credentials" ADD COLUMN     "siteId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TitleCredentials";

-- CreateTable
CREATE TABLE "Site" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Credentials" ADD CONSTRAINT "Credentials_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
