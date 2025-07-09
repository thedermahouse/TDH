import usePart from "@/hooks/usePart";

export default function FooterNavEditor({ section, setSection }) {
  console.log("Current section:", section);
  const { part } = usePart("NAVIGATION");
  const initialLinks = part?.links ?? [];

  const links =
    section?.links ||
    initialLinks.map((link) => ({
      ...link,
      isVisible: link.isVisible !== undefined ? link.isVisible : true,
    }));

  const handleToggle = (index) => {
    setSection((prevState) => {
      if (!prevState || !prevState.links) {
        return {
          links: links.map((link, i) => ({
            ...link,
            isVisible: i === index ? !link.isVisible : link.isVisible !== false,
          })),
        };
      }

      const updatedLinks = prevState.links.map((link, i) => {
        if (i === index) {
          return { ...link, isVisible: !link.isVisible };
        }
        return link;
      });
      return { ...prevState, links: updatedLinks };
    });
  };

  return (
    <div className="border p-3 rounded-lg border-gray-500">
      <div className="w-full flex justify-between px-4 mb-4">
        <div className="font-bold">Footer Nav Editor</div>
      </div>

      <div className="p-4">
        {links.length === 0 ? (
          <div className="text-center text-gray-500">No navigation items</div>
        ) : (
          <div className="space-y-4">
            {links.map((link, index) => (
              <div key={index} className="flex items-center gap-3">
                <label className="label cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={link.isVisible !== false}
                    onChange={() => handleToggle(index)}
                  />
                  <span className="label-text">{link.title}</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
