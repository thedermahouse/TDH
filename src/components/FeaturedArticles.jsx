"use client";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react"; // optional icon lib

// Custom arrow components
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <ChevronRight className="w-5 h-5 text-gray-700" />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <ChevronLeft className="w-5 h-5 text-gray-700" />
    </button>
  );
}

export default function FeatureArticlesSection() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/api/feature-articles")
      .then((res) => res.json())
      .then((data) => setArticles(data.data || []))
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const truncate = (text, max = 80) => {
    if (!text) return "";
    return text.length > max ? text.slice(0, max - 3) + "..." : text;
  };

  return (
    <section className="py-14 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-primary font-bold text-gray-900 mb-10">
          Featured Articles
        </h2>
        {/* <p className="text-gray-500 mb-10">
          Expert skin care tips, trends and science driven advice.
        </p> */}

        {articles.length > 0 ? (
          <div className="relative">
            <Slider {...settings}>
              {articles.map((a) => (
                <div key={a.id} className="px-3">
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-sm font-medium mt-2 inline-block "
                  >
                    <div className=" overflow-hidden  transition-all duration-300">
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-72 object-cover rounded-2xl"
                      />
                      <div className="p-4">
                        <p className="text-gray-400 text-sm mb-1">
                          {new Date(a.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <h3 className="text-2xl font-medium text-gray-800">
                          {truncate(a.title, 40)}
                        </h3>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p className="text-gray-400 text-center">No featured articles yet.</p>
        )}
      </div>
    </section>
  );
}
