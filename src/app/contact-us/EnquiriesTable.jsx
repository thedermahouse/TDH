import React from "react";
import { useState } from "react";
import { useDialogProvider } from "@/context/DialogProvider";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";

export default function EnquiriesTable({ data, del }) {
  const [expandedStates, setExpandedStates] = useState({});
  const dialog = useDialogProvider();

  const getShortMessage = (message) => {
    if (!message) return "";
    const words = message.split(" ");
    if (words.length > 1) {
      return words.slice(0, 1).join(" ") + "....";
    }
    return message;
  };

  const toggleMessage = (index, message) => {
    setExpandedStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    if (!expandedStates[index]) {
      dialog({
        open: true,
        title: "Full Message",
        content: message,
      });
    }
  };

  const handleDeleteEnquiry = async (id) => {
    const res = await del({ id: id });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-lg">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th className="text-center">Message</th>
              <th>Enquiry From</th>
              <th>UTM Source</th>
              <th>UTM Medium</th> 
              <th>UTM Campaign</th>
              <th>UTM Term</th>
              <th>UTM Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((enquiry, index) => (
              <tr key={index}>
  <th>{index + 1}</th>
  <td>{enquiry?.firstName}</td>
  <td>{enquiry?.email}</td>
  <td>{enquiry?.phone}</td>
  <td>
    <div className="flex flex-col items-center">
      <div>
        {expandedStates[index] ? "" : getShortMessage(enquiry?.message)}
      </div>
      {enquiry?.message && enquiry.message.split(" ").length > 1 && (
        <button
          onClick={() => toggleMessage(index, enquiry?.message)}
          className="btn btn-xs mt-2"
        >
          show more
        </button>
      )}
    </div>
  </td>
  <td>
    <span
      className={`${
        enquiry?.enquiry_from ? "badge badge-primary" : ""
      }`}
    >
      {enquiry?.enquiry_from}
    </span>
  </td>
  <td>{enquiry?.utm_source || "-"}</td>
  <td>{enquiry?.utm_medium || "-"}</td>
  <td>{enquiry?.utm_campaign || "-"}</td>
  <td>{enquiry?.utm_term || "-"}</td>
  <td>{enquiry?.utm_content || "-"}</td>
  <td>
    <button
      onClick={() => {
        dialog({
          open: true,
          title: `Delete Enquiry?`,
          onSubmit: async () => {
            handleDeleteEnquiry(enquiry?.id);
          },
        });
      }}
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
    </div>
  );
}
