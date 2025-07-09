import Img from "@/components/misc/Img";
import Link from "next/link";
import React from "react";

export default function SubServiceItem({
  subService,
  start = false,
  serviceName,
}) {
  const { name, description, servicePageImageURL, actionUrl } = subService;
  console.log("subService", actionUrl);

  return (
    <div
      className={`flex items-center ${
        start ? "justify-start" : "justify-end"
      } w-full`}
    >
      <div className="lg:w-8/12">
        <div
          className={`w-full flex items-end justify-start text-start lg:flex-row flex-col ${
            start ? "" : "lg:flex-row-reverse"
          }`}
        >
          <div
            className={`lg:w-64 w-full lg:block flex ${
              start ? "justify-center" : "justify-center"
            }`}
          >
            <div className="service-image">
              <div>
                <Img src={servicePageImageURL} alt="Service Image" />
              </div>
            </div>
          </div>
          <div className="p-12 border-b lg:border-black grow lg:w-96">
            <div className="space-y-4 text-black">
              <div>
                <h2 className="font-hallengerSerif uppercase text-3xl tracking-widest">
                  {name}
                </h2>
              </div>

              <div>
                <h3
                  dangerouslySetInnerHTML={{
                    __html: description
                      ? description.length > 300
                        ? description.slice(0, 300) + "..."
                        : description
                      : "",
                  }}
                />
              </div>

              <div>
                <div>
                  <Link
                    className="dh-sm-btn-w"
                    href={`${
                      actionUrl
                        ? actionUrl
                        : `/services/${serviceName}/sub-service/${name}/`.replaceAll(
                            " ",
                            "-"
                          )
                    }`}
                  >
                    Know More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
