// pages/api/landing-testimonials/index.js
import db from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const where = req.query.landingPageId
        ? { landingPageId: Number(req.query.landingPageId) }
        : {};
      const testimonials = await db.landingTestimonial.findMany({
        where,
        orderBy: { priority: "asc" },
      });
      return res.json({ data: testimonials });
    }

    if (req.method === "PUT") {
      const { content, author, image, date, priority, landingPageId } =
        req.body;
      const created = await db.landingTestimonial.create({
        data: {
          content,
          author,
          image,
          date,
          priority: priority ?? 0,
          landingPageId: landingPageId ? Number(landingPageId) : null,
        },
      });
      return res.status(201).json(created);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Testimonials API error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
