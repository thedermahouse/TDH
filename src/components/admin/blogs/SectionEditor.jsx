import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import SectionsRender from "../home-editor/SectionsRender";
import rp from "@/lib/functions/rp";

export default function SectionEditor({ sections: sSections, patch }) {
  const [sections, setSections] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize sections with proper defaults
  useEffect(() => {
    setSections(
      rp(sSections || []).map((section) => ({
        title: section.title || "",
        content: section.content || "",
        ...section,
      }))
    );
  }, [sSections]);

  const dataChanged =
    JSON.stringify(sections) !== JSON.stringify(sSections || []);

    const handleSave = async () => {
      setIsSaving(true);
      try {
        const response = await patch({ content: sections }); // Send as 'content'
        if (response?.data?.content) {
          setSections(response.data.content); // Update with returned data
        }
      } catch (error) {
        console.error("Save failed:", error);
      } finally {
        setIsSaving(false);
      }
    };

  return (
    <div>
      <div className="mb-6 w-full flex justify-end space-x-3">
        <button
          className="btn btn-info btn-sm"
          onClick={() => {
            setSections([
              ...sections,
              {
                title: "",
                content: "",
                // other default values
              },
            ]);
          }}
        >
          <CiCirclePlus />
          <span>New Section</span>
        </button>
        <button
          className="btn btn-content btn-sm"
          disabled={!dataChanged || isSaving}
          onClick={handleSave}
        >
          {isSaving ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <IoSaveOutline />
          )}
          <span>Save</span>
        </button>
      </div>
      <div>
        <SectionsRender
          admin={true}
          sections={sections}
          setPart={(p) => {
            const { sections: s } = p({ sections });
            setSections(rp(s));
          }}
        />
      </div>
    </div>
  );
}
