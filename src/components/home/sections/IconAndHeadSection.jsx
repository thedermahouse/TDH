import React from "react";
import { icons_elements } from "./IconSection";

export default function IconAndHeadSection({ section }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 ">
      <div className="py-2 lg:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {section?.icons?.map((item, i) => {
            const IconComponent =
              icons_elements[item?.iconType]?.i || (() => <span>No Icon</span>);

            const showBorder =
              (i + 1) % 4 !== 0 && i !== section.icons.length - 1;

            return (
              <div
                key={i}
                className="bg-white flex flex-col justify-center h-48 sm:h-56 md:h-64 lg:h-72 w-full"
              >
                <div
                  className={`w-full flex flex-col gap-3 justify-center items-center p-4 ${
                    showBorder ? "md:border-r-2 md:border-[#F36F27]" : ""
                  }`}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center">
                    <IconComponent className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#F36F27]" />
                  </div>
                  <span className="text-sm sm:text-lg md:text-md lg:text-xl xl:text-2xl font-hallengerSerif text-center text-[#F36F27]">
                    {item.heading}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
