import db from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(leads);
  }

  if (req.method === "POST") {
    const { fullName, mobile, email, location, message, landingPage } = req.body;

    if (!fullName || !mobile || !email || !location) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    try {
      const newLead = await db.lead.create({
        data: { fullName, mobile, email, location, message, landingPage },
      });

      return res.status(201).json({ message: "Lead created", lead: newLead });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating lead" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: "ID required" });

    try {
      await db.lead.delete({ where: { id: +id } });
      return res.status(200).json({ message: "Lead deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error deleting lead" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
