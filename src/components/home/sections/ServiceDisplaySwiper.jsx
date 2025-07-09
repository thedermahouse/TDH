"use client";
import Img from "@/components/misc/Img";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useRef } from "react";
import Link from "next/link";

export default function ServiceDisplaySwiper({ subServices, serviceName }) {
  const [progress, setProgress] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef(null);

  const handlePrevClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="w-full relative ">
      <style jsx>{`
        .swiper-button-prev,
        .swiper-button-next {
          width: 36px;
          height: 36px;
          background-color: rgba(
            209,
            213,
            219,
            0.5
          ); /* Semi-transparent gray-300 */
          color: var(--dh-p);
          border-radius: 50%;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 20; /* Ensure buttons are above other elements */
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background-color: rgba(209, 213, 219, 1); /* Fully opaque gray */
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 12px;
        }

        .swiper-button-prev.swiper-button-disabled,
        .swiper-button-next.swiper-button-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .swiper-button-prev {
          left: 5px;
        }
        .swiper-button-next {
          right: 5px;
        }

        /* Hide buttons for screens smaller than 600px */
        @media (max-width: 599px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none;
          }
        }
      `}</style>

      <div className="w-full ">
        <Swiper
          modules={[Navigation]}
          navigation={false} // Disable default navigation
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.on("progress", function () {
              setProgress(swiper.progress);
            });
            swiper.on("slideChange", function () {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            });
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            400: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            600: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4.4,
              spaceBetween: 20,
            },
            1400: {
              slidesPerView: 2.7,
              spaceBetween: 20,
            },
          }}
          className="w-full"
        >
          {subServices
            ?.sort((a, b) => a.priority - b.priority)
            .map((item) => (
              <SwiperSlide key={item?.id}>
                <Link
                  href={`/services/${serviceName}/sub-service/${item.name}/`.replaceAll(
                    " ",
                    "-"
                  )}
                >
                  <div className="h-full w-full">
                    <div>
                      <Img
                        src={item.servicePageImageURL}
                        alt={item.name || "image"}
                        skeleton_class="aspect-[517/700]"
                        className="w-full object-cover h-full rounded-md"
                      />
                    </div>
                    <div className="mt-3 w-full max-w-[120px] sm:max-w-[160px] md:max-w-[200px] lg:max-w-[280px]">
                      <span className="text-white font-hallengerSerif text-sm sm:text-base md:text-lg lg:text-xl whitespace-nowrap overflow-hidden text-ellipsis block">
                        {item?.name?.trim() || "Unnamed"}
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <button
        onClick={handlePrevClick}
        className={`swiper-button-prev absolute top-10 left-0 transform -translate-y-[53px] z-10 rounded-full !text-gray-800 ${
          isBeginning ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        disabled={isBeginning}
      ></button>
      <button
        onClick={handleNextClick}
        className={`swiper-button-next absolute top-10 right-0 transform -translate-y-[53px] z-10 rounded-full !text-gray-800 ${
          isEnd ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        disabled={isEnd}
      ></button>

      <div className="w-full my-6">
        <progress
          className="progress bg-progress h-0.5 w-full"
          value={progress + 0.36}
        />
      </div>
    </div>
  );
}
