import React from "react";
import SubServiceItem from "./SubServiceItem";

export default function SubServices({ service }) {
  return (
    <div>
      <div className="text-center">
        <div className="py-5 lg:py-24">
          <div className="max-w-screen-md m-auto text-black">
            <div className="mb-4">
              <h2 className=" text-3xl lg:text-5xl font-hallengerSerif">
                {service?.servicePageSubServiceTitle}
              </h2>
            </div>
            <div>
              <h2 className="text-sm px-15 lg:px-0">
                {service?.servicePageSubServiceDescription}
              </h2>
            </div>
          </div>
        </div>
        <div>
          <div className="container m-auto">
            <div className="grid grid-cols-1 gap-24">
              {service?.subServices
                ?.filter((s) => s.isShow)
                .sort((a, b) => a.priority - b.priority)
                .map((s, i) => {
                  return (
                    <SubServiceItem
                      subService={s}
                      key={s.id}
                      start={i % 2 === 0}
                      serviceName={service.name}
                    />
                  );
                })}
            </div>
          </div>
        </div>
        <div className=" lg:py-24"></div>
      </div>
    </div>
  );
}
