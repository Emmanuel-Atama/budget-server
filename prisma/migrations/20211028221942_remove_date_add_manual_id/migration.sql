/*
  Warnings:

  - You are about to drop the column `yearAndMonth` on the `Budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "yearAndMonth",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Budget_id_seq";
