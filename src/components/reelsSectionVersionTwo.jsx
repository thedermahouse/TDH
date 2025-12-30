"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

const reels = [
  {
    videoUrl:
      "https://res.cloudinary.com/deoktvl1b/video/upload/v1767079539/FORMA_the_treatment_everyone_falls_in_love_with.A_gentle_yet_powerful_RF_technology_that_tight_ljo3xe.mp4",
  },
  {
    videoUrl:
      "https://res.cloudinary.com/deoktvl1b/video/upload/v1767079496/Top_5_skincare_mistakes_I_see_every_single_day_and_how_to_fix_them_for_good.Let_s_correct_them_pzmjlj.mp4",
  },
  {
    videoUrl:
      "https://res.cloudinary.com/deoktvl1b/video/upload/v1767078595/Melasma_is_not_just_pigmentation_it_s_a_complex_skin_condition_that_needs_expert-led_clinical_wmxwzc.mp4",
  },
  {
    videoUrl:
      "https://res.cloudinary.com/deoktvl1b/video/upload/v1767078534/Smooth_Confident_Wedding-Ready.Your_travel_plans_and_wedding_moments_deserve_skin_that_s_effor_1_u0hiyo.mp4",
  },
  {
    videoUrl:
      "https://res.cloudinary.com/deoktvl1b/video/upload/v1767078428/%EF%B8%8F_This_is_where_luxury_meets_authenticate_Dermatology.Thoughtfully_designed_interiors.Sophisti_eoi7ui.mp4",
  },
  {
    videoUrl:
      "https://res.cloudinary.com/deoktvl1b/video/upload/v1767078356/The_Dermahouse_is_luxury_distilled.An_experience_crafted_for_those_who_seek_the_finest_where_s_cdjj0b.mp4",
  },
  {
    videoUrl:
      "https://res.cloudinary.com/deoktvl1b/video/upload/v1767072342/Video-908_lxhyn1.mp4",
  },
  {
    videoUrl:
      "https://res.cloudinary.com/deoktvl1b/video/upload/v1767072311/Video-400_1_lrabub.mp4",
  },
  {
    videoUrl:
      "https://res.cloudinary.com/deoktvl1b/video/upload/v1767072302/Video-230_1_lqcx3u.mp4",
  },
];

const INSTAGRAM_LINK = "https://www.instagram.com/thedermahouseofficial";

const ReelsSectionVersionTwo = () => {
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
        centeredSlides
        spaceBetween={20}
        className="px-6"
        breakpoints={{
          0: { slidesPerView: 1.5, spaceBetween: 16 },
          640: { slidesPerView: 2.5, spaceBetween: 20 },
          1024: { slidesPerView: 3.5, spaceBetween: 24 },
          1440: { slidesPerView: 4.5, spaceBetween: 28 },
        }}
      >
        {reels.map((reel, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <motion.div
              className="relative aspect-[9/16] overflow-hidden rounded-2xl shadow-lg"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <video
                src={reel.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="object-cover w-full h-full"
              />

              <a
                href={INSTAGRAM_LINK}
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
};

export default ReelsSectionVersionTwo;
