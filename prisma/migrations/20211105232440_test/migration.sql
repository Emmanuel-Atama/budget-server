/*
  Warnings:

  - Added the required column `budgetId` to the `CategoryGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategoryGroup" ADD COLUMN     "budgetId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CategoryGroup" ADD FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;
