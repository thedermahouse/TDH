import React from "react";
import ContactHeader from "./ContactHeader";
import { LiaPhoneSolid } from "react-icons/lia";
import { CiMail } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import getPart from "@/helpers/getPart";
import Link from "next/link";

export default async function EnquiryDetails() {
  const { content } = await getPart("CONTACT_US");

  return (
    <div className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <ContactHeader
          title="Let Us Connect"
          description="Have a question or want book a consultation? Get in touch with us today, and our team will help you find the perfect skincare solution"
          fontSize="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          descFontSize="text-base sm:text-lg max-w-3xl mx-auto"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
        {/* Changed to lg:grid-cols-3 to switch to row layout at exactly 1024px */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-0">
          {/* Phone Section */}
          <div className="bg-white p-6 lg:border-r lg:border-gray-200">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-[#B38061] rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
                  <LiaPhoneSolid />
                </span>
              </div>
              <span className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-hallengerSerif text-center mb-2">
                Call us directly on
              </span>
              <div className="flex flex-col items-center gap-1">
                {content.contactPhone.map((item, i) => (
                  <Link
                    key={i}
                    className="text-base sm:text-lg text-gray-700 hover:text-[#B38061] transition-colors duration-300"
                    href={`tel:${item.phone}`}
                  >
                    {item.phone}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Email Section */}
          <div className="bg-white p-6 lg:border-r lg:border-gray-200">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-[#B38061] rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-white">
                  <CiMail />
                </span>
              </div>
              <span className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-hallengerSerif text-center mb-2">
                Write Email
              </span>
              <div className="flex flex-col items-center gap-1">
                {content?.contactEmail.map((item, i) => (
                  <Link
                    key={i}
                    className="text-base sm:text-lg text-gray-700 hover:text-[#B38061] transition-colors duration-300 break-all"
                    href={`mailto:${item.email}`}
                  >
                    {item.email}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Address Section - No border on the last card */}
          <div className="bg-white p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-[#B38061] rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-white">
                  <SlLocationPin />
                </span>
              </div>
              <span className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-hallengerSerif text-center mb-2">
                Address
              </span>
              <p className="text-base sm:text-lg text-center text-gray-700 max-w-xs">
                {content.contactAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
