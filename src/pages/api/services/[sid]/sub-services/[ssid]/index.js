import db from "@/lib/db";

export default async function handler(req, res) {
  const { sid, ssid } = req.query;
  const service = await db.SubServices.findFirst({
    where: { serviceId: +sid, id: +ssid },
    include: {
      service: true,
    },
  });

  if (req.method === "GET") {
    return res.status(200).json(service);
  } else if (req.method === "DELETE") {
    await db.SubServices.delete({
      where: { id: +ssid },
    });
    return res.status(200).json({ message: "Service deleted" });
  } else if (req.method === "PATCH") {
    const { body } = req;
    console.log("body", body);
    await db.SubServices.update({
      where: { id: +ssid },
      data: body,
    });
    return res.status(200).json({ message: "Service updated" });
  } else if (req.method === "POST") {
    const { body } = req;
    const { action } = body;

    const allServices = await db.SubServices.findMany({
      where: { serviceId: +sid },
      orderBy: { priority: "asc" },
    });

    // Find current service index
    const currentIndex = allServices.findIndex((s) => s.id === +ssid);
    if (currentIndex === -1) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (
      action === "increment_priority" &&
      currentIndex < allServices.length - 1
    ) {
      // Swap with next priority
      await db.$transaction([
        db.SubServices.update({
          where: { id: +ssid },
          data: { priority: 9999 },
        }),
        db.SubServices.update({
          where: { id: allServices[currentIndex + 1].id },
          data: { priority: allServices[currentIndex].priority },
        }),
        db.SubServices.update({
          where: { id: +ssid },
          data: { priority: allServices[currentIndex + 1].priority },
        }),
      ]);
    } else if (action === "decrement_priority" && currentIndex > 0) {
      await db.$transaction([
        db.SubServices.update({
          where: { id: +ssid },
          data: { priority: 9999 },
        }),
        db.SubServices.update({
          where: { id: allServices[currentIndex - 1].id },
          data: { priority: allServices[currentIndex].priority },
        }),
        db.SubServices.update({
          where: { id: +ssid },
          data: { priority: allServices[currentIndex - 1].priority },
        }),
      ]);
    }

    return res.status(200).json({ message: "Service updated" });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
