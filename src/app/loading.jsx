"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed top-0 right-0 left-0 bottom-0 bg-white h-screen ac z-50">
      <style jsx global>
        {`
          body,
          html {
            overflow: hidden;
          }
        `}
      </style>
      <div>
        <div>
          <div>
            <img src={"/logo.svg"} alt="logo" />
          </div>
          <div className="mt-12"></div>
          <div className="ac">
            <span className="loading"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
