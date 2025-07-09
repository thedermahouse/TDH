"use client";

import React, { Children, useState } from "react";
import Link from "next/link";
import useScrollTop from "@/hooks/useScrollTop";
import { TbMenu4 } from "react-icons/tb";
import ResponsiveNav from "./ResponsiveNav";
import { useRouter } from "next/navigation";

export default function NavContent({ content }) {
  const sw = useScrollTop();
  const [open, setOpen] = useState(false);

  const linkContainerClass = "ac gap-10";
  const scrolledClass =
    sw > 0
      ? "lg:bg-white shadow-lg p-3 lg:p-5 bg-black lg:bg-white"
      : "lg:p-12 p-3 bg-black/10 lg:bg-transparent";
  const logoScrolledClass =
    sw > 0
      ? "lg:bg-white lg:scale-[0.4] lg:-translate-y-20 invert lg:invert-0"
      : "";

  return (
    <>
      <div
        className={`h-full w-full ${scrolledClass} trs drop-shadow-sm bg-opacity-50`}
      >
        <div className="flex justify-between items-center">
          <Link href="/" aria-label="Home">
            <div
              className={`trs lg:absolute lg:w-40 w-16 top-10 z-10 lg:left-1/2 lg:-translate-x-20 lg:p-3 ${logoScrolledClass} ac lg:block`}
            >
              <img src={"/logo.svg"} alt="logo" />
            </div>
          </Link>
          <div className="block lg:hidden">
            <button
              className="text-3xl btn btn-md btn-square"
              onClick={() => {
                setOpen(true);
              }}
            >
              <TbMenu4 />
            </button>
          </div>
          <div className="container m-auto items-center justify-between font-primary relative lg:flex hidden">
            <div className={linkContainerClass}>
              {content?.links
                ?.filter((item) => !!item.align_left)
                .map((item) => (
                  <NavLink item={item} key={item.title}>
                    {item.title}
                  </NavLink>
                ))}
            </div>
            <div className={linkContainerClass}>
              {content?.links
                ?.filter((item) => !item.align_left)
                .map((item) => (
                  <NavLink item={item} key={item.title}>
                    {item.title}
                  </NavLink>
                ))}
            </div>
          </div>
        </div>
      </div>
      <ResponsiveNav
        links={content?.links || []}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

const NavLink = ({ item, children }) => {
  const router = useRouter();
  const hasSubLinks = item?.sub_links?.length > 0;
  const [open, setOpen] = useState(false);

  if (hasSubLinks) {
    return (
      <div
        className={`dropdown ${
          open ? "dropdown-open" : "dropdown-close"
        } group`}
        key={router}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        tabIndex={0}
      >
        <div className="">
          <Link
            href={item.link || "/"}
            className="text-lg text-black hover:text-dh-newsecondory trs font-hallengerSerif font-medium "
          >
            {children}
          </Link>
          <ul className="dropdown-content z-1 w-fit bg-white rounded-lg overflow-hidden">
            {item?.sub_links?.map((subLink, idx) => (
              <Link
                href={subLink.link || "/"}
                key={subLink.title + idx}
                className="px-3 py-2 hover:bg-dh-newsecondory hover:text-white block border-b border-gray-200 text-nowrap"
              >
                {subLink.title}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.link || "/"}
      className="text-lg text-black hover:text-dh-newsecondory trs font-hallengerSerif font-medium text-white-border"
    >
      {children}
    </Link>
  );
};
