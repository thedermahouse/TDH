import homeSectionTypes from "../section-types";

const SectionTypeSelector = ({ setSection }) => {
  return (
    <div className="flex p-3 rounded-lg">
      <div>
        <select
          className="select select-sm"
          onChange={(e) => {
            setSection((p) => {
              p.type = e.target.value;
              return p;
            });
          }}
        >
          <option value="">Select Type</option>
          {Object.keys(homeSectionTypes)
            .filter((type) => !!type)
            .map((type) => {
              const sectionName = type.replace(/-/g, " ");
              return (
                <option key={type} value={type} className="capitalize">
                  {sectionName}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default SectionTypeSelector;
