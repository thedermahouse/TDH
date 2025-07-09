"use client";

import { useEffect } from "react";

export default function TableOfContents({ sections }) {
  // Improved slugify function
  function slugify(str) {
    if (!str) return ""; // Handle undefined/null cases
    return str
      .toString() // Convert to string if it's not
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  // Optional: Add active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update active state here if needed
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className=" z-10 bg-base-100 p-6 rounded-lg shadow-md mt-20 mb-8 border-1 ">
      <h2 className="text-xl font-hallengerSerif font-medium mb-4">
        Table of Contents
      </h2>
      <ul className="space-y-2 ">
        {sections
          .filter((section) => section?.sectionTitle)
          .map((section, index) => (
            <li className="mb-6 bg-[#F76931] rounded-lg p-2  " key={index}>
              <a
                href={`#${slugify(section.sectionTitle)}`}
                className="text-white   font-hallengerSerif  my-2 hover:underline  transition-colors "
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(slugify(section.sectionTitle))
                    ?.scrollIntoView({
                      behavior: "smooth",
                    });
                }}
              >
                {section.sectionTitle}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
