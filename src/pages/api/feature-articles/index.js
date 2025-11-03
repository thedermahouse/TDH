import db from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const articles = await db.featureArticle.findMany({
        orderBy: { date: "desc" },
      });
      return res.json({ data: articles });
    }

    if (req.method === "POST") {
      const { title, image, date, link } = req.body;
      if (!title || !image || !link) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const article = await db.featureArticle.create({
        data: { title, image, date: new Date(date), link },
      });

      return res.json(article);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
