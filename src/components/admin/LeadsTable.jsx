import React from "react";
import { BsTrash3 } from "react-icons/bs";
import { useDialogProvider } from "@/context/DialogProvider";

export default function LeadsTable({ data, del }) {
  const dialog = useDialogProvider();

  const handleDelete = async (id) => {
    await del({ id });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-lg">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Postcode</th>
            <th>Treatment Interest</th>
            <th>Start Plan</th>
            <th>Callback Time</th>
            <th>Doctor Note</th>
            <th>Landing Page</th>
            <th>Date Submitted</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((lead, index) => (
            <tr key={lead.id}>
              <td>{index + 1}</td>
              <td>{lead.fullName}</td>
              <td>{lead.phone}</td>
              <td>{lead.postcode}</td>
              <td>{lead.treatmentInterest}</td>
              <td>{lead.startPlan}</td>
              <td>{lead.callbackTime}</td>
              <td>{lead.doctorNote || "-"}</td>
              <td>
                <span className="badge badge-primary">{lead.landingPage}</span>
              </td>
              <td>
                {lead.createdAt
                  ? new Date(lead.createdAt).toLocaleString()
                  : "-"}
              </td>
              <td>
                <button
                  className="btn btn-ghost btn-xs text-error"
                  onClick={() => handleDelete(lead.id)}
                  title="Delete"
                >
                  <BsTrash3 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
