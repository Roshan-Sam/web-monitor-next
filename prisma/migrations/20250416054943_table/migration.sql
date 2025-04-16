-- CreateTable
CREATE TABLE "Website" (
    "id" SERIAL NOT NULL,
    "site_name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "last_check_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

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
