import db from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const pages = await db.Pages.findMany({});
    return res.status(200).json(pages);
  } else if (req.method === "PUT") {
    const { body } = req;
    await db.Pages.create({
      data: body,
    });
    return res.status(200).json({ message: "Page updated" });
  }
  return res.status(405).json({ message: "Method not allowed" });
}
