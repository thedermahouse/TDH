import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";

export default function ResponsiveNav({ links, open, setOpen }) {
  return (
    <aside>
      <div>
        <div className="drawer">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={open}
            onChange={() => setOpen(!open)}
          />
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 px-4 overflow-y-auto">
              <li className="py-2 ac">
                <img src={"/logo.svg"} alt="logo" className="w-30" />
              </li>
              {links?.map((l, i) => {
                return (
                  <li key={`${l.link} + ${i}`} className="hover:bg-transparent">
                    <div className="hover:bg-transparent">
                      <Link
                        href={l.link || "/"}
                        aria-label={l.title || "Home"}
                        className="!font-hallengerSerif text-md focus:border-orange-500 focus:bg-transparent"
                        onClick={() => setOpen(false)}
                      >
                        {l.title}
                      </Link>
                    </div>
                    <div className="w-full hover:bg-transparent flex flex-col">
                      {l?.sub_links?.map((s, i) => {
                        return (
                          <div key={i} className="w-full hover:bg-transparent">
                            <Link
                              href={s.link || "/"}
                              aria-label={s.title || "Home"}
                              className="font-hallengerSerif text-gray-600 text-xs hover:bg-gray-300 focus:border-orange-500 focus:bg-transparent w-full block px-2 py-1 rounded-md whitespace-nowrap"
                              onClick={() => setOpen(false)}
                            >
                              {s.title}
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <style jsx global>{`
        /* Override mobile touch highlight color */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        /* Reset default mobile styles */
        .menu li {
          background-color: transparent !important;
        }

        .menu li > a:active,
        .menu li > div:active,
        .menu li > a:focus,
        .menu li > div:focus {
          background-color: transparent !important;
        }

        /* Custom focus styles for links */
        .menu a:active,
        .menu a:focus {
          border-color: #f97316 !important;
          background-color: transparent !important;
        }

        /* Remove default -webkit-tap-highlight from menu items */
        .menu li a,
        .menu li div {
          -webkit-tap-highlight-color: transparent;
        }

        /* Ensure touch events are recognized for scrolling */
        .menu {
          touch-action: pan-y;
        }
      `}</style>
    </aside>
  );
}
