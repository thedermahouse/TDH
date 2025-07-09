import Link from "next/link";
import React from "react";

export default function GallerySection({ section }) {
  console.log(section, "section");
  const sectionDatas = section?.datas;

  const firstData = sectionDatas?.[0];
  const secondData = sectionDatas?.[1];
  const thirdData = sectionDatas?.[2];
  const fourthData = sectionDatas?.[3];

  return (
    <div className="container m-auto py-24">
      <div className="flex flex-col ">
        <div className="w-full flex justify-between order-2 cursor-default lg:flex-nowrap flex-wrap lg:px-0 px-4">
          {firstData && (
            <div className="w-full lg:w-5/12 flex relative group h-96">
              <div className="w-1/2 z-10">
                <div className="relative overflow-hidden h-full">
                  <img
                    src={firstData?.beforImg}
                    alt="Before Image"
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105 h-full"
                  />
                  <div className="absolute left-0 right-0 bottom-10 ac z-10 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h1 className="font-hallengerSerif text-xl md:text-2xl lg:text-3xl text-white text-center">
                      Before
                    </h1>
                  </div>
                </div>
              </div>

              <div className="transition-all duration-300 w-1/2 lg:-translate-x-16 lg:translate-y-16 lg:group-hover:translate-x-5 group-hover:translate-y-0 z-20">
                <div className="relative overflow-hidden h-full">
                  <img
                    src={firstData?.afterImg}
                    alt="After Image"
                    className="w-full object-cover transition-all duration-300 group-hover:scale-105 h-full"
                  />
                  <div className="absolute left-0 right-0 bottom-10 ac z-10 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h1 className="font-hallengerSerif text-xl md:text-2xl lg:text-3xl text-white text-center">
                      After
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}

          {secondData && (
            <div className="w-full lg:w-5/12 flex relative group h-96">
              <div className="w-1/2 transition-all duration-300 lg:translate-x-16 lg:translate-y-16 lg:group-hover:-translate-x-5 group-hover:translate-y-0 z-20">
                <div className="relative overflow-hidden h-full">
                  <img
                    src={secondData?.beforImg}
                    alt="Before Image"
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105 h-full"
                  />
                  <div className="absolute left-0 right-0 bottom-10 ac z-10 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h1 className="font-hallengerSerif text-xl md:text-2xl lg:text-3xl text-white text-center">
                      Before
                    </h1>
                  </div>
                </div>
              </div>

              <div className="w-1/2 z-10">
                <div className="relative overflow-hidden h-full">
                  <img
                    src={secondData?.afterImg}
                    alt="After Image"
                    className="w-full object-cover transition-all duration-300 group-hover:scale-105 h-full"
                  />
                  <div className="absolute left-0 right-0 bottom-10 ac z-10 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h1 className="font-hallengerSerif text-xl md:text-2xl lg:text-3xl text-white text-center">
                      After
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="order-1 lg:order-2 lg:py-12">
          <div className="container mx-auto ac py-20">
            <div className="text-center py-2 lg:w-1/2 m-auto flex flex-col gap-3">
              <h1 className="font-hallengerSerif text-black text-6xl">
                {section?.sectionTitle}
              </h1>
              <p className="whitespace-pre-wrap px-4 lg:px-0 text-justify lg:text-center ">
                {section?.sectionDescription}
              </p>
              <div>
                <Link
                  href={"/contact-us"}
                  className="btn btn-md rounded-none bg-[#F36F27] text-white"
                >
                  Know more
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between order-3 lg:flex-nowrap flex-wrap px-4 lg:px-0">
          {thirdData && (
            <div className="w-full lg:w-5/12 flex relative group h-96">
              <div className="w-1/2 z-10">
                <div className="relative overflow-hidden h-full">
                  <img
                    src={thirdData?.beforImg}
                    alt="Before Image"
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105 h-full"
                  />
                  <div className="absolute left-0 right-0 bottom-10 ac z-10 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h1 className="font-hallengerSerif text-xl md:text-2xl lg:text-3xl text-white text-center">
                      Before
                    </h1>
                  </div>
                </div>
              </div>

              <div className="transition-all duration-300 w-1/2 lg:-translate-x-16 lg:-translate-y-16 lg:group-hover:translate-x-5 group-hover:translate-y-0 z-20">
                <div className="relative overflow-hidden h-full">
                  <img
                    src={thirdData?.afterImg}
                    alt="After Image"
                    className="w-full object-cover transition-all duration-300 group-hover:scale-105 h-full"
                  />
                  <div className="absolute left-0 right-0 bottom-10 ac z-10 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h1 className="font-hallengerSerif text-xl md:text-2xl lg:text-3xl text-white text-center">
                      After
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}

          {fourthData && (
            <div className="w-full lg:w-5/12 flex relative group h-96">
              <div className="w-1/2 transition-all duration-300 lg:translate-x-16 lg:-translate-y-16 lg:group-hover:-translate-x-5 group-hover:translate-y-0 z-20">
                <div className="relative overflow-hidden h-full">
                  <img
                    src={fourthData?.beforImg}
                    alt="Before Image"
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105 h-full"
                  />
                  <div className="absolute left-0 right-0 bottom-10 ac z-10 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h1 className="font-hallengerSerif text-xl md:text-2xl lg:text-3xl text-white text-center">
                      Before
                    </h1>
                  </div>
                </div>
              </div>

              <div className="w-1/2 z-10">
                <div className="relative overflow-hidden h-full">
                  <img
                    src={fourthData?.afterImg}
                    alt="After Image"
                    className="w-full object-cover transition-all duration-300 group-hover:scale-105 h-full"
                  />
                  <div className="absolute left-0 right-0 bottom-10 ac z-10 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h1 className="font-hallengerSerif text-xl md:text-2xl lg:text-3xl text-white text-center">
                      After
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
