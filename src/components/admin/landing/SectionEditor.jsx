import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import SectionsRender from "@/components/admin/home-editor/SectionsRender";
import rp from "@/lib/functions/rp";

export default function SectionEditor({ sections: sSections, patch }) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setSections(rp(sSections));
  }, [sSections]);

  const dataChanged =
    JSON.stringify(sections) !== JSON.stringify(sSections || []);

  return (
    <div>
      <div className="mb-6 w-full flex justify-end space-x-3">
        <button
          className="btn btn-info btn-sm"
          onClick={() => setSections(rp([...sections, {}]))}
        >
          <CiCirclePlus /> <span>New Section</span>
        </button>
        <button
          className="btn btn-content btn-sm"
          disabled={!dataChanged}
          onClick={() => patch({ sections })}
        >
          <IoSaveOutline /> <span>Save</span>
        </button>
      </div>
      <SectionsRender
        admin
        sections={sections}
        setPart={(p) => {
          const { sections: s } = p({ sections });
          setSections(rp(s));
        }}
      />
    </div>
  );
}
