import db from "@/lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const testimonial = await db.landingTestimonial.findUnique({
        where: { id: Number(id) },
      });
      return res.json(testimonial);
    }

    if (req.method === "PATCH") {
      const { content, author, image, date, priority, landingPageId } =
        req.body;
      const updated = await db.landingTestimonial.update({
        where: { id: Number(id) },
        data: {
          content,
          author,
          image,
          date,
          priority,
          landingPageId: landingPageId || null,
        },
      });
      return res.json(updated);
    }

    if (req.method === "DELETE") {
      await db.landingTestimonial.delete({
        where: { id: Number(id) },
      });
      return res.json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
 