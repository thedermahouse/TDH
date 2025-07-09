import ContentEditor from "./editors/ContentEditor";
import FooterNavEditor from "./editors/FooterNavEditor";
import FooterSectionTypeSelector from "./editors/FooterSectionTypeSelector";
import LinkEditors from "./editors/LinkEditor";

const footerSectionTypes = {
  links: { admin: LinkEditors, home: <></> },
  content: { admin: ContentEditor, home: <></> },
  Nav: { admin: FooterNavEditor, home: <></> },
  "": { admin: FooterSectionTypeSelector, home: <></> },
};

export default footerSectionTypes;
