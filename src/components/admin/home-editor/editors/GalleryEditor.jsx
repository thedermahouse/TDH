"use client";

import { icons_elements } from "@/components/home/sections/IconSection";
import rp from "@/lib/functions/rp";
import { IoTrash } from "react-icons/io5";

const GalleryEditor = ({ section, setSection }) => {
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
      <div className="">
        <div>
          <div className="py-2">
            <h2 className="font-bold">Gallery Title And Button</h2>
          </div>
        </div>
        <div>
          <div className="space-y-3">
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
            <textarea
              name=""
              id=""
              value={section?.sectionDescription}
              onChange={(e) => {
                setSection((p) => {
                  p.sectionDescription = e.target.value;
                  return p;
                });
              }}
              className="textarea textarea-sm w-full"
              placeholder="Section Description"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-5">
        {section?.datas?.map((data, index) => {
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
                      Before Image
                    </label>
                    <input
                      type="text"
                      id="beforeImg"
                      value={data?.beforImg}
                      onChange={(e) => {
                        setSection((p) => {
                          data.beforImg = e.target.value;
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
                      After Image
                    </label>
                    <input
                      type="text"
                      id="afterImg"
                      value={data?.afterImg}
                      onChange={(e) => {
                        setSection((p) => {
                          data.afterImg = e.target.value;
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

export default GalleryEditor;
