import Img from "@/components/misc/Img";
import Link from "next/link";

const HeaderHero = ({ service }) => {
  const hasImages =
    service.subServicePageImage1URL && service.subServicePageImage2URL;
  return (
    <section className="hero bg-dh-q">
      <div className="container m-auto">
        <div className="w-10/12 m-auto">
          <div className="lg:pt-80 pt-10 text-center"></div>
          <pre className="hidden">{JSON.stringify(service, null, 2)}</pre>
          <div>
            <div>
              <div className="w-full text-black relative lg:pb-28 xl:pb-42 ac">
                {hasImages && (
                  <div className="lg:block hidden w-full">
                    <div className="w-full flex justify-between items-center">
                      {service.subServicePageImage1URL && (
                        <div className="overflow-hidden w-96 h-96 -translate-y-12">
                          <Img
                            src={service.subServicePageImage1URL}
                            alt="Service Image"
                          />
                        </div>
                      )}
                      {service.subServicePageImage2URL && (
                        <div className="overflow-hidden w-96 h-96 translate-y-12 -translate-x-12">
                          <Img
                            src={service.subServicePageImage2URL}
                            alt="Service Image"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div
                  className={`${
                    hasImages ? "lg:absolute" : ""
                  } bg-white m-auto z-10 p-12 max-w-screen-sm text-center`}
                >
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="mb-3">
                        <h1 className="font-hallengerSerif text-2xl lg:text-5xl">
                          {service.name}
                        </h1>
                      </div>
                      <div className="mb-2">
                        <div className="text-sm">
                          <p>
                            {/* Show first 100 characters to users */}
                            {service.description?.slice(0, 600)}
                            {service.description &&
                              service.description.length > 600 && (
                                <>
                                  ...
                                  {/* visually hidden full content for SEO */}
                                  <span
                                    style={{
                                      position: "absolute",
                                      left: "-9999px",
                                      width: "1px",
                                      height: "1px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {service.description}
                                  </span>
                                </>
                              )}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div>
                          <Link
                            href={`/contact-us?enquiry_from=${service?.name}`}
                            className="dh-sm-btn-w border"
                            aria-label="Enquire Now"
                          >
                            Enquire Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4"></div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
