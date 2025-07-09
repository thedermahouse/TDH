import Img from "@/components/misc/Img";
import db from "@/lib/db";
import React from "react";
import ServiceDisplaySwiper from "./ServiceDisplaySwiper";

const get_service_details = async (sid) => {
  return db.Services.findUnique({
    where: { id: +sid },
    include: {
      subServices: true,
    },
  });
};

export default async function ServiceDisplay({ section }) {
  const { service_id } = section;
  const service = await get_service_details(service_id);
  return (
    <div className="bg-[#ededed]">
      <pre className="hidden">{JSON.stringify(service, null, 2)}</pre>
      <div className="container mx-auto my-0 lg:py-24">
        {section?.sectionTitle && section?.sectionDescription && (
          <div className="text-center lg:w-1/2 mx-auto text-black px-4 lg:px-0">
            <div className="mb-4">
              <h2 className="text-5xl font-hallengerSerif font-normal ">
                {section?.sectionTitle}
              </h2>
            </div>
            <div className="text-sm text-justify lg:text-center">
              <p>{section?.sectionDescription}</p>
            </div>
          </div>
        )}
        <div className="py-0 lg:py-8"></div>
        <div className="w-full flex justify-center items-end">
          <div className="shrink overflow-hidden 2xl:block hidden">
            <Img src={service?.homePageImageURL} alt="Service Image" />
          </div>
          <div className="grow text-black flex lg:max-w-screen-lg w-full">
            <div className="bg-[#8A8A8A] h-full grow lg:-ml-12 w-full">
              <div className="lg:pl-20 pl-5 pr-5 lg:pr-0 lg:pt-24 pt-14 pb-14 lg:pb-0 h-full w-full overflow-hidden">
                <div>
                  <div className="text-white lg:text-5xl text-3xl">
                    <div className="mb-2">
                      <h2 className="font-hallengerSerif">{service?.name}</h2>
                    </div>
                    <div className="text-sm lg:w-3/4 mb-6">
                      <p>{service?.description}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full flex">
                  <div className="w-full flex relative grow">
                    <ServiceDisplaySwiper
                      subServices={service?.subServices}
                      serviceName={service?.name}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
