import db from "@/lib/db";

export default async function handler(req, res) {
  const { id, faqId } = req.query;
  const landingPageId = Number(id);
  const faqID = Number(faqId);

  if (!landingPageId || !faqID) {
    return res.status(400).json({ message: "Invalid params" });
  }

  // Ensure the FAQ belongs to this landing page
  const existing = await db.LandingPageFAQ.findUnique({
    where: { id: faqID },
    select: { id: true, landingPageId: true },
  });

  if (!existing || existing.landingPageId !== landingPageId) {
    return res.status(404).json({ message: "FAQ not found for this page" });
  }

  if (req.method === "DELETE") {
    await db.LandingPageFAQ.delete({ where: { id: faqID } });
    return res.status(200).json({ message: "FAQ deleted" });
  }

  if (req.method === "PATCH") {
    const { question, answer } = req.body || {};
    const faq = await db.LandingPageFAQ.update({
      where: { id: faqID },
      data: {
        ...(question !== undefined ? { question } : {}),
        ...(answer !== undefined ? { answer } : {}),
      },
    });
    return res.status(200).json({ message: "FAQ updated", faq });
  }

  res.setHeader("Allow", ["PATCH", "DELETE"]);
  return res.status(405).json({ message: "Method not allowed" });
}
