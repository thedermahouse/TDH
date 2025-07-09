"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import { useMediaQuery } from "usehooks-ts";

import "swiper/css";
export default function HeaderSlider({ section }) {
  const matches = useMediaQuery("(min-width: 1024px)", {
    initializeWithValue: false,
  });
  return (
    <Swiper
      slidesPerView={1}
      loop={true}
      modules={[Pagination, Autoplay]}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2000,
      }}
      speed={2000}
      className="lg:h-full"
    >
      {section?.slides?.map((slide, i) => {
        return (
          <SwiperSlide key={slide.image_url + i}>
            <div className="swiper-slide">
              <div
                style={{
                  backgroundImage: matches
                    ? `url(${slide.image_url})`
                    : `url(${slide.image_url_mobile || slide.image_url})`,
                }}
                skeleton_class="lg:h-full"
                className="lg:min-h-full w-full object-cover pointer-events-none lg:aspect-[113/54] aspect-[1/1.5] bg-cover bg-center bg-dh-new "
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
