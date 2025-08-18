// src/components/home/sections/ServiceShowcase.jsx
import Img from "@/components/misc/Img";
import db from "@/lib/db";
import ServiceDisplaySwiper from "./ServiceDisplaySwiper";

const getServiceDetails = async (sid) => {
  return db.Services.findUnique({
    where: { id: +sid },
    include: { subServices: true },
  });
};

export default async function ServiceShowcase({ section }) {
  const { service_id, sectionTitle, sectionDescription } = section;
  const service = await getServiceDetails(service_id);

  if (!service) return null;

  return (
    <div className="bg-[#8A8A8A] py-16">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        {sectionTitle && (
          <div className="text-left mb-10">
            <h2 className="text-4xl font-normal text-white">{sectionTitle}</h2>
            {sectionDescription && (
              <p className="mt-2 text-white max-w-2xl ">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        {/* Service Main Info */}
        {/* <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <Img
              src={service?.homePageImageURL}
              alt={service?.name}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">{service?.name}</h3>
            <p className="text-gray-600 mb-6">{service?.description}</p>
          </div>
        </div> */}

        {/* Slider for Subservices */}
        <div className="mt-12">
          <ServiceDisplaySwiper
            subServices={service?.subServices}
            serviceName={service?.name}
          />
        </div>
      </div>
    </div>
  );
}
