/*
  Warnings:

  - Added the required column `yearMonth` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "budget_id_seq";
ALTER TABLE "Budget" ADD COLUMN     "yearMonth" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('budget_id_seq');
ALTER SEQUENCE "budget_id_seq" OWNED BY "Budget"."id";
