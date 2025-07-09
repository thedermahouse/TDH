import db from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const services = await db.Services.findMany({
      orderBy: { name: "asc" },
      where: { isDeleted: false },
    });
    res.status(200).json(services);
  } else if (req.method === "PUT") {
    const { name, description } = req.body;
    try {
      const cs = await db.Services.create({ data: { name, description } });
      // console.log(cs, "cs");
      return res.status(201).json({ message: "Service created", cs });
    } catch (error) {
      return res.status(500).json({ message: "Error creating service" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end("Method Not Allowed");
  }
}
