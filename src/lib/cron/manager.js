import cron from "node-cron";
import { checkWebsites } from "@/utils/website-monitor/checkWebsites";

class CronManager {
  static instance;
  isInitialized = false;

  constructor() {
    if (CronManager.instance) {
      return CronManager.instance;
    }
    CronManager.instance = this;
  }

  initialize() {
    if (this.isInitialized) return;

    cron.schedule("*/1 * * * *", async () => {
      console.log("Running website check...");
      try {
        await checkWebsites();
        console.log("Website check completed");
      } catch (error) {
        console.error("Website check failed:", error);
      }
    });

    this.isInitialized = true;
    console.log("Cron jobs initialized");
  }
}

export const cronManager = new CronManager();
