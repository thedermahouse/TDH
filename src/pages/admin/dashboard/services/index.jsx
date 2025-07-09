import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import NewService from "@/components/admin/services/NewService";
import { useDialogProvider } from "@/context/DialogProvider";
import { useQuery } from "@/hooks/useQuery";
import axios from "axios";
import Link from "next/link";
import { TbNewSection, TbEdit, TbTrash } from "react-icons/tb";

const deleteService = (id) => axios.delete(`/api/services/${id}`);

const ServiceItem = ({ service: s, refetch }) => {
  const dialog = useDialogProvider();
  return (
    <div className="bg-base-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 border border-base-300">
      <div className="flex justify-between items-center gap-2">
        <h3 className="font-semibold text-lg flex-1 text-base-content">
          {s.name}
        </h3>
        <div className="flex gap-2">
          <Link
            className="btn btn-ghost btn-xs rounded-full text-primary hover:bg-base-300 btn-circle"
            aria-label="Edit service"
            href={`services/${s.id}/`}
          >
            <TbEdit className="text-xl" />
          </Link>
          <button
            className="btn btn-ghost btn-xs rounded-full text-error hover:bg-base-300 btn-circle"
            aria-label="Delete service"
            onClick={() => {
              dialog({
                open: true,
                title: `Delete ${s.name} service?`,
                content: "Are you sure you want to delete this service?",
                onSubmit: async () => {
                  await deleteService(s.id);
                  refetch();
                },
              });
            }}
          >
            <TbTrash className="text-xl" />
          </button>
        </div>
      </div>
      <p className="text-sm text-base-content mt-2 line-clamp-2 opacity-75">
        {s?.description}
      </p>
    </div>
  );
};

export default function Services() {
  const { data, put, refetch } = useQuery("/api/services");
  return (
    <div className="bg-base-100 min-h-screen">
      <AdminPanelWrapper>
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-semibold text-xl uppercase text-base-content">
              Services
            </h1>
            <div>
              <NewService put={put} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.map((s) => {
              return <ServiceItem key={s.id} service={s} refetch={refetch} />;
            })}
          </div>
        </div>
      </AdminPanelWrapper>
    </div>
  );
}
