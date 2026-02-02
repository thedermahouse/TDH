"use client";

import Img from "@/components/misc/Img";
import { useState, useEffect, useRef } from "react";

const Booking = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const bookingOptions = [
    {
      title: "Book a Consultation",
      url: "https://thedermahouse.com/contact-us",
    },
    // {
    //   title: "Book a Consultation",
    //   url: "https://booking.thedermahouse.com/webstoreNew/services/a546bd4e-b550-4b6f-a0b0-d645d925bde5",
    // },
    // {
    //   title: "Book a Service",
    //   url: "https://booking.thedermahouse.com/webstoreNew/services/a546bd4e-b550-4b6f-a0b0-d645d925bde5",
    // },
    // {
    //   title: "Buy a Gift Card",
    //   url: "https://booking.thedermahouse.com/webstoreNew/giftcards/a546bd4e-b550-4b6f-a0b0-d645d925bde5",
    // },
    // {
    //   title: "Buy a Membership",
    //   url: "https://booking.thedermahouse.com/webstoreNew/services/a546bd4e-b550-4b6f-a0b0-d645d925bde5",
    // },
  ];

  return (
    <div className="fixed bottom-15 lg:bottom-32 right-5 z-10" ref={menuRef}>
      {/* Button */}
      <button
        onClick={handleToggleMenu}
        className=" h-10 pr-3 lg:h-14 lg:pr-4 rounded-full bg-dh-newsecondory text-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl flex items-center "
      >
        <p className=" min-w-23 text-xs lg:text-sm font-semibold pl-4 lg:pl-0 lg:ml-6">
          BOOK NOW
        </p>

        <div className="w-6 h-6 lg:w-10 lg:h-10 ml-1 lg:ml-2">
          <Img src="/api/files/573" />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute bottom-full right-0 mb-2 w-56 bg-dh-p rounded-lg shadow-xl drop-shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-1">
          {bookingOptions.map((option, index) => (
            <a
              key={index}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-3 text-gray-200 hover:bg-dh-newsecondory transition-colors rounded-md cursor-pointer"
            >
              {option.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;
