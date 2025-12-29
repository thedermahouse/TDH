"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

export default function ReelsSection() {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    fetch("/api/reels")
      .then((res) => res.json())
      .then((data) => setReels(data.data || []))
      .catch((err) => console.error("Error fetching reels:", err));
  }, []);

  return (
    <section className="w-full bg-black py-10">
      <h2 className="text-center text-white text-3xl font-primary font-medium mb-8">
        Follow Us on Instagram
      </h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        loop
        speed={2500}
        centeredSlides={true}
        spaceBetween={20}
        className=""
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        breakpoints={{
          0: { 
            slidesPerView: 1.5, 
            spaceBetween: 16,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16
          },
          640: { 
            slidesPerView: 2.5, 
            spaceBetween: 20,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24
          },
          1024: { 
            slidesPerView: 3.5, 
            spaceBetween: 24,
            slidesOffsetBefore: 32,
            slidesOffsetAfter: 32
          },
          1440: { 
            slidesPerView: 4.5, 
            spaceBetween: 28,
            slidesOffsetBefore: 32,
            slidesOffsetAfter: 32
          },
        }}
      >
        {reels.map((reel, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <motion.div
              className="relative aspect-[9/16] overflow-hidden rounded-2xl shadow-lg w-full"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <video
                src={reel.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
              />

              <a
                href={reel.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/80 text-blue-600 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-white text-center"
              >
                Follow on Instagram
              </a>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}