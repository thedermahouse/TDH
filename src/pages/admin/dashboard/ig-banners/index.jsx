import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import usePart from "@/hooks/usePart";
import { FaTrash } from "react-icons/fa";
import { TbNewSection } from "react-icons/tb";

export default function IGBanners() {
  const { part, setPart, SaveButton } = usePart("FOLLOW_US");
  const newSection = () => {
    setPart({
      ...part,
      links: [...(part?.links || []), {}],
    });
  };
  return (
    <div>
      <AdminPanelWrapper>
        <div>
          <div className="flex justify-between">
            <div>
              <h1 className="font-semibold text-xl">Instagram Banners</h1>
            </div>
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
          <div className="w-full">
            <div>
              <div className="grid grid-rows-1 grid-cols-2 gap-1">
                <div>
                  <label
                    htmlFor=""
                    className="input input-bordered w-full gap-3 flex items-center"
                  >
                    <span className="font-bold italic">IG Username</span>
                    <input
                      type="text"
                      value={part?.ig_username}
                      className="grow"
                      onChange={(e) => {
                        setPart({ ...part, ig_username: e?.target?.value });
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
                      <span className="font-bold italic">IG Text</span>
                      <input
                        type="text"
                        className="grow"
                        value={part?.ig_text}
                        onChange={(e) => {
                          setPart({ ...part, ig_text: e?.target?.value });
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div>
          <div className="py-3 grid grid-cols-1 gap-1">
            {part?.links?.map((link, index) => (
              <div key={index}>
                <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
                  <div>
                    <label
                      htmlFor=""
                      className="input input-bordered w-full gap-3 flex items-center"
                    >
                      <span className="font-bold italic">Image URL</span>
                      <input
                        type="text"
                        placeholder="Title"
                        value={link.image_url}
                        className="grow"
                        onChange={(e) => {
                          const links = [...part?.links];
                          links[index].image_url = e.target.value;
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
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        const links = [...part?.links];
                        links.splice(index, 1);
                        setPart({ ...part, links });
                      }}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminPanelWrapper>
    </div>
  );
}
