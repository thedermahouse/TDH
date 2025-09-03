import db from "@/lib/db";

export default async function handler(req, res) {
  const { id, faqId } = req.query;

  if (req.method === "DELETE") {
    await db.LandingPageFAQ.delete({
      where: { id: +faqId },
    });
    return res.status(200).json({ message: "FAQ deleted" });
  }

  if (req.method === "PATCH") {
    const { question, answer } = req.body;
    await db.LandingPageFAQ.update({
      where: { id: +faqId },
      data: { question, answer },
    });
    return res.status(200).json({ message: "FAQ updated" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
