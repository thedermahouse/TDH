import React from "react";

import usePart from "@/hooks/usePart";
import { TbArrowDown, TbArrowUp, TbNewSection, TbTrash } from "react-icons/tb";

export default function MainNavEditor() {
  const { part, setPart, changed, SaveButton } = usePart("NAVIGATION");
  const newSection = () => {
    setPart({
      ...part,
      links: [...(part?.links || []), {}],
    });
  };
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div></div>
          <div className="flex gap-3">
            <SaveButton />
            <button onClick={newSection} className="btn btn-sm">
              <span className="text-xl">
                <TbNewSection />
              </span>
              <span>Add Link</span>
            </button>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div>
        <div className="py-3 grid grid-cols-1 gap-1">
          {part?.links?.map((link, index) => (
            <div key={index} className="border p-3 rounded-xl">
              <div className="grid grid-rows-1 grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor=""
                    className="input input-bordered w-full gap-3 flex items-center"
                  >
                    <span className="font-bold italic">Title</span>
                    <input
                      type="text"
                      placeholder="Title"
                      value={link.title}
                      className="grow"
                      onChange={(e) => {
                        const links = [...part?.links];
                        links[index].title = e.target.value;
                        setPart({ ...part, links });
                      }}
                    />
                  </label>
                </div>
                <div className="flex justify-between gap-3">
                  <div className="grow">
                    <label
                      htmlFor=""
                      className="input input-bordered w-full gap-3 flex items-center"
                    >
                      <span className="font-bold italic">Link</span>
                      <input
                        type="text"
                        placeholder="Link"
                        className="grow"
                        value={link.link}
                        onChange={(e) => {
                          const links = [...part?.links];
                          links[index].link = e.target.value;
                          setPart({ ...part, links });
                        }}
                      />
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-xs">Left</span>
                    </div>
                    <div>
                      <span>
                        <input
                          type="checkbox"
                          className="toggle toggle-xs"
                          checked={link.align_left}
                          onChange={(e) => {
                            const links = [...part?.links];
                            links[index].align_left = e.target.checked;
                            setPart({ ...part, links });
                          }}
                        />
                      </span>
                    </div>

                    <div className="join">
                      <button
                        className="btn btn-error btn-xs btn-square join-item"
                        onClick={() => {
                          const links = [...part?.links];
                          links.splice(index, 1);
                          setPart({ ...part, links });
                        }}
                      >
                        <span className="text-xl">
                          <TbTrash />
                        </span>
                      </button>
                      <button
                        className="btn btn-ghost btn-xs btn-square join-item"
                        disabled={index === part.links.length - 1}
                        onClick={() => {
                          const links = [...part?.links];
                          const current = links[index];
                          const next = links[index + 1];
                          links[index] = next;
                          links[index + 1] = current;
                          setPart({ ...part, links });
                        }}
                      >
                        <span className="text-xl">
                          <TbArrowDown />
                        </span>
                      </button>
                      <button
                        className="btn btn-ghost btn-xs btn-square join-item"
                        disabled={index === 0}
                        onClick={() => {
                          const links = [...part?.links];
                          const current = links[index];
                          const prev = links[index - 1];
                          links[index] = prev;
                          links[index - 1] = current;
                          setPart({ ...part, links });
                        }}
                      >
                        <span className="text-xl">
                          <TbArrowUp />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-3">
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    const { links } = part;
                    const linkItem = links[index];
                    linkItem.sub_links = linkItem.sub_links || [];
                    linkItem.sub_links.push({});
                    const l = [...part?.links];
                    l[index] = linkItem;
                    setPart({ ...part, links: l });
                  }}
                >
                  New Sub Link
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {link.sub_links?.map((sub_link, sIndex) => {
                  return (
                    <div key={index} className="border p-3 rounded-xl">
                      <div className="grid grid-rows-1 grid-cols-2 gap-2 relative group">
                        <div>
                          <label
                            htmlFor=""
                            className="input input-bordered w-full gap-3 flex items-center"
                          >
                            <span className="font-bold italic">Title</span>
                            <input
                              type="text"
                              placeholder="Title"
                              value={sub_link.title}
                              className="grow"
                              onChange={(e) => {
                                const sub_links = [...link?.sub_links];
                                sub_links[sIndex].title = e.target.value;
                                const links = [...part?.links];
                                links[index].sub_links = sub_links;
                                setPart({ ...part, links });
                              }}
                            />
                          </label>
                        </div>
                        <div className="flex justify-between gap-3">
                          <div className="grow">
                            <label
                              htmlFor=""
                              className="input input-bordered w-full gap-3 flex items-center"
                            >
                              <span className="font-bold italic">Link</span>
                              <input
                                type="text"
                                placeholder="Link"
                                className="grow"
                                value={sub_link.link}
                                onChange={(e) => {
                                  const sub_links = [...link?.sub_links];
                                  sub_links[sIndex].link = e.target.value;
                                  const links = [...part?.links];
                                  links[index].sub_links = sub_links;
                                  setPart({ ...part, links });
                                }}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="absolute -right-2 -top-2 group-hover:opacity-100 opacity-0 transition-opacity">
                          <button
                            className="btn btn-error btn-xs btn-square"
                            onClick={() => {
                              const sub_links = [...link?.sub_links];
                              sub_links.splice(sIndex, 1);
                              const links = [...part?.links];
                              links[index].sub_links = sub_links;
                              setPart({ ...part, links });
                            }}
                          >
                            <span className="text-xl">
                              <TbTrash />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
