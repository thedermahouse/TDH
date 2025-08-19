import db from "@/lib/db";
import slugify from "@/lib/slugify";

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    if (req.method === "GET") {
      const page = await db.landingPage.findUnique({
        where: { id: Number(id) },
      });
      if (!page) return res.status(404).json({ error: "Not found" });
      return res.json(page);
    }

    if (req.method === "PUT" || req.method === "PATCH") {
      try {
        const data = { ...req.body };

        // Map frontend -> schema fields
        if ("published" in data) {
          data.isPublished = data.published;
          delete data.published;
        }

        // Remove unsupported fields
        delete data.ctaText;
        delete data.ctaLink;

        // Handle slug
        if (data.slug) data.slug = slugify(data.slug);
        if (data.title && !data.slug) data.slug = slugify(data.title);

        const updated = await db.landingPage.update({
          where: { id: Number(id) },
          data,
        });

        return res.json(updated);
      } catch (err) {
        console.error("LandingPage Update Error:", err);
        return res.status(500).json({ error: err.message });
      }
    }

    if (req.method === "DELETE") {
      await db.landingPage.delete({ where: { id: Number(id) } });
      return res.status(204).end();
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
