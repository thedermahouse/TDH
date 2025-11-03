import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import FeaturedArticlesForm from "@/components/admin/FeaturedArticlesForm";
import React from "react";

function articles() {
  return (
    <div className="bg-base-100 min-h-screen">
      <AdminPanelWrapper>
        <FeaturedArticlesForm />
      </AdminPanelWrapper>
    </div>
  );
}

export default articles;
