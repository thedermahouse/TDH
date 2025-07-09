import { BiTrash } from "react-icons/bi";
import { TbFlagPlus } from "react-icons/tb";

export default function AboutUs({ section, setSection }) {
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
          <h1 className="m-0 font-semibold uppercase">About Us</h1>
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
            value={section?.imageURL}
            type="text"
            onChange={(e) => {
              setSection((p) => {
                p.imageURL = e.target.value;
                return p;
              });
            }}
            className="input input-sm w-full"
            placeholder="Image URL"
          />
        </div>
        <div className="w-full col-span-2">
          <textarea
            value={section?.descText}
            type="text"
            onChange={(e) => {
              setSection((p) => {
                p.descText = e.target.value;
                return p;
              });
            }}
            rows={3}
            className="textarea textarea-sm w-full"
            placeholder="Description Text"
          />
        </div>
        <div className="w-full col-span-2">
          <textarea
            value={section?.descText2}
            type="text"
            onChange={(e) => {
              setSection((p) => {
                p.descText2 = e.target.value;
                return p;
              });
            }}
            rows={3}
            className="textarea textarea-sm w-full"
            placeholder="Description Text"
          />
        </div>
      </div>
    </div>
  );
}
