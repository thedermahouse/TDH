import db from "@/lib/db";

export default async function handler(req, res) {
  const { ssid } = req.query;
  const faqs = await db.SubServiceFAQ.findMany({
    where: { subServiceId: +ssid },
  });
  if (req.method === "GET") {
    return res.status(200).json(faqs);
  } else if (req.method === "PUT") {
    const { body } = req;
    body.subServiceId = +ssid;
    await db.SubServiceFAQ.create({
      data: body,
    });
    return res.status(200).json({ message: "Service updated" });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
