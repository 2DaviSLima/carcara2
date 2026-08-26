/*
  Warnings:

  - You are about to drop the column `create_at` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `stutus` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InvoicesStatus" AS ENUM ('PENDING', 'PAID');

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "create_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "date",
DROP COLUMN "status",
ADD COLUMN     "stutus" "InvoicesStatus" NOT NULL;

-- DropEnum
DROP TYPE "InvoiceStatus";
