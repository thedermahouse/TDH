import getPart from "@/helpers/getPart";
import db from "@/lib/db";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method === "GET") {
    const part = await getPart(id);
    if (!part) {
      return res.status(200).json({});
    }
    return res.status(200).json(part);
  } else if (method === "PATCH") {
    const part = await db.PartContents.upsert({
      where: { key: id },
      create: { key: id, content: { ...req.body } },
      update: { content: { ...req?.body } },
    });
    return res.status(200).json(part);
  } else {
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
