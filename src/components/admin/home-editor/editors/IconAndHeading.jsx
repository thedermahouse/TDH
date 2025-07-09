"use client";

import { icons_elements } from "@/components/home/sections/IconSection";
import rp from "@/lib/functions/rp";
import { IoTrash } from "react-icons/io5";

const IconAndHeading = ({ section, setSection }) => {
  return (
    <div className="mx-auto p-6  rounded-lg shadow-md">
      {/* <pre>{JSON.stringify(section, null, 2)}</pre> */}
      <div className="flex justify-end py-6">
        <button
          className="btn btn-sm btn-accent"
          onClick={() => {
            setSection((s) => {
              return {
                ...s,
                icons: [...(s?.icons || []), {}],
              };
            });
          }}
        >
          Add new section
        </button>
      </div>
      <div className="grid grid-cols-7 gap-5">
        {section?.icons?.map((iconS, index) => {
          // console.log(iconS, "icons");

          return (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-end">
                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => {
                      setSection((s) => {
                        return {
                          ...s,
                          icons: s?.icons?.filter((_, i) => i !== index),
                        };
                      });
                    }}
                  >
                    <span>
                      <IoTrash />
                    </span>
                  </button>
                </div>
                <div>
                  <label
                    htmlFor="icon"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Select Icon
                  </label>
                  <select
                    id="icon"
                    value={iconS?.iconType}
                    onChange={(e) => {
                      setSection((p) => {
                        iconS.iconType = e.target.value;
                        return rp(section);
                      });
                    }}
                    className="select select-sm w-full"
                    required
                  >
                    <option value="">Select an icon</option>
                    {Object.entries(icons_elements).map(
                      ([key, _]) =>
                        key && (
                          <option key={key} value={key}>
                            {key.charAt(0) + key.slice(1).toLowerCase()}
                          </option>
                        )
                    )}
                  </select>
                </div>
                <div>
                  <div>
                    <label
                      htmlFor="heading"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Heading Text
                    </label>
                    <input
                      type="text"
                      id="heading"
                      value={iconS?.heading}
                      onChange={(e) => {
                        setSection((p) => {
                          iconS.heading = e.target.value;
                          return rp(section);
                        });
                      }}
                      className="w-full p-2 input input-sm"
                      placeholder="Enter heading text"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconAndHeading;
