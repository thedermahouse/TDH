import db from "@/lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const page = await db.Pages.findFirst({ where: { id: +id } });
    if (!page) {
      return res.status(404).json({ message: "Page not found" });
    }
    return res.status(200).json(page);
  } else if (req.method === "PATCH") {
    const { body } = req;
    await db.Pages.update({
      where: { id: +id },
      data: body,
    });
    return res.status(200).json({ message: "Page updated" });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
