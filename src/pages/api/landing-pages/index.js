import db from "@/lib/db";
import slugify from "@/lib/slugify";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      try {
        const pages = await db.landingPage.findMany({
          select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        });
        return res.json(pages);
      } catch (err) {
        console.error(err);
        return res.status(500).json([]);
      }
    }

    if (req.method === "POST") {
      try {
        const {
          title,
          description,
          bannerUrl,
          metaTitle,
          metaDescription,
          slug,
        } = req.body;

        const finalSlug = slug ? slugify(slug) : slugify(title);

        const created = await db.landingPage.create({
          data: {
            title,
            description,
            bannerUrl,
            metaTitle,
            metaDescription,
            slug: finalSlug,
          },
        });

        return res.status(201).json(created);
      } catch (err) {
        console.error("Landing Page Create Error:", err); // 👈 will show Prisma error
        return res.status(500).json({ error: err.message });
      }
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Landing Pages API error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
