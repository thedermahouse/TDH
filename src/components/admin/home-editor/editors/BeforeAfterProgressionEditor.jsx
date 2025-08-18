export default function BeforeAfterProgressionEditor({ section, setSection }) {
  const updateItem = (index, field, value) => {
    setSection((prev) => {
      const prevItems = Array.isArray(prev?.items) ? prev.items : [{}, {}, {}];
      const updatedItems = prevItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prev, items: updatedItems };
    });
  };

  const safeSection = {
    heading: section?.heading || "",
    description: section?.description || "",
    items: Array.isArray(section?.items) ? section.items : [{}, {}, {}],
  };

  return (
    <div>
      {/* Section Heading */}
      <h1 className="font-semibold uppercase mb-4">
        Before / After Progression
      </h1>

      {/* Heading & Description */}
      <input
        value={safeSection.heading}
        onChange={(e) => setSection((p) => ({ ...p, heading: e.target.value }))}
        className="input input-sm w-full mb-3"
        placeholder="Main Heading"
      />
      <textarea
        value={safeSection.description}
        onChange={(e) =>
          setSection((p) => ({ ...p, description: e.target.value }))
        }
        rows={2}
        className="textarea textarea-sm w-full mb-6"
        placeholder="Small Description"
      />

      {/* Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {safeSection.items.map((item, index) => (
          <div key={index} className="border p-3 rounded-lg bg-white shadow-sm">
            <h3 className="font-semibold mb-2">Step {index + 1}</h3>
            <input
              value={item.imageURL || ""}
              onChange={(e) => updateItem(index, "imageURL", e.target.value)}
              className="input input-sm w-full mb-2"
              placeholder="Image URL"
            />
            <input
              value={item.title || ""}
              onChange={(e) => updateItem(index, "title", e.target.value)}
              className="input input-sm w-full mb-2"
              placeholder="Title"
            />
            <textarea
              value={item.content || ""}
              onChange={(e) => updateItem(index, "content", e.target.value)}
              rows={3}
              className="textarea textarea-sm w-full"
              placeholder="Description"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
