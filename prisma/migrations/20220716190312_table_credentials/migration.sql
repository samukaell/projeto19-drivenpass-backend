-- CreateTable
CREATE TABLE "Credentials" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TitleCredentials" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "labels" TEXT NOT NULL,
    "CredentialsId" INTEGER NOT NULL,

    CONSTRAINT "TitleCredentials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TitleCredentials" ADD CONSTRAINT "TitleCredentials_CredentialsId_fkey" FOREIGN KEY ("CredentialsId") REFERENCES "Credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
