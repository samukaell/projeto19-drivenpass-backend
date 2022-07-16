-- CreateTable
CREATE TABLE "Sesson" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Sesson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sesson" ADD CONSTRAINT "Sesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
