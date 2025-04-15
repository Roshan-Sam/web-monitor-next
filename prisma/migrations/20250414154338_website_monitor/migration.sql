/*
  Warnings:

  - You are about to drop the `StatusHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StatusHistory" DROP CONSTRAINT "StatusHistory_site_id_fkey";

-- DropTable
DROP TABLE "StatusHistory";

-- CreateTable
CREATE TABLE "WebsiteStatusHistory" (
    "id" SERIAL NOT NULL,
    "site_id" INTEGER NOT NULL,
    "check_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "WebsiteStatusHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WebsiteStatusHistory" ADD CONSTRAINT "WebsiteStatusHistory_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
