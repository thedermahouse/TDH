import React from "react";
export default function ContactHeader({
  title,
  description,
  fontSize,
  descFontSize,
}) {
  return (
    <div className="flex justify-center w-full">
      <div className="text-center flex flex-col gap-4">
        <span className={`${fontSize}  text-black font-hallengerSerif`}>
          {title}
        </span>
        <p className={`${descFontSize}  `}>{description}</p>
      </div>
    </div>
  );
}
