import db from "@/lib/db";

export default async function handler(req, res) {
  const { sid } = req.query;

  // Fetch sub-services for the given serviceId
  const services = await db.SubServices.findMany({
    where: { serviceId: +sid },
  });
  console.log("services", services);

  // Calculate max priority, default to 0 if no services exist
  const priorities = services.map((s) => s.priority);
  const maxPriority = priorities.length > 0 ? Math.max(...priorities) : 0;

  if (req.method === "GET") {
    res.status(200).json(services);
  } else if (req.method === "PUT") {
    const { name, description } = req.body;

    try {
      const data = await db.SubServices.create({
        data: {
          name,
          description,
          priority: maxPriority + 1,
          service: {
            connect: { id: +sid }, // Connect to the Service with the given serviceId
          },
        },
      });
      return res.status(201).json({ message: "Service created", data });
    } catch (error) {
      console.error("Error creating sub-service:", error);
      if (error.code === "P2002") {
        return res.status(409).json({ message: "Sub-service already exists" });
      }
      return res
        .status(500)
        .json({ message: "Error creating sub-service", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
