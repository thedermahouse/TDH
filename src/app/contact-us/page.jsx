import React from "react";
import ContactForm from "./ContactForm";
import EnquiryDetails from "./EnquiryDetails";
import InstagramBannersView from "@/components/home/sections/InstagramBanners";
import getPart from "@/helpers/getPart";

export const generateMetadata = async () => {
  const { content } = await getPart("CONTACT_US");
  const { seo } = content;
  return {
    title:
      seo?.metaTitle ||
      "Dermatology consultation in Santacruz | Dr. Manu S. Walia",
    description:
      seo?.metaDescription ||
      "Dermatology consultation in Santacruz by Dr. Manu S. Walia for expert guidance, diagnosis, and treatment plans for skin and hair concerns.",
    images: [seo?.metaImage],
    alternates: {
      canonical: "https://thedermahouse.com/contact-us",
    },
  };
};
export default async function page({ searchParams }) {
  const { enquiry_from } = await searchParams;
  return (
    <div>
      <section className="min-h-screen lg:mt-56 ">
        <ContactForm enquiry_from={enquiry_from} />
        <EnquiryDetails />
        <div className="py-10 bg-[#EBD3C7]">
          <InstagramBannersView color="bg-[#EBD3C7]" />
        </div>
      </section>
    </div>
  );
}
