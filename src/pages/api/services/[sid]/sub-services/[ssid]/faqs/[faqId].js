import db from "@/lib/db";

export default async function handler(req, res) {
  const { ssid, faqId } = req.query;
  const faq = await db.SubServiceFAQ.findFirst({
    where: { subServiceId: +ssid, id: +faqId },
  });
  if (req.method === "GET") {
    return res.status(200).json(faq);
  } else if (req.method === "DELETE") {
    await db.SubServiceFAQ.delete({
      where: { id: +faqId },
    });
    return res.status(200).json({ message: "Service deleted" });
  } else if (req.method === "PATCH") {
    const { body } = req;
    await db.SubServiceFAQ.update({
      where: { id: +faqId },
      data: body,
    });
    return res.status(200).json({ message: "Service updated" });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
