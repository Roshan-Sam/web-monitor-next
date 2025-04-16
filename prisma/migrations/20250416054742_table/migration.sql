/*
  Warnings:

  - You are about to drop the `Website` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WebsiteStatusHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WebsiteStatusHistory" DROP CONSTRAINT "WebsiteStatusHistory_site_id_fkey";

-- DropTable
DROP TABLE "Website";

-- DropTable
DROP TABLE "WebsiteStatusHistory";
