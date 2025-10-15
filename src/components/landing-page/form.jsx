"use client";
import React, { useState, useEffect } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    postcode: "",
    treatmentInterest: "",
    startPlan: "",
    callbackTime: "",
    doctorNote: "",
  });

  const [utmParams, setUtmParams] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
  });

  // Capture UTM params from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: urlParams.get("utm_source") || "",
      utm_medium: urlParams.get("utm_medium") || "",
      utm_campaign: urlParams.get("utm_campaign") || "",
      utm_term: urlParams.get("utm_term") || "",
      utm_content: urlParams.get("utm_content") || "",
    });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.split("/").filter(Boolean);
      const pageName = path.length ? path[path.length - 1] : "default";
      setFormData((prev) => ({ ...prev, landingPage: pageName }));
    }
  }, []);

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
        body: JSON.stringify({
          ...formData,
          ...utmParams, // Include UTM params in the request
        }),
      });

      if (res.ok) {
        window.location.href = "/thank-you";
      } else {
        const error = await res.json();
        alert(error.message || "Failed to submit lead");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const fieldClasses =
    "w-full px-4 py-2 border rounded-md bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#ebd3c7] text-black rounded-md shadow-lg p-6 space-y-4 max-w-md mx-auto"
    >
      <div className="text-left mb-4">
        <h2 className="text-xl font-bold font-primary text-gray-900">
          Book Appointment
        </h2>
        <p className="text-sm text-gray-700">
          Fill out the form and we’ll confirm your appointment date.
        </p>
      </div>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        className={fieldClasses}
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className={fieldClasses}
        required
      />

      <input
        type="number"
        name="postcode"
        placeholder="Postcode"
        value={formData.postcode}
        onChange={handleChange}
        className={fieldClasses}
        required
      />

      <select
        name="treatmentInterest"
        value={formData.treatmentInterest}
        onChange={handleChange}
        className={fieldClasses}
        required
      >
        <option value="">Which treatment are you interested in?</option>
        <option value="Skin Treatment">Skin Treatment</option>
        <option value="Hair Treatment">Hair Treatment</option>
      </select>

      <select
        name="startPlan"
        value={formData.startPlan}
        onChange={handleChange}
        className={fieldClasses}
        required
      >
        <option value="">When do you plan to get started?</option>
        <option value="Immediately">Immediately</option>
        <option value="Within 1 Week">Within 1 Week</option>
        <option value="Within 1 Month">Within 1 Month</option>
        <option value="Just Exploring">Just Exploring</option>
      </select>

      <select
        name="callbackTime"
        value={formData.callbackTime}
        onChange={handleChange}
        className={fieldClasses}
        required
      >
        <option value="">Preferred time for a callback</option>
        <option value="11AM – 1 PM">11AM – 1 PM</option>
        <option value="1 PM – 4 PM">1 PM – 4 PM</option>
        <option value="4 PM – 8 PM">4 PM – 8 PM</option>
      </select>

      <textarea
        name="doctorNote"
        placeholder="Anything you’d like the doctor to know?"
        value={formData.doctorNote}
        onChange={handleChange}
        rows={3}
        className={fieldClasses}
      />

      <button
        type="submit"
        className="w-full py-3 bg-[#F8F8F8] text-[#000] font-medium rounded-md hover:bg-[#9D9896]/80 transition"
      >
        Submit
      </button>
    </form>
  );
}
