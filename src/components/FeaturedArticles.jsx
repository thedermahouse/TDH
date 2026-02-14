"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SlickSlider = dynamic(() => import("react-slick"), { ssr: false });

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
    >
      <ChevronRight className="w-5 h-5 text-gray-700" />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
    >
      <ChevronLeft className="w-5 h-5 text-gray-700" />
    </button>
  );
}

const hardcodedArticles = [
    {
    id: "static-1",
    title: "AestheticMed: Reader Feature",
    image: "/api/files/587", // reused image
    date: "2026-01-09T00:00:00.000Z", // Random January 2026
    link: "https://mag.aestheticmed.in/magazine/reader/278277?pageNumber=1",
  },
  {
    id: "static-2",
    title: "Should You Toss Out Skincare That Hasn’t Yet Expired?",
    image: "/api/files/661", // reused image
    date: "2025-12-18T00:00:00.000Z", // Random December 2025
    link: "https://www.theestablished.com/self/beauty/should-you-toss-out-skincare-that-hasnt-yet-expired",
  },

];


export default function FeatureArticlesSection() {
  const [articles, setArticles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesToShow(1);
      else if (width < 1024) setSlidesToShow(2);
      else if (width < 1280) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    setIsMounted(true);

    fetch("/api/feature-articles")
        .then((res) => res.json())
        .then((data) => {
          const apiArticles = data.data || [];
          setArticles([...hardcodedArticles, ...apiArticles]);
        })
        .catch((err) => console.error("Error fetching articles:", err));

  }, []);

  if (!isMounted) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow,
    slidesToScroll: 1,
    arrows: slidesToShow > 1, // hide arrows for mobile
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const truncate = (text, max = 80) =>
    text && text.length > max ? text.slice(0, max - 3) + "..." : text;

  return (
    <section className="py-14 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-primary font-bold text-gray-900 mb-10">
          Featured Articles
        </h2>

        {articles.length > 0 ? (
          <div className="relative">
            <SlickSlider key={slidesToShow} {...settings}>
              {articles.map((a) => (
                <div key={a.id} className="px-2">
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white  shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <div className="aspect-square w-full rounded-2xl overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-gray-400 text-sm mb-1">
                        {new Date(a.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <h3 className="text-lg font-medium text-gray-800 leading-tight">
                        {truncate(a.title, 40)}
                      </h3>
                    </div>
                  </a>
                </div>
              ))}
            </SlickSlider>
          </div>
        ) : (
          <p className="text-gray-400 text-center">No featured articles yet.</p>
        )}
      </div>
    </section>
  );
}
