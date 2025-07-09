"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import { useState } from "react";

export default function TestimonialsContent({ testimonials }) {
  const [progress, setProgress] = useState(0);
  return (
    <div>
      <div className="w-full grid lg:grid-cols-2">
        <div className="flex items-start justify-center lg:p-12">
          <div className="text-dh-s">
            <div>
              <h2>Voices of Trust</h2>
            </div>
            <div>
              <h2 className="font-hallengerSerif text-3xl lg:text-5xl font-medium">
                Our Clients
              </h2>
            </div>
            <div>
              <h2 className="font-hallengerSerif text-3xl lg:text-5xl font-medium">
                Our Journey
              </h2>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full border-l border-0.5 border-dh-s">
            <div className="lg:p-12 py-5 px-4 flex items-start">
              <div className="shrink w-12">
                <h2 className="text-5xl text-dh-p translate-y-7">
                  <FaQuoteLeft />
                </h2>
              </div>
              <div className="grow px-5">
                <div className="lg:h-44 h-64">
                  <Swiper
                    slidesPerView={1}
                    loop={true}
                    modules={[Autoplay]}
                    className="h-full"
                    autoplay={{
                      delay: 2000,
                    }}
                    direction="vertical"
                    speed={2000}
                    onProgress={(p) => {
                      setProgress(p.realIndex / testimonials.length);
                    }}
                  >
                    {testimonials?.map((slide, i) => (
                      <SwiperSlide key={slide.id + i}>
                        <div className="pointer-events-none">
                          <div>
                            <div className="mb-1">
                              <h2 className="font-semibold">{slide.author}</h2>
                            </div>
                            <div className="relative">
                              <p
                                className="text-sm text-black overflow-hidden"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 7,
                                  WebkitBoxOrient: "vertical",
                                  maxHeight: "14rem",
                                }}
                              >
                                {slide.content}
                              </p>
                              {slide.content.length > 300 && (
                                <div className="text-right mt-1">
                                  <span className="text-dh-p text-sm"></span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="lg:w-3/5 w-11/12 m-auto lg:py-12">
          <div className="h-[1px] bg-transparent">
            <div
              className="bg-dh-s h-full transition-all duration-1000"
              style={{
                width: `${(progress + 1 / testimonials.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
