import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import usePart from "@/hooks/usePart";
import { FaTrash } from "react-icons/fa";
import { TbNewSection } from "react-icons/tb";

export default function HomeSections() {
  const { part, setPart, changed, SaveButton } = usePart("MARQUEE_STRIP");
  console.log(part, "part");

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
              <h1 className="font-semibold text-xl">Marquee Strip Editor</h1>
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
          <div className="py-3 grid grid-cols-1 gap-1">
            {part?.links?.map((link, index) => (
              <div key={index}>
                <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
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
                  <div>
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
