"use client";
import React, { useEffect, useRef, useState } from "react";
import ContactHeader from "./ContactHeader";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

export default function ContactForm({ enquiry_from }) {
  const formRef = useRef(null);
  const put = async (data) => {
    try {
      const res = await axios.put("/api/enquiry", data);
      return res;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if (enquiry_from) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [enquiry_from]);

 const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  enquiry_from: "",
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_term: "",
  utm_content: "",
});

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get("utm_source") || "";
  const utm_medium = params.get("utm_medium") || "";
  const utm_campaign = params.get("utm_campaign") || "";
  const utm_term = params.get("utm_term") || "";
  const utm_content = params.get("utm_content") || "";

  setFormData((prev) => ({
    ...prev,
    enquiry_from: enquiry_from || "",
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
  }));
}, [enquiry_from]);


  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      formData.enquiry_from = enquiry_from;
      const res = await put(formData);

      if (res.status === 200 || res.status === 201) {
        setSuccessMessage("Sent Successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          enquiry_from: "",
        });
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error) {
      setErrorMessage("Failed to send message. Please try again.");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#EBD3C7]">
      <div
        className="container mx-auto px-4 flex flex-col gap-10 md:gap-20 py-10 md:py-20"
        ref={formRef}
      >
        <ContactHeader
          title="Get in touch with us"
          description="Ready to enhance your skin? Get dermatology consultation with Dr Manu S. Walia today for personalized treatments and expert care"
          fontSize="text-2xl md:text-5xl"
          descFontSize="text-base md:text-lg max-w-xl"
        />

        <form
          className="w-full mx-auto p-4 flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 lg:gap-x-12">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="font-medium">
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="p-4 md:p-10 rounded-sm input input-bordered w-full"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="font-medium">
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="p-4 md:p-10 rounded-sm input input-bordered w-full"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="p-4 md:p-10 rounded-sm input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-medium">
                Mobile Number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone"
                className="p-4 md:p-10 rounded-sm input input-bordered w-full"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
              <label htmlFor="message" className="font-medium">
                message*
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="message"
                className="p-4 md:p-10 rounded-sm input input-bordered w-full h-24 md:h-32"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col items-center mt-4">
            <button type="submit" className="dh-sm-btn" disabled={isSubmitting}>
              {successMessage ? (
                <>
                  <span>{successMessage}</span>
                  <FaCheck className="text-lg" />
                </>
              ) : isSubmitting ? (
                "Sending..."
              ) : (
                "Send message"
              )}
            </button>
            <div className="relative h-6 mt-2 w-full text-center">
              {errorMessage && (
                <span className="absolute left-1/2 transform -translate-x-1/2 text-red-600 whitespace-nowrap ">
                  {errorMessage}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
