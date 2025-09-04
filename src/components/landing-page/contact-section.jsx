"use client";

import React from "react";
import LeadForm from "./form";

const ContactSection = () => {
  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Content */}
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-bold font-primary text-[#1e2939]">
            Healthy Skin, Confident You
          </h2>
          <p className="mt-4 text-gray-600 font-montserrat text-lg leading-relaxed">
            Looking for expert skin care? Our dermatology specialists are here
            to help you achieve clear, radiant, and healthy skin. Whether it’s
            acne, pigmentation, hair loss, or advanced skin treatments, we
            provide personalized solutions tailored to your needs.
          </p>
          <ul className="mt-6 space-y-3 font-montserrat text-gray-700">
            <li>✨ Advanced Acne & Scar Treatments</li>
            <li>✨ Anti-Aging & Skin Rejuvenation</li>
            <li>✨ Laser Hair Removal & Skin Brightening</li>
            {/* <li>✨ Customized Skin & Hair Care Plans</li> */}
          </ul>
        </div>

        {/* Right: Form */}

        <LeadForm landingPage="dermatology-contact" />
      </div>
    </section>
  );
};

export default ContactSection;
