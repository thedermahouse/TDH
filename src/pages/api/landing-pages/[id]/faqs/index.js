import db from "@/lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const faqs = await db.landingPageFAQ.findMany({
      where: { landingPageId: Number(id) }, // ✅ only this landing
    });
    return res.status(200).json(faqs);
  }

  if (req.method === "PUT") {
    const { question, answer } = req.body;
    await db.landingPageFAQ.create({
      data: {
        question,
        answer,
        landingPageId: Number(id), // ✅ link to landing page
      },
    });
    return res.status(200).json({ message: "FAQ created" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
