"use client";
import React from "react";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

export default function HeaderContent({ section }) {
  const matches = useMediaQuery("(max-width: 1000px)", {
    initializeWithValue: false,
  });

  const alignment = "left";

  const positionForWrapper = matches ? "top-12" : "top-1/2 lg:top-32";

  const positionForFlexDiv = matches
    ? "flex flex-col items-start justify-start"
    : `flex flex-col ${
        alignment === "right" ? "items-end" : "items-start"
      } justify-center`;

  const titleClass = matches ? "max-w-64" : "max-w-screen-sm";

  const textAlignment = matches
    ? ""
    : alignment === "right"
    ? "text-end"
    : "text-start";

  return (
    <div
      className={`absolute ${positionForWrapper} left-0 right-0 bottom-10 z-10 p-5  lg:pt-0  pointer-events-none`}
    >
      <div className={`container m-auto h-full ${positionForFlexDiv}`}>
        <div className={textAlignment}>
          <h2 className="text-xl font-light font-primary text-black mb-3">
            {section?.subtitle}
          </h2>
        </div>
        <div className={textAlignment}>
          <h1
            className={`font-light font-primary lg:text-5xl 2xl:text-6xl text-3xl ${titleClass} text-black`}
          >
            {section?.title}
          </h1>
        </div>
        <div className={`mt-5 lg:mt-12 items-left`}>
          <div>
            <Link
              href={section?.buttonLink}
              className="dh-sm-btn pointer-events-auto "
            >
              {section?.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
