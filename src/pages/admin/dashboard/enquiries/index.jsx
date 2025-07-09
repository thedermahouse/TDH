import React, { useState } from "react";
import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import { useQuery } from "@/hooks/useQuery";
import EnquiriesTable from "@/app/contact-us/EnquiriesTable";

export default function HomeSections() {
  const { data, del } = useQuery("/api/enquiry");

  return (
    <div>
      <AdminPanelWrapper>
        <div>
          <h1 className="font-semibold text-xl">Enquiries</h1>
        </div>
        <div className="py-10">
          <EnquiriesTable data={data} del={del} />
        </div>
      </AdminPanelWrapper>
    </div>
  );
}
