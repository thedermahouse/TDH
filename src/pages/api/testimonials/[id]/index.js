import db from "@/lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing ID" });
  }

  const testimonials = await db.testimonials.findFirst({ where: { id: +id } });

  if (req.method === "GET") {
    return res.status(200).json(testimonials);
  } else if (req.method === "DELETE") {
    const deletedTestimonial = await db.testimonials.delete({
      where: { id: +id },
    });
    return res.status(200).json(deletedTestimonial);
  } else if (req.method === "PATCH") {
    const { body } = req;
    body.subServiceId = +body.subServiceId || null;
    const updatedTestimonial = await db.testimonials.update({
      where: { id: +id },
      data: body,
    });
    return res.status(200).json(updatedTestimonial);
  }
}
