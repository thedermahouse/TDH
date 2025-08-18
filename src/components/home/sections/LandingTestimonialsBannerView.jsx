"use client";
import { useEffect, useState } from "react";
import LandingTestimonialsBanner from "./LandingTestimonialsBanner";

export default function LandingTestimonialsBannerView({ landingPageId }) {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const url = `/api/landing-testimonials${
      landingPageId ? `?landingPageId=${landingPageId}` : ""
    }`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTestimonials(data.data || []))
      .catch((err) => console.error("Fetch testimonials error:", err));
  }, [landingPageId]);

  if (!testimonials.length) return null;

  return (
    <div className="bg-white w-full lg:py-0 py-2 ">
      <div className="w-full">
        <div className="container m-auto">
          <div className="w-full">
            <LandingTestimonialsBanner testimonials={testimonials} />
          </div>
        </div>
      </div>
    </div>
  );
}
