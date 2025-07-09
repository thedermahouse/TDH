"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import Img from "@/components/misc/Img";

export default function LogosView({ section }) {
  const slides = section?.slides || [];

  return (
    <div className="py-5 pb-15">
      <div className="w-full ac">
        <div className="container  px-4  md:px-2 lg:px-0 m-auto">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={800}
            allowTouchMove={false}
            className=""
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 60,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
              1536: {
                slidesPerView: 12,
                spaceBetween: 22,
              },
              1920: {
                slidesPerView: 8,
                spaceBetween: 20,
              },
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="">
                <Img
                  src={slide.image_url}
                  alt={`Logo ${index + 1}`}
                  className=" ascpect-video object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
