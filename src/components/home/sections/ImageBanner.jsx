"use client";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

export default function ImageBannerView({ section }) {
  const matches = useMediaQuery("(min-width: 768px)", {
    initializeWithValue: false,
  });

  return (
    <header
      className="relative object-cover bg-cover py-3 bg-no-repeat min-h-[45vh] ac bg-center"
      style={{
        backgroundImage: matches
          ? `url('${section?.imageURL}')`
          : `url('${section?.imageURLMobile || section?.imageURL}')`,
      }}
    >
      <div className="m-auto h-full flex items-center justify-between px-4 lg:px-0">
        <div className="text-center z-10 m-auto left-0 right-0 max-w-screen-md text-white">
          <div>
            <h2 className="font-primary text-3xl lg:text-5xl mb-4">
              {section?.title}
            </h2>
            <h2 className="font-normal font-montserrat text-sm mt-6 m-auto">
              {section?.descText}
            </h2>
          </div>
          <div className="mt-6">
            <Link
              href={`${section?.buttonURL}`}
              className="dh-sm-btn"
              aria-label="Know More"
            >
              Know More
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
