import React from "react";

export default function TitleSectionView({ section }) {
  const { sectionTitle = "" } = section;
  return (
    <div className="container mx-auto ac">
      <div className="text-center px-6 lg:px-0 pb-10  lg:pb-20 ">
        <h1 className="font-hallengerSerif text-dh-t text-3xl lg:text-5xl">
          {sectionTitle}
        </h1>
      </div>
    </div>
  );
}
