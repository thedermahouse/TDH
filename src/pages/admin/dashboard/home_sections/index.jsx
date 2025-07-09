import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import Section from "@/components/admin/home-editor/Section";
import SectionsRender from "@/components/admin/home-editor/SectionsRender";
import usePart from "@/hooks/usePart";
import { useState } from "react";
import { TbNewSection } from "react-icons/tb";

export default function HomeSections() {
  const { part, setPart, changed, SaveButton } = usePart("HOME");
  const newSection = () => {
    setPart({
      ...part,
      sections: [...(part?.sections || []), {}],
    });
  };
  return (
    <div>
      <AdminPanelWrapper>
        <div>
          <div className="py-3 join join-vertical w-full">
            <div className="top-0 sticky bg-gray-900 py-4 z-10">
              <div className="flex justify-between">
                <div>
                  <h1 className="font-semibold text-xl">Home Editor</h1>
                </div>
                <div className="flex gap-3">
                  <SaveButton />
                  <button onClick={newSection} className="btn btn-sm btn-info">
                    <span className="text-xl">
                      <TbNewSection />
                    </span>
                    <span>Add Section</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="divider"></div>
            <SectionsRender
              sections={part?.sections}
              admin={true}
              setPart={setPart}
            />
          </div>
        </div>
      </AdminPanelWrapper>
    </div>
  );
}
