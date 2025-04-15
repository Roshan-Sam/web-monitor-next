import prisma from "@/lib/prisma";
import axios from "axios";

export async function checkWebsites() {
  const websites = await prisma.website.findMany();

  for (const site of websites) {
    let status = "Fail";

    try {
      const start = Date.now();
      await axios.get(site.url, { timeout: 5000 });
      const responseTime = Date.now() - start;

      status = responseTime > 3000 ? "Slow" : "Success";
    } catch (error) {
      status = "Fail";
    }

    await prisma.websiteStatusHistory.create({
      data: { site_id: site.id, status },
    });

    await prisma.website.update({
      where: { id: site.id },
      data: { last_check_time: new Date() },
    });
  }
}
