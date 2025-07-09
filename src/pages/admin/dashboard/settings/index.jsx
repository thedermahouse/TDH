import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import ContactUs from "@/components/admin/home-editor/editors/ContactUs";
import AboutUsSEOEditor from "@/components/admin/seo-editor/AboutUsSEO";
import HomeSEOEditor from "@/components/admin/seo-editor/HomeSEO";
import React from "react";

export default function HomeSections() {
  return (
    <div>
      <AdminPanelWrapper>
        <div className="top-0 sticky bg-gray-900 py-4 z-10">
          <div className="flex justify-between">
            <div>
              <h1 className="font-semibold text-xl">Settings Editor</h1>
            </div>
          </div>
        </div>

        <div role="tablist" className="tabs tabs-bordered">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Contact-us"
          />
          <div role="tabpanel" className="tab-content py-10">
            <ContactUs />
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="Home SEO"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content py-10">
            <HomeSEOEditor />
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab"
            aria-label="About Us SEO"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content py-10">
            <AboutUsSEOEditor />
          </div>
        </div>
      </AdminPanelWrapper>
    </div>
  );
}
