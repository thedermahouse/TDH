import usePart from "@/hooks/usePart";
import rp from "@/lib/functions/rp";
import React from "react";

export default function AboutUsSEOEditor() {
  const { part, setPart, changed, SaveButton } = usePart("ABOUT_US");
  return (
    <div>
      <div className="grid grid-col-2 gap-3">
        <div className="w-full">
          <input
            value={part?.seo?.metaTitle}
            type="text"
            onChange={(e) => {
              setPart((p) => {
                p.seo = p.seo || {};
                p.seo.metaTitle = e.target.value;
                return rp(p);
              });
            }}
            className="input input-sm w-full"
            placeholder="Meta Title"
          />
        </div>
        <div className="w-full">
          <input
            value={part?.seo?.metaImage}
            type="text"
            onChange={(e) => {
              setPart((p) => {
                p.seo = p.seo || {};
                p.seo.metaImage = e.target.value;
                return rp(p);
              });
            }}
            className="input input-sm w-full"
            placeholder="Meta Image URL"
          />
        </div>
        <div className="w-full col-span-2">
          <textarea
            value={part?.seo?.metaDescription}
            onChange={(e) => {
              setPart((p) => {
                p.seo = p.seo || {};
                p.seo.metaDescription = e.target.value;
                return rp(p);
              });
            }}
            rows={3}
            className="textarea textarea-sm w-full"
            placeholder="Meta Description Text"
          />
        </div>
      </div>
      <div>
        <div>
          <SaveButton />
        </div>
      </div>
    </div>
  );
}
