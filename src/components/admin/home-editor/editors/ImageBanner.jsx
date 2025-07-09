export default function ImageBanner({ section, setSection }) {
  return (
    <div>
      <div className="mb-2 flex justify-between items-center">
        <div>
          <h1 className="m-0 font-semibold uppercase">Image Banner</h1>
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
        <div className="w-full grid grid-cols-2 gap-3">
          <div>
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
          <div>
            <input
              value={section?.imageURLMobile}
              type="text"
              onChange={(e) => {
                setSection((p) => {
                  p.imageURLMobile = e.target.value;
                  return p;
                });
              }}
              className="input input-sm w-full"
              placeholder="Image URL Mobile"
            />
          </div>
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
            value={section?.buttonURL}
            type="text"
            onChange={(e) => {
              setSection((p) => {
                p.buttonURL = e.target.value;
                return p;
              });
            }}
            className="input input-sm w-full"
            placeholder="Button URL"
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
      </div>
    </div>
  );
}
