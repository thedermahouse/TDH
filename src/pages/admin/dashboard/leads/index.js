import React from "react";
import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import { useQuery } from "@/hooks/useQuery";
import LeadsTable from "@/components/admin/LeadsTable";

export default function LeadsPage() {
  const { data, del } = useQuery("/api/leads");

  return (
    <AdminPanelWrapper>
      <h1 className="font-semibold text-xl">Leads</h1>
      <div className="py-10">
        <LeadsTable data={data} del={del} />
      </div>
    </AdminPanelWrapper>
  );
}
