import React from "react";
import LeadForm from "./form";

const Banner = ({ title, subtitle, backgroundImage, landingPage }) => {
  const bannerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section
      style={bannerStyle}
      className="sm:min-h-[100vh] min-h-[100vsh]  relative sm:flex items-center sm:justify-start p-8 text-white "
    >
      {/* Content */}
      <div className=" z-10 max-w-2xl text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl text-white font-primary font-normal">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg font-primary md:text-xl">{subtitle}</p>
        )}

        {/* Lead Form */}
      </div>
      <div className="sm:absolute top-28 sm:right-20  mt-[140px]">
        <LeadForm landingPage={landingPage} />
      </div>
    </section>
  );
};

export default Banner;
