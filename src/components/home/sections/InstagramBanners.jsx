import React from "react";
import getPart from "@/helpers/getPart";
import Link from "next/link";
import InstagramBannersSlider from "./InstagramBannersSlider";
import { FaInstagram } from "react-icons/fa6";

export default async function InstagramBannersView({ color }) {
  const { content } = await getPart("FOLLOW_US");
  return (
    <div className={`${color ? color : "bg-white"} w-full  `}>
      <div className="w-full">
        <div className="container m-auto">
          <div className="w-full text-center">
            <div>
              <h2 className="text-dh-t space-x-2 lg:text-4xl text-xl flex items-center justify-center">
                <span className="font-hallengerSerif ">Follow</span>
                <span>
                  <Link
                    href={`https://instagram.com/${content?.ig_username}`}
                    target="_blank"
                    className="font-hallengerSerif underline"
                    aria-label="Instagram page"
                  >
                    <span className="flex items-center gap-2">
                      <FaInstagram />
                      {content?.ig_text}
                    </span>
                  </Link>
                </span>
              </h2>
            </div>
            <div className="lg:py-10 py-5">
              <InstagramBannersSlider links={content?.links} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
