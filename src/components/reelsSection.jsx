"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ReelsSection() {
  const [reels, setReels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/api/reels")
      .then((res) => res.json())
      .then((data) => setReels(data.data || []))
      .catch((err) => console.error("Error fetching reels:", err));
  }, []);

  useEffect(() => {
    if (reels.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reels.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [reels.length]);

  const getVisibleReels = () => {
    if (reels.length === 0) return [];
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + reels.length) % reels.length;
      visible.push({ ...reels[index], position: i });
    }
    return visible;
  };

  if (reels.length === 0) {
    return (
      <section className="w-full bg-gradient-to-b from-black via-purple-950 to-black py-20">
        <h2 className="text-center text-white text-4xl font-bold mb-12 tracking-tight">
          Follow Us on Instagram
        </h2>
        <div className="text-center text-white/60">Loading amazing content...</div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white overflow-hidden">
      <motion.h2 
        className="text-center text-black text-4xl md:text-5xl font-bold mb-4 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Follow Us on <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">Instagram</span>
      </motion.h2>

      <div className="relative h-[600px] md:h-[600px] flex items-center justify-center px-4">
        {getVisibleReels().map((reel, idx) => {
          const position = reel.position;
          let scale = 0.65;
          let opacity = 0.4;
          let zIndex = 0;
          let translateX = position * 320;
          let rotateY = position * 12;

          if (position === 0) {
            scale = 1;
            opacity = 1;
            zIndex = 10;
            rotateY = 0;
          } else if (Math.abs(position) === 1) {
            scale = 0.8;
            opacity = 0.7;
            zIndex = 5;
          } else if (Math.abs(position) === 2) {
            scale = 0.65;
            opacity = 0.4;
            zIndex = 2;
          }

          return (
            <motion.div
              key={`${currentIndex}-${idx}`}
              className="absolute"
              initial={{ scale: 0.5, opacity: 0, x: 0 }}
              animate={{
                scale,
                opacity,
                x: translateX,
                rotateY,
                zIndex
              }}
              transition={{
                duration: 0.7,
                ease: [0.32, 0.72, 0, 1]
              }}
              style={{
                width: "280px",
                perspective: "1000px"
              }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-slate-200/40 to-slate-100/40 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm border border-white/10"
                style={{
                  aspectRatio: "9/16"
                }}
                whileHover={position === 0 ? { scale: 1.05, rotateY: 0 } : {}}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Video */}
                <video
                  src={reel.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  poster={reel.thumbnail}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Instagram Button */}
                {position === 0 && (
                  <motion.a
                    href={reel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2 z-20 whitespace-nowrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Follow Us
                  </motion.a>
                )}

                {/* Play Icon Overlay for non-center cards */}
                {position !== 0 && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {reels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-gradient-to-r from-pink-500 to-purple-500 w-8" 
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to reel ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}