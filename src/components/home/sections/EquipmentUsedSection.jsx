import Img from "@/components/misc/Img";
import React from "react";

const EquipmentUsedSection = ({ section }) => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full justify-content-center">
        {section?.datas?.map((equ, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-md "
          >
            <Img
              src={equ.imageURL}
              alt={equ.title || "Equipment Image"}
              className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-[#EBD3C7]/10 via-[#EBD3C7]/50 to-[#EBD3C7]/90 pointer-events-none sm:pointer-events-auto">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-black transform translate-y-full group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2 text-center">
                  {equ.heading}
                </h3>
                <p className="text-xs sm:text-sm line-clamp-3">
                  {equ.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipmentUsedSection;