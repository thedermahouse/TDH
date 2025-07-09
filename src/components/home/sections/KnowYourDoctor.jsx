"use client";

import Img from "@/components/misc/Img";
import useWindowDimensions from "@/hooks/useWindowDimentions";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function KnowYourDoctorView({ section }) {
  console.log(section);
  const { width } = useWindowDimensions();
  const [isExpanded, setIsExpanded] = useState(false);

  const isMobileOrTablet = width <= 600;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`ac lg:mb-12 px-4 lg:px-0 pt-4 lg:pt-24 pb-12 `}>
      <div className="container">
        <div className="flex lg:flex-nowrap flex-wrap ">
          <div className="w-full lg:w-2/4 h-fit ">
            <Img
              src={section.doctorImageURL}
              alt={"Doctor"}
              className=" aspect-[4/3.5]"
            />
            <div className="text-start text-black bg-gray-100 py-6 pl-7 ">
              <p className="font-bold  text-lg lg:text-2xl ">
                {/* {section?.doctorName ? section?.doctorName : ""} */}
                Dr. Manu Singh Walia
              </p>
              <div className="text-black/70">
                <p className="text-xs font-medium lg:text-[16px]  pt-1">
                  MD Dermatology
                </p>
                <p className="text-xs  font-medium lg:text-[16px]  ">
                  Founder & Medical Director
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-9/12">
            <div className="lg:px-12 lg:py-0 pt-4 lg:pt-0 ">
              <div>
                <div className="mb-3 lg:mb-6">
                  <h2 className="font-hallengerSerif text-3xl md:text-5xl text-dh-p ">
                    Know Your Doctor
                  </h2>
                </div>
              </div>
              {isMobileOrTablet ? (
                <div className="card bg-base-100 shadow-sm">
                  <div className="card-body p-4">
                    <div
                      className={`transition-all duration-300 ${
                        isExpanded ? "" : "max-h-96 overflow-hidden relative"
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: section?.doctorContent,
                        }}
                      ></div>
                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-base-100 to-transparent"></div>
                      )}
                    </div>
                    <div className="card-actions justify-center mt-4 pb-4">
                      <button
                        onClick={handleToggle}
                        className="btn  btn-outline btn-sm gap-2"
                      >
                        {isExpanded ? (
                          <>
                            <FaChevronUp className="h-3 w-3" />
                            Read Less
                          </>
                        ) : (
                          <>
                            <FaChevronDown className="h-3 w-3" />
                            Read More
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{ __html: section?.doctorContent }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
