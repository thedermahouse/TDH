import { BiTrash } from "react-icons/bi";
import { TbFlagPlus } from "react-icons/tb";

export default function Header({ section, setSection }) {
  const addNewSlide = () => {
    setSection((p) => {
      p.slides = [...(p?.slides || []), {}];
      return p;
    });
  };
  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <div>
          <h1 className="m-0 font-semibold uppercase">Header</h1>
        </div>
        <div className="flex gap-2">
          <div className="text-end">
            <div>
              <button onClick={addNewSlide} className="btn btn-sm">
                <span>
                  <TbFlagPlus />
                </span>
                <span>New Slide</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="w-full">
          <input
            value={section?.title}
            type="text"
            onChange={(e) => {
              setSection((p) => {
                p.title = e.target.value;
                return p;
              });
            }}
            className="input input-sm w-full"
            placeholder="Title"
          />
        </div>
        <div className="w-full">
          <input
            value={section?.subtitle}
            type="text"
            onChange={(e) => {
              setSection((p) => {
                p.subtitle = e.target.value;
                return p;
              });
            }}
            className="input input-sm w-full"
            placeholder="Subtitle"
          />
        </div>
        <div className="w-full">
          <input
            value={section?.buttonText}
            type="text"
            onChange={(e) => {
              setSection((p) => {
                p.buttonText = e.target.value;
                return p;
              });
            }}
            className="input input-sm w-full"
            placeholder="Button Text"
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            value={section?.buttonLink}
            onChange={(e) => {
              setSection((p) => {
                p.buttonLink = e.target.value;
                return p;
              });
            }}
            className="input input-sm w-full"
            placeholder="Button Link"
          />
        </div>
        <div className="divider col-span-2 "></div>
        <div className="col-span-2">
          <div className="grid grid-cols-1 gap-3 py-4">
            {section?.slides?.map((slider, i) => {
              return (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={slider.image_url}
                    onChange={(e) => {
                      setSection((p) => {
                        p.slides = p.slides || [];
                        p.slides[i].image_url = e.target.value;
                        return p;
                      });
                    }}
                    className="input input-sm w-full"
                    placeholder="Image URL Desktop"
                  />
                  <input
                    type="text"
                    value={slider.image_url_mobile}
                    onChange={(e) => {
                      setSection((p) => {
                        p.slides = p.slides || [];
                        p.slides[i].image_url_mobile = e.target.value;
                        return p;
                      });
                    }}
                    className="input input-sm w-full"
                    placeholder="Image URL Mobile"
                  />
                  <button
                    onClick={() => {
                      setSection((p) => {
                        p.slides = p.slides || [];
                        p.slides.splice(i, 1);
                        return p;
                      });
                    }}
                    className="btn btn-sm btn-square btn-error opacity-60"
                  >
                    <BiTrash />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
