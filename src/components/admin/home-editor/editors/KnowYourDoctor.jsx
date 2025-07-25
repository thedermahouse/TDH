import React from "react";
import Jodit from "../../editor/Jodit";

export default function KnowYourDoctor({ section, setSection }) {
  return (
    <div>
      <div>
        <div>
          <span className="uppercase font-bold">Dr. Manu Singh Walia</span>
        </div>
        <div className="py-2 space-y-3">
          <div className="flex gap-3">
            <input
              value={section?.doctorImageURL || ""}
              type="text"
              onChange={(e) => {
                setSection((p) => ({
                  ...p,
                  doctorImageURL: e.target.value,
                }));
              }}
              className="input input-sm w-full"
              placeholder="Doctor Image URL"
            />

            <input
              value={section?.doctorName || ""}
              type="text"
              onChange={(e) => {
                setSection((p) => ({
                  ...p,
                  doctorName: e.target.value,
                }));
              }}
              className="input input-sm w-full"
              placeholder="Doctor Name"
            />
          </div>
          <div className="w-full">
            <Jodit
              content={section?.doctorContent || ""}
              height={250}
              setContent={(c) =>
                setSection((p) => ({
                  ...p,
                  doctorContent: c,
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
