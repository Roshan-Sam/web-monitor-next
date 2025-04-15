const initCron = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cron`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CRON_SECRET}`,
        },
      }
    );

    const data = await response.json();
    console.log("Cron initialization:", data);
  } catch (error) {
    console.error("Failed to initialize cron:", error);
  }
};

initCron();
