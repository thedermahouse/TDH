import React from "react";
import { FaTrash } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

export default function LinkEditor({ section, setSection }) {
  return (
    <div className="border p-3 rounded-lg border-gray-500">
      <div className="w-full flex justify-end px-4">
        <div className="flex justify-between w-full">
          <div>
            <div className="font-bold">Links Section</div>
          </div>
          <div className="flex gap-2">
            <div>
              <button
                className="btn btn-sm btn-info"
                onClick={() => {
                  setSection((s) => {
                    return {
                      ...s,
                      links: [...(s?.links || []), { url: "" }],
                    };
                  });
                }}
              >
                <span className="text-md">
                  <IoAdd />
                </span>
                <span>Add Link</span>
              </button>
            </div>
            <div>
              <button
                className="btn btn-sm btn-error btn-square"
                onClick={() => {
                  setSection(() => {
                    return undefined;
                  });
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="w-full">
          <input
            placeholder="Title"
            className="input w-full"
            value={section?.title || ""}
            onChange={({ target }) => {
              setSection((prevState) => ({
                ...prevState,
                title: target.value,
              }));
            }}
          />
        </div>
      </div>
      <table className="w-full py-3 table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Link URL</th>
          </tr>
        </thead>
        <tbody>
          {section?.links?.map((l, i) => {
            return (
              <tr className="p-3 rounded-lg">
                <td>
                  <input
                    type="text"
                    placeholder="Link Name"
                    className="input input-sm w-full"
                    value={l.name}
                    onChange={({ target }) => {
                      setSection((s) => {
                        return {
                          ...s,
                          links: s.links.map((link, index) => {
                            if (index === i) {
                              return { ...link, name: target.value };
                            } else {
                              return link;
                            }
                          }),
                        };
                      });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={l.url}
                    placeholder="Link URL"
                    className="input input-sm w-full"
                    onChange={({ target }) => {
                      setSection((s) => {
                        return {
                          ...s,
                          links: s.links.map((link, index) => {
                            if (index === i) {
                              return { ...link, url: target.value };
                            } else {
                              return link;
                            }
                          }),
                        };
                      });
                    }}
                  />
                </td>
                <td>
                  <div>
                    <button
                      onClick={() => {
                        setSection((s) => {
                          return {
                            ...s,
                            links: s.links.filter((_, index) => index !== i),
                          };
                        });
                      }}
                      className="btn btn-error btn-sm btn-square"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
