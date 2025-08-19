"use client";

import React, { useState } from "react";

export default function LeadForm({ landingPage = "default" }) {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, landingPage }),
      });

      if (res.ok) {
        alert("Lead submitted successfully!");
        setFormData({
          fullName: "",
          mobile: "",
          email: "",
          location: "",
          message: "",
        });
      } else {
        const error = await res.json();
        alert(error.message || "Failed to submit lead");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#ebd3c7] text-black rounded-md shadow-lg p-6 space-y-4 max-w-md mx-auto"
    >
      {/* 🔹 Title + subtitle */}
      <div className="text-left mb-4">
        <h2 className="text-xl font-bold font-primary text-gray-900">
          Get in Touch
        </h2>
        <p className="text-sm text-gray-700">
          Fill out the form and we’ll reach out to you shortly.
        </p>
      </div>

      <input type="hidden" name="landingPage" value={landingPage} />

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded-sm border bg-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded-sm border border-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded-sm border border-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 rounded-sm border border-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        rows={3}
        className="w-full px-4 py-2 rounded-sm border border-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <button
        type="submit"
        className="w-full py-3 bg-[#F8F8F8] text-[#000] rounded-sm hover:bg-[#9D9896]/80  transition"
      >
        Submit
      </button>
    </form>
  );
}
