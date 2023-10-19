-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "HIVStatus" AS ENUM ('Positive', 'Negative');

-- CreateEnum
CREATE TYPE "HepatitisStatus" AS ENUM ('Positive', 'Negative');

-- CreateEnum
CREATE TYPE "Genotype" AS ENUM ('AA', 'AC', 'AS', 'CC', 'SC', 'SS');

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "doctorsName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "specialization" TEXT,
    "gender" "Gender" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "doctorsID" TEXT NOT NULL,
    "patientName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "hospitalName" TEXT NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "heightCm" DOUBLE PRECISION NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "genotype" "Genotype" NOT NULL,
    "bloodPressure" TEXT NOT NULL,
    "HIV_Status" "HIVStatus",
    "hepatitis" "HepatitisStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_phoneNumber_key" ON "Doctor"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_doctorsID_fkey" FOREIGN KEY ("doctorsID") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
