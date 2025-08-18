// src/components/admin/home-editor/editors/ServiceShowcaseEditor.jsx
"use client";
import { useQuery } from "@/hooks/useQuery";

export default function ServiceShowcaseEditor({ section, setSection }) {
  const { data: services } = useQuery(`/api/services`);

  return (
    <div>
      <h1 className="font-semibold uppercase mb-4">Service Showcase</h1>

      {/* Service Selector */}
      <select
        value={section?.service_id || ""}
        onChange={(e) => setSection((p) => ({ ...p, service_id: e.target.value }))}
        className="select select-sm w-full mb-3"
      >
        <option value="">Select a service</option>
        {services?.map((service) => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>

      {/* Section Title */}
      <input
        type="text"
        value={section?.sectionTitle || ""}
        onChange={(e) => setSection((p) => ({ ...p, sectionTitle: e.target.value }))}
        className="input input-sm w-full mb-3"
        placeholder="Section Title"
      />

      {/* Section Description */}
      <textarea
        value={section?.sectionDescription || ""}
        onChange={(e) => setSection((p) => ({ ...p, sectionDescription: e.target.value }))}
        className="textarea textarea-sm w-full"
        placeholder="Section Description"
      />
    </div>
  );
}
