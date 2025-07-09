import footerSectionTypes from "./footer-section-types";

const FooterSection = ({ section, setSection, admin = false }) => {
  const sectionType = section?.type || "";
  const Component = footerSectionTypes[sectionType]?.[admin ? "admin" : "home"];
  return (
    <div className={`${admin ? "border-b border-dashed p-3 join-item" : ""}`}>
      <Component section={section} setSection={setSection} />
    </div>
  );
};

export default FooterSection;
