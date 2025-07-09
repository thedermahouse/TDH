"use client";

import { icons_elements } from "@/components/home/sections/IconSection";
import rp from "@/lib/functions/rp";
import { IoTrash } from "react-icons/io5";

const EquipmentVisitEditor = ({ section, setSection }) => {
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
                datas: [...(s?.datas || []), {}],
              };
            });
          }}
        >
          Add new section
        </button>
      </div>
      <div className="grid grid-cols-7 gap-5">
        {section?.datas?.map((data, index) => {
          // console.log(data, "icons");

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
                          datas: s?.data?.filter((_, i) => i !== index),
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
                      value={data?.heading}
                      onChange={(e) => {
                        setSection((p) => {
                          data.heading = e.target.value;
                          return rp(section);
                        });
                      }}
                      className="w-full p-2 input input-sm"
                      placeholder="Enter heading text"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="heading"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id="heading"
                      value={data?.description}
                      onChange={(e) => {
                        setSection((p) => {
                          data.description = e.target.value;
                          return rp(section);
                        });
                      }}
                      className="w-full p-2 input input-sm"
                      placeholder="Enter heading text"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="heading"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="imageURL"
                      value={data?.imageURL}
                      onChange={(e) => {
                        setSection((p) => {
                          data.imageURL = e.target.value;
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

export default EquipmentVisitEditor;
