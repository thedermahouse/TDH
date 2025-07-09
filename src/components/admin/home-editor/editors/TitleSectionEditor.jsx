import React from "react";

export default function TitleSectionEditor({ section, setSection }) {
  return (
    <div>
      <div>
        <div className="py-2">
          <h2 className="font-bold">Title Section</h2>
        </div>
      </div>
      <div>
        <div>
          <input
            value={section?.sectionTitle}
            type="text"
            onChange={(e) => {
              setSection((p) => {
                p.sectionTitle = e.target.value;
                return p;
              });
            }}
            className="input input-sm w-full"
            placeholder="Section Title"
          />
        </div>
      </div>
    </div>
  );
}
