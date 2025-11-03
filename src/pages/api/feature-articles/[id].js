import db from "@/lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const article = await db.featureArticle.findUnique({ where: { id: Number(id) } });
      return res.json(article);
    }

    if (req.method === "PATCH") {
      const { title, image, date, link } = req.body;
      const article = await db.featureArticle.update({
        where: { id: Number(id) },
        data: { title, image, date: new Date(date), link },
      });
      return res.json(article);
    }

    if (req.method === "DELETE") {
      await db.featureArticle.delete({ where: { id: Number(id) } });
      return res.json({ success: true });
    }

    res.status(405).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
