"use client";
import Img from "@/components/misc/Img";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

import "swiper/css";
import { useState } from "react";

export default function InstagramBannersSlider({ links }) {
  const [progress, setProgress] = useState(0);
  return (
    <div className="w-full">
      <div className="w-full lg:p-0">
        <Swiper
          onSwiper={(swiper) => {
            swiper.on("progress", function () {
              setProgress(swiper.progress);
            });
          }}
          breakpoints={{
            1366: {
              slidesPerView: 5,
            },
            300: {
              slidesPerView: 2.8,
            },
          }}
          spaceBetween={5}
          loop={true}
          className="w-full"
        >
          {links?.map((item, i) => {
            return (
              <SwiperSlide key={`${item?.image_url}-${i}`}>
                <div className="h-full w-full aspect-square rounded-md overflow-hidden">
                  <div className="rounded-md">
                    <Link
                      href={item.link}
                      target="_blank"
                      aria-label={`${item.name || "Poster"} ${i + 1}`}
                    >
                      <Img
                        src={item.image_url}
                        alt={item.name || "Image"}
                        className="w-full object-contain h-full "
                      />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
