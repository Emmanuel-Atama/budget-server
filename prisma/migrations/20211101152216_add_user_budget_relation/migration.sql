/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Budget` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Budget_userId_unique" ON "Budget"("userId");

-- AddForeignKey
ALTER TABLE "Budget" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
