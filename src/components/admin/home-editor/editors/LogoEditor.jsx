import { BiTrash } from "react-icons/bi";
import { GoPlus } from "react-icons/go";

export default function Header({ section, setSection }) {
  const addNewSlide = () => {
    setSection((p) => {
      p.slides = [...(p?.slides || []), {}];
      return p;
    });
  };
  console.log("section", section);

  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <div>
          <h1 className="m-0 font-semibold uppercase">Logos Slider</h1>
        </div>
        <div className="flex gap-2">
          <div className="text-end">
            <div>
              <button onClick={addNewSlide} className="btn btn-sm">
                <span>
                  <GoPlus />
                </span>
                <span>New Logo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
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
                placeholder="Image URL"
              />
              <input
                type="text"
                value={slider.action_url}
                onChange={(e) => {
                  setSection((p) => {
                    p.slides = p.slides || [];
                    p.slides[i].action_url = e.target.value;
                    return p;
                  });
                }}
                className="input input-sm w-full"
                placeholder="Action URL"
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
  );
}
