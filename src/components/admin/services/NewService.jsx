import React from "react";
import { useDialogProvider } from "@/context/DialogProvider";
import { TbNewSection } from "react-icons/tb";

export default function NewService({ put, title }) {
  const dialog = useDialogProvider();

  const addNewService = () => {
    dialog({
      open: true,
      title: "Add New Sub Service",
      form: [
        {
          name: "serviceName",
          type: "text",
          label: "Service Name",
          placeholder: "Enter service name",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Service Description",
          placeholder: "Enter service description",
          required: true,
        },
      ],
      onSubmit: ({ serviceName, description }) => {
        put({ name: serviceName, description });
      },
    });
  };
  return (
    <div>
      <button onClick={addNewService} className="btn btn-primary btn-sm">
        <TbNewSection className="text-xl" />
        <span className="hidden sm:inline">{title || "Add Service"}</span>
      </button>
    </div>
  );
}
