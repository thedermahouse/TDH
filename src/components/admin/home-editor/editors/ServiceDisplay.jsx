"use client";
import { useQuery } from "@/hooks/useQuery";
import { BiTrash } from "react-icons/bi";

export default function ServiceDisplay({ section, setSection }) {
  const { data } = useQuery(`/api/services`);
  return (
    <div>
      <div className="mb-2 flex justify-between items-center gap-4">
        <div>
          <h1 className="m-0 font-semibold uppercase">Service display</h1>
        </div>
      </div>
      <div>
        <div className="w-full">
          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="">
              <select
                value={section?.service_id}
                type="text"
                onChange={(e) => {
                  setSection((p) => {
                    p.service_id = e.target.value;
                    return p;
                  });
                }}
                className="select select-sm w-full"
                placeholder="Title"
              >
                <option value="">Select a service</option>
                {data?.map((service) => {
                  return (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <input
                value={section?.sectionTitle}
                type="text"
                onChange={(e) => {
                  setSection((p) => {
                    p.sectionTitle = e.target.value;
                    return p;
                  });
                }}
                className="input input-sm w-full"
                placeholder="Section Title"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <textarea
            value={section?.sectionDescription}
            type="text"
            onChange={(e) => {
              setSection((p) => {
                p.sectionDescription = e.target.value;
                return p;
              });
            }}
            className="textarea w-full"
            placeholder="Section Description"
          />
        </div>
      </div>
    </div>
  );
}
