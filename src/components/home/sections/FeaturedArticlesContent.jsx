"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function FeaturedArticlesContent({ articles }) {
  return (
    <section className="py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold">Featured Articles</h2>
        <p className="text-gray-500 mt-2">
          Expert insights and skincare articles from our dermatologists.
        </p>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {articles.map((a) => (
          <SwiperSlide key={a.id}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <a href={a.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-full h-56 object-cover"
                />
              </a>
              <div className="p-4">
                <p className="text-gray-400 text-sm">{a.date}</p>
                <h3 className="font-semibold mt-2">
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600"
                  >
                    {a.title}
                  </a>
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
