-- CreateTable
CREATE TABLE "Website" (
    "id" SERIAL NOT NULL,
    "site_name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "last_check_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StatusHistory" (
    "id" SERIAL NOT NULL,
    "site_id" INTEGER NOT NULL,
    "check_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "StatusHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StatusHistory" ADD CONSTRAINT "StatusHistory_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
