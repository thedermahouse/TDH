"use client";
import React from "react";

import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import RMarquee from "react-fast-marquee";
import useWindowDimensions from "@/hooks/useWindowDimentions";
export default function MarqueeContentView({ content }) {
  const { width } = useWindowDimensions();
  const is_phone = width < 600;
  return (
    <div>
      <div className="font-primary bg-dh-newsecondory py-5 lg:h-20">
        <RMarquee
          autoFill={true}
          speed={is_phone ? 50 : 50}
          pauseOnHover={true}
        >
          {content?.links?.map((item, i) => (
            <div className="ac gap-3 ml-3" key={item.title + i}>
              <span className="pr-0 lg:pr-4 tex-xl lg:text-xl text-md ">
                <GoDotFill className="" />
              </span>
              <Link
                href={item.link || "/"}
                className="text-black hover:text-dh-new block lg:text-2xl text-xl font-extralight pr-1"
              >
                {item.title}
              </Link>
            </div>
          ))}
        </RMarquee>
      </div>
    </div>
  );
}
