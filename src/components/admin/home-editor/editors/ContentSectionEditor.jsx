import React from "react";
import Jodit from "../../editor/Jodit";

export default function ContentSectionEditor({ section, setSection }) {
  return (
    <div>
      <div>
        <div className="py-2">
          <h2 className="font-bold">Content Section</h2>
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
        <div className="py-2">
          <div className="flex items-center gap-5">
            <div className="grow">
              <input
                value={section?.imageURL}
                type="text"
                onChange={(e) => {
                  setSection((p) => {
                    p.imageURL = e.target.value;
                    return p;
                  });
                }}
                className="input input-sm w-full"
                placeholder="Image URL"
              />
            </div>
            <div className="w-40">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Left</span>
                  <input
                    type="checkbox"
                    className="toggle"
                    value={section.imageRight}
                    onClick={(e) => {
                      setSection((p) => {
                        p.imageRight = e.target.checked;
                        return p;
                      });
                    }}
                  />
                  <span className="label-text">Right</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Jodit
            content={section?.content || ""}
            height={300}
            setContent={(c) =>
              setSection((p) => {
                p.content = c;
                return p;
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
