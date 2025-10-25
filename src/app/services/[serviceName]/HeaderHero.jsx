import Img from "@/components/misc/Img";
import Link from "next/link";

const HeaderHero = ({ service }) => {
  return (
    <section className="min-h-[80dvh] bg-dh-q">
      <div className="container m-auto">
        <div className="w-10/12 m-auto">
          <div className=" py-10 lg:py-32 text-center"></div>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4 px-24">
            <ol className="flex items-center gap-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/services" className="hover:text-gray-900">
                  Services
                </Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li aria-current="page" className="font-medium text-gray-800">
                {service?.name}
              </li>
            </ol>
          </nav>
          <div>
            <div>
              <div className="w-full grid lg:grid-cols-2 grid-cols-1 text-black">
                <div className="lg:block hidden">
                  <div className="w-full px-24">
                    <div>
                      <Img
                        src={service.servicePageImage1URL}
                        className="w-full"
                        alt="Service Image"
                      />
                    </div>
                    <div className="text-sm py-4">
                      <p>{service.servicePageImage1Description}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="mb-2">
                        <h2 className="font-hallengerSerif tracking-widest text-lg">
                          SERVICES
                        </h2>
                      </div>
                      <div className="mb-3">
                        <h1 className="font-hallengerSerif text-4xl  lg:text-5xl">
                          {service.name}
                        </h1>
                      </div>
                      <div className="mb-2">
                        <div className="text-sm texxcen">
                          <p>{service.description}</p>
                        </div>
                      </div>
                      <div>
                        <div className="mt-4">
                          <Link
                            href={`/contact-us?enquiry_from=${service.name}`}
                            className="dh-sm-btn-w"
                            aria-label="Enquire Now"
                          >
                            Enquire Now
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mt-12">
                      <Img
                        src={service.servicePageImage2URL}
                        className="w-full"
                        alt="Service Image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="py-10 lg:py-py-4"></div>
        </div>
      </div>
    </section>
  );
};

export default HeaderHero;
