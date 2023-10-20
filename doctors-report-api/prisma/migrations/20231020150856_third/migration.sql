/*
  Warnings:

  - You are about to drop the column `doctorsID` on the `Report` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_doctorsID_fkey";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "doctorsID",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
