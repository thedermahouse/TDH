import db from "@/lib/db";
import React from "react";
import TestimonialsContent from "./TestimonialsContent";

const get_testimonials = (ssId = null) =>
  db.Testimonials.findMany({
    where: {
      subServiceId: ssId,
    },
    orderBy: {
      priority: "asc",
    },
  });

export default async function TestimonialsView({ ssid = null }) {
  const testimonials = await get_testimonials(ssid);
  if (!testimonials || testimonials?.length <= 0) {
    return null;
  }
  return (
    <div className="bg-white w-full lg:py-0 py-2 ">
      <div className="w-full">
        <div className="container m-auto">
          <div className="w-full">
            <TestimonialsContent testimonials={testimonials} />
          </div>
        </div>
      </div>
    </div>
  );
}
