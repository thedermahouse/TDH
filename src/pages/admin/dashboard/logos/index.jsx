import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import usePart from "@/hooks/usePart";
import { FaTrash } from "react-icons/fa";
import { TbNewSection } from "react-icons/tb";

export default function LogoEditor() {
  const { part, setPart, SaveButton } = usePart("LOGO_EDITOR");

  const newSection = () => {
    setPart({
      ...part,
      logos: [...(part?.logos || []), {}],
    });
  };

  return (
    <div>
      <AdminPanelWrapper>
        <div>
          <div className="flex justify-between">
            <div>
              <h1 className="font-semibold text-xl">Logo Editor</h1>
            </div>
            <div className="flex gap-3">
              <SaveButton />
              <button onClick={newSection} className="btn btn-sm">
                <span className="text-xl">
                  <TbNewSection />
                </span>
                <span>Add Logo</span>
              </button>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div>
          <div className="w-full">
            <div>
              <div className="grid grid-rows-1 grid-cols-1 gap-1">
                <div>
                  <label
                    htmlFor=""
                    className="input input-bordered w-full gap-3 flex items-center"
                  >
                    <span className="font-bold italic">Title</span>
                    <input
                      type="text"
                      value={part?.title}
                      className="grow"
                      onChange={(e) => {
                        setPart({ ...part, title: e?.target?.value });
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div>
          <div className="py-3 grid grid-cols-1 gap-1">
            {part?.logos?.map((logo, index) => (
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
                        placeholder="Image URL"
                        value={logo.image_url}
                        className="grow"
                        onChange={(e) => {
                          const logos = [...part?.logos];
                          logos[index].image_url = e.target.value;
                          setPart({ ...part, logos });
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
                          value={logo.link}
                          onChange={(e) => {
                            const logos = [...part?.logos];
                            logos[index].link = e.target.value;
                            setPart({ ...part, logos });
                          }}
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        const logos = [...part?.logos];
                        logos.splice(index, 1);
                        setPart({ ...part, logos });
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
