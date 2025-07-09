import React from "react";
import rp from "@/lib/functions/rp";
import FooterSection from "./FooterSection";

export default function FooterSectionsRender({
  sections,
  admin = false,
  setPart,
}) {
  return (
    <div>
      {sections?.map((section, index) => (
        <FooterSection
          key={index}
          section={section}
          setSection={(p) => {
            setPart((prev) => {
              const newSections = [...prev.sections];
              newSections[index] = p(prev.sections[index]);
              return rp({ ...prev, sections: newSections.filter((p) => !!p) });
            });
          }}
          admin={admin}
        />
      ))}
    </div>
  );
}
