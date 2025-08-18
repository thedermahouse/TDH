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
            <th>Mobile</th>
            <th>Email</th>
            <th>Location</th>
            <th>Message</th>
            <th>Landing Page</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((lead, index) => (
            <tr key={lead.id}>
              <td>{index + 1}</td>
              <td>{lead.fullName}</td>
              <td>{lead.mobile}</td>
              <td>{lead.email}</td>
              <td>{lead.location}</td>
              <td>{lead.message || "-"}</td>
              <td>
                <span className="badge badge-primary">{lead.landingPage}</span>
              </td>
              <td>
                <button
                  onClick={() =>
                    dialog({
                      open: true,
                      title: "Delete Lead?",
                      onSubmit: () => handleDelete(lead.id),
                    })
                  }
                  className="btn btn-error btn-xs"
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
