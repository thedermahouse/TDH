import { BiTrash } from "react-icons/bi";
import { GoPlus } from "react-icons/go";

export default function ContentMediaManager({ section, setSection }) {
  // Add new content entry
  const addNewContent = () => {
    setSection((prev) => ({
      ...prev,
      content: [...(prev?.content || []), { title: "", description: "" }],
    }));
  };

  // Add new image media
  const addNewImage = () => {
    setSection((prev) => ({
      ...prev,
      media: [...(prev?.media || []), { type: "image", url: "" }],
    }));
  };

  // Add new video media
  const addNewVideo = () => {
    setSection((prev) => ({
      ...prev,
      media: [...(prev?.media || []), { type: "video", url: "" }],
    }));
  };

  // Update content fields
  const updateContent = (index, field, value) => {
    setSection((prev) => {
      const newContent = [...(prev.content || [])];
      newContent[index] = { ...newContent[index], [field]: value };
      return { ...prev, content: newContent };
    });
  };

  // Update media URL
  const updateMedia = (index, value) => {
    setSection((prev) => {
      const newMedia = [...(prev.media || [])];
      newMedia[index] = { ...newMedia[index], url: value };
      return { ...prev, media: newMedia };
    });
  };

  // Delete content entry
  const deleteContent = (index) => {
    setSection((prev) => {
      const newContent = [...(prev.content || [])];
      newContent.splice(index, 1);
      return { ...prev, content: newContent };
    });
  };

  // Delete media entry
  const deleteMedia = (index) => {
    setSection((prev) => {
      const newMedia = [...(prev.media || [])];
      newMedia.splice(index, 1);
      return { ...prev, media: newMedia };
    });
  };

  return (
    <div className="p-4">
      {/* Main Title and Description */}
      <div className="mb-4">
        <input
          type="text"
          value={section?.mainTitle || ""}
          onChange={(e) =>
            setSection((prev) => ({ ...prev, mainTitle: e.target.value }))
          }
          className="input input-sm w-full mb-2 font-semibold uppercase"
          placeholder="Main Title"
        />
        <textarea
          value={section?.mainDescription || ""}
          onChange={(e) =>
            setSection((prev) => ({ ...prev, mainDescription: e.target.value }))
          }
          className="input input-sm w-full h-20"
          placeholder="Main Description"
        />
      </div>

      {/* Left and Right Sections */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left: Content Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="m-0 font-semibold uppercase">Content</h2>
            <button onClick={addNewContent} className="btn btn-sm">
              <span>
                <GoPlus />
              </span>
              <span>New Content</span>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {section?.content?.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateContent(i, "title", e.target.value)}
                    className="input input-sm w-full mb-2"
                    placeholder="Content Title"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) =>
                      updateContent(i, "description", e.target.value)
                    }
                    className="input input-sm w-full h-16"
                    placeholder="Content Description"
                  />
                </div>
                <button
                  onClick={() => deleteContent(i)}
                  className="btn btn-sm btn-square btn-error opacity-60"
                >
                  <BiTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Media Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="m-0 font-semibold uppercase">Media</h2>
            <div className="flex gap-2">
              <button onClick={addNewImage} className="btn btn-sm">
                <span>
                  <GoPlus />
                </span>
                <span>New Image</span>
              </button>
              <button onClick={addNewVideo} className="btn btn-sm">
                <span>
                  <GoPlus />
                </span>
                <span>New Video</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {section?.media?.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => updateMedia(i, e.target.value)}
                  className="input input-sm w-full"
                  placeholder={`${
                    item.type === "image" ? "Image" : "Video"
                  } URL`}
                />
                <button
                  onClick={() => deleteMedia(i)}
                  className="btn btn-sm btn-square btn-error opacity-60"
                >
                  <BiTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
