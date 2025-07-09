import React from "react";
import Section from "./Section";
import rp from "@/lib/functions/rp";

const move = (arr, fromIndex, toIndex) => {
  const offset = fromIndex + toIndex;
  if (offset < 0) {
    return arr;
  }
  const bkp = arr[fromIndex];
  arr[fromIndex] = arr[offset];
  arr[offset] = bkp;
  return [...arr];
};

export default function SectionsRender({ sections, admin = false, setPart }) {
  return (
    <div className="">
      {sections?.map((section, index) => {
        const showUpArrow = index > 0;
        const showDownArrow = index < sections.length - 1;
        return (
          <Section
            key={section.id || `section-${index}`}
            section={section}
            index={index}
            admin={admin}
            {...(admin && {
              setSection: (p) => {
                setPart((prev) => {
                  const newSections = [...prev.sections];
                  newSections[index] = p(prev.sections[index]);
                  return rp({
                    ...prev,
                    sections: newSections.filter((p) => !!p),
                  });
                });
              },
              up: showUpArrow
                ? () =>
                    setPart((prev) =>
                      rp({
                        ...prev,
                        sections: move(prev.sections, index, -1),
                      })
                    )
                : undefined,
              down: showDownArrow
                ? () =>
                    setPart((prev) =>
                      rp({ ...prev, sections: move(prev.sections, index, 1) })
                    )
                : undefined,
              del: () =>
                setPart((prev) =>
                  rp({
                    ...prev,
                    sections: prev.sections.filter((_, i) => i !== index),
                  })
                ),
            })}
          />
        );
      })}
    </div>
  );
}
