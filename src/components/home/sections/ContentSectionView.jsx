import Img from "@/components/misc/Img";
import React from "react";

export default function ContentSectionView({ section, index }) {
  const imageRight = section?.imageRight === false;
  const {
    content = "",
    imageURL = "",
    sectionTitle = "Untitled Section", // Default title
  } = section || {};
  const sanitizedContent = content.replace(/<style[^>]*>.*?<\/style>/gis, "");

  function slugify(str) {
    if (!str) return ""; // Handle undefined/null cases
    return str
      .toString() // Convert to string if it's not
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  return (
    <div
      className={`${
        index === 0 ? "pt-10 lg:pt-20" : ""
      } scroll-mt-16 lg:scroll-mt-28`}
      id={slugify(section.sectionTitle)}
    >
      <div className="container m-auto">
        <div
          className={`w-full ${
            imageRight ? "lg:flex-row-reverse" : "lg:flex-row"
          } lg:flex flex-wrap lg:flex-nowrap gap-5 lg:gap-0`}
        >
          {imageURL && (
            <div className="lg:w-3/12 w-full px-4 lg:px-0">
              <div>
                <Img
                  src={imageURL}
                  className="w-full"
                  alt={section?.sectionTitle || "Image"}
                />
              </div>
            </div>
          )}
          <div className={`w-full ${imageURL ? "lg:w-9/12" : "lg:w-full"}`}>
            <div
              className={` lg:pb-18 lg:pt-0 ${
                !imageRight && imageURL ? "lg:pl-6" : ""
              } px-6`}
            >
              <div
                className={`mb-5 text-center ${
                  !imageRight
                    ? " text-start lg:text-start"
                    : " text-start lg:text-end"
                }`}
              >
                <h3 className="font-hallengerSerif text-dh-s text-3xl lg:text-4xl">
                  {section?.sectionTitle}
                </h3>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                className={`w-full [&_p]:m-0 [&_p]:p-0 [&_br]:hidden custom-html-content mb-15 lg:mb-0  ${
                  !imageRight
                    ? "text-start lg:text-start"
                    : " text-start lg:text-end"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
