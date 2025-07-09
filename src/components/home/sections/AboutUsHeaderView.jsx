"use client";

import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Img from "@/components/misc/Img";
import { CiPlay1 } from "react-icons/ci";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

export default function AboutUsHeaderView({ section }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const getYoutubeEmbedUrl = (url) => {
    const videoId = url?.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
    )?.[1];
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1&showinfo=0`
      : url;
  };

  // Close modal when pressing escape keys
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when modal is opend
  useEffect(() => {
    if (selectedVideo !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedVideo]);

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 2,
  };

  return (
    <>
      <div className="w-full mb-3">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-0 lg:mb-5 text-center">
            <h1 className="text-3xl sm:text-2xl md:text-5xl lg:text-6xl font-primary lg:pt-4">
              {section?.mainTitle}
            </h1>
            <p className="text-xs sm:text-sm lg:text-3xl font-normal py-3 sm:py-5 px-4 sm:px-8 md:px-16 lg:px-30 max-w-4xl mx-auto font-">
              {section?.mainDescription}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-start">
            <div className="w-full lg:w-1/2">
              {section?.content?.map((c, i) => (
                <div
                  key={i}
                  className="pt-6 lg:pt-10 text-center  lg:text-start"
                >
                  <h1 className="text-xl sm:text-2xl font-primary">
                    {c?.title}
                  </h1>
                  <p className="text-xs sm:text-sm pt-2 ">{c?.description}</p>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-1/2 relative">
              {/* Previous Button */}
              <div
                ref={prevBtnRef}
                className="custom-swiper-button-prev absolute top-1/2 -left-4 sm:-left-5 md:-left-6 lg:-left-12 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-300 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md hover:bg-gray-100"
              >
                <RiArrowLeftSLine className="text-gray-800 text-sm sm:text-base" />
              </div>

              {/* Swiper Container */}
              <div className="w-full max-w-md mx-auto lg:w-full lg:max-w-none">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: ".custom-swiper-button-prev",
                    nextEl: ".custom-swiper-button-next",
                  }}
                  className="rounded-2xl sm:rounded-3xl lg:rounded-4xl"
                >
                  {section?.media?.map((c, i) => (
                    <SwiperSlide key={i} className="aspect-square">
                      {c?.type === "image" && (
                        <Img
                          src={c?.url}
                          className="w-full h-full object-cover rounded-2xl sm:rounded-3xl lg:rounded-4xl"
                          alt={`Image ${i + 1}`}
                        />
                      )}
                      {c?.type === "video" && (
                        <div className="relative w-full h-full">
                          <Img
                            src={`https://img.youtube.com/vi/${
                              c?.url?.match(
                                /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
                              )?.[1]
                            }/maxresdefault.jpg`}
                            className="w-full h-full object-cover rounded-2xl sm:rounded-3xl lg:rounded-4xl"
                            alt={`Video thumbnail ${i + 1}`}
                          />
                          <div
                            style={overlayStyle}
                            onClick={() => setSelectedVideo(c?.url)}
                            className="rounded-2xl sm:rounded-3xl lg:rounded-4xl"
                          >
                            <div className="bg-white bg-opacity-20 rounded-full p-2 sm:p-3 md:p-4 hover:bg-opacity-40 transition-opacity">
                              <CiPlay1 className="text-dh-p text-2xl sm:text-3xl opacity-70 hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </div>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Next Button */}
              <div
                ref={nextBtnRef}
                className="custom-swiper-button-next absolute top-1/2 -right-4 sm:-right-5 md:-right-6 lg:-right-12 transform -translate-y-1/2 z-10 cursor-pointer bg-gray-300 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md hover:bg-gray-100"
              >
                <RiArrowRightSLine className="text-gray-800 text-sm sm:text-base" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 "
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative bg-dh-p rounded-lg p-1 max-w-4xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 btn btn-md  bg-white hover:text-dh-s border-0 text-black p-2 rounded-full z-10 cursor-pointer"
              onClick={() => setSelectedVideo(null)}
            >
              <IoClose size={24} />
            </button>
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={getYoutubeEmbedUrl(selectedVideo)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
