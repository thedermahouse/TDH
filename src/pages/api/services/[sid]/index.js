import db from "@/lib/db";

export default async function handler(req, res) {
  const { sid } = req.query;
  if (req.method === "GET") {
    const services = await db.Services.findFirst({
      where: { id: +sid },
      include: { subServices: true },
    });
    res.status(200).json(services);
  } else if (req.method === "PATCH") {
    try {
      const { body } = req;
      await db.Services.update({
        where: { id: +sid },
        data: {
          ...body,
        },
      });
      res.status(204).json({ message: "Service patched" });
    } catch (error) {
      res.status(500).json({ message: "Error patching service" });
    }
  } else if (req.method === "DELETE") {
    try {
      await db.Services.update({
        where: { id: +sid },
        data: { isDeleted: true },
      });
      res.status(204).json({ message: "Service deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting service" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end("Method Not Allowed");
  }
}
