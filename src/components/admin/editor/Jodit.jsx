"use client";
import React, { useState, useRef, useMemo } from "react";

const placeholder = `Start typings...`;
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const Jodit = ({ content, setContent, height }) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
      height: height || "100vh",
      iframe: true,
    }),
    []
  );

  return (
    <div className="text-black w-full custom-html-content">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => {
          setContent(newContent);
        }}
      />
    </div>
  );
};

export default Jodit;
