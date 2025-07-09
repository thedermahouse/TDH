import homeSectionTypes from "@/components/admin/home-editor/section-types";
import {
  HiOutlineArrowSmallUp,
  HiOutlineArrowSmallDown,
} from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";

const Section = ({
  section = null,
  setSection = () => null,
  admin = false,
  up,
  index,
  down,
  del,
}) => {
  const sectionType = section?.type || "";
  const Component = homeSectionTypes[sectionType]?.[admin ? "admin" : "home"];
  //null check
  if (!Component) {
    return (
      <div className={`${admin ? "border border-dashed p-3 join-item" : ""}`}>
        {admin && (
          <div className="flex justify-end py-2">
            <div className="flex gap-1">
              <button
                onClick={up}
                disabled={!up}
                className="btn btn-content btn-sm btn-circle"
              >
                <HiOutlineArrowSmallUp />
              </button>
              <button
                onClick={down}
                disabled={!down}
                className="btn btn-content btn-sm btn-circle"
              >
                <HiOutlineArrowSmallDown />
              </button>
              <button onClick={del} className="btn btn-error btn-sm btn-circle">
                <RiDeleteBin5Line />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${admin ? "border border-dashed p-3 join-item" : ""}`}>
      <Component
      index={index}
        {...(admin
          ? {
              section,
              setSection,
            }
          : {
              section,
            })}
      />
      {admin && (
        <div className="flex justify-end py-2">
          <div className="flex gap-1">
            <button
              onClick={up}
              disabled={!up}
              className="btn btn-content btn-sm btn-circle"
            >
              <HiOutlineArrowSmallUp />
            </button>
            <button
              onClick={down}
              disabled={!down}
              className="btn btn-content btn-sm btn-circle"
            >
              <HiOutlineArrowSmallDown />
            </button>
            <button onClick={del} className="btn btn-error btn-sm btn-circle">
              <RiDeleteBin5Line />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
