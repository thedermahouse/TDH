import db from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const faqs = await db.LandingPageFAQ.findMany();
    return res.status(200).json(faqs);
  }
  if (req.method === "PUT") {
    const { question, answer } = req.body;
    await db.LandingPageFAQ.create({ data: { question, answer } });
    return res.status(200).json({ message: "FAQ created" });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
