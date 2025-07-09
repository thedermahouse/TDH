import Img from "@/components/misc/Img";
import Link from "next/link";

export default function AboutUsView({ section }) {
  return (
    <div className="w-full py-8 md:py-28 lg:py-0   ">
      <header className=" header xl:py-18  2xl:py-26 overflow-hidden">
        <div className="relative">
          <div className="container m-auto h-full flex items-center justify-between lg:flex-nowrap flex-wrap-reverse">
            <div className="max-w-screen-sm lg:p-0 p-5">
              <div>
                <h2 className="text-xl font-normal font-montserrat text-black mb-3">
                  About Us
                </h2>
              </div>
              <div>
                <h2 className="font-primary text-4xl lg:max-w-screen-sm text-black lg:w-3/4 w-full">
                  {section?.title}
                </h2>
                <h2 className="font-normal font-montserrat text-md lg:max-w-screen-sm text-black mt-6 w-full lg:w-11/12">
                  {section?.descText}
                </h2>
              </div>
              <div className="mt-6">
                <Link
                  href="/about-us"
                  className="dh-sm-btn-w  !border"
                  aria-label="Know More"
                >
                  Know More
                </Link>
              </div>
              <h2 className="font-primary font-montserrat lg:text-4xl  lg:max-w-screen-sm text-3xl text-dh-s mt-6 w-full lg:w-3/4">
                {section?.descText2}
              </h2>
            </div>
            <div className="lg:w-4/12 px-4  ">
              <Img
                src={section?.imageURL}
                alt={section?.title || "Image"}
                className="w-full rounded-md"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
