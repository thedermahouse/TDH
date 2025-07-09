import db from "@/lib/db";

export default async function handler(req, res) {
  const { method } = req;
  const testimonials = await db.testimonials.findMany();

  if (method === "GET") {
    return res.status(200).json({ success: true, data: testimonials });
  } else if (method === "PUT") {
    const { body: testimonialData } = req;

    const { length: next_priority_without_service_id } = testimonials.filter(
      ({ subServiceId }) => !subServiceId
    );

    testimonialData.subServiceId = testimonialData.subServiceId
      ? +testimonialData.subServiceId
      : undefined;

    const { length: next_priority_with_service_id } = testimonials.filter(
      ({ subServiceId }) => subServiceId === testimonialData.subServiceId
    );

    testimonialData.priority = testimonialData.subServiceId
      ? next_priority_with_service_id
      : next_priority_without_service_id;

    console.log(testimonialData);

    const updatedTestimonial = await db.testimonials.create({
      data: testimonialData,
    });
    return res.status(200).json({ success: true, data: updatedTestimonial });
  }
}
