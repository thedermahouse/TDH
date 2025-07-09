import db from "@/lib/db";

export default async function handler(req, res) {
  const { ssid, pricingId } = req.query;
  const faq = await db.SubServicePlans.findFirst({
    where: { subServiceId: +ssid, id: +pricingId },
  });
  if (req.method === "GET") {
    return res.status(200).json(faq);
  } else if (req.method === "DELETE") {
    await db.SubServicePlans.delete({
      where: { id: +pricingId },
    });
    return res.status(200).json({ message: "Service deleted" });
  } else if (req.method === "PATCH") {
    const { body } = req;
    await db.SubServicePlans.update({
      where: { id: +pricingId },
      data: body,
    });
    return res.status(200).json({ message: "Service updated" });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
