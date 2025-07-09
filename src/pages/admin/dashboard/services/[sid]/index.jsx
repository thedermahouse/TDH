import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import NewService from "@/components/admin/services/NewService";
import { useQuery } from "@/hooks/useQuery";
import Link from "next/link";
import { useRouter } from "next/router";
import { TbEdit, TbTrash } from "react-icons/tb";
import { BsArrowLeftSquare, BsPencilSquare } from "react-icons/bs";
import DialogProvider, { useDialogProvider } from "@/context/DialogProvider";
import axios from "axios";
import { TbSection } from "react-icons/tb";
import { TbExternalLink } from "react-icons/tb";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";

const deleteSubService = (service_id, sub_service_id) =>
  axios.delete(`/api/services/${service_id}/sub-services/${sub_service_id}`);

const editSubService = (service_id, sub_service_id, data) =>
  axios.patch(
    `/api/services/${service_id}/sub-services/${sub_service_id}`,
    data
  );

const SubServiceItem = ({ service: s, refetch }) => {
  const dialog = useDialogProvider();

  const decrementPriority = async () => {
    await axios.post(`/api/services/${s.serviceId}/sub-services/${s.id}`, {
      action: "decrement_priority",
    });
    refetch();
  };

  const incrementPriority = async () => {
    await axios.post(`/api/services/${s.serviceId}/sub-services/${s.id}`, {
      action: "increment_priority",
    });
    refetch();
  };

  return (
    <div className="bg-base-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 border border-base-200 relative group">
      <div className="flex justify-between items-center gap-2">
        <h3 className="font-semibold text-lg flex-1 text-base-content">
          {s.name}
        </h3>
        <div className="flex gap-2">
          <div>
            <input
              type="checkbox"
              className="toggle toggle-xs toggle-primary"
              checked={s.isShow}
              onChange={async (e) => {
                await editSubService(s.serviceId, s.id, {
                  isShow: e.target.checked,
                });
                refetch();
              }}
            />
          </div>
          <button
            className="btn btn-ghost btn-xs rounded-full text-primary hover:bg-base-300 btn-circle"
            aria-label="Edit service"
            onClick={() => {
              dialog({
                open: true,
                form: [
                  {
                    name: "name",
                    type: "text",
                    label: "Sub Service Name",
                    value: s.name,
                    required: true,
                  },
                  {
                    name: "title",
                    type: "text",
                    label: "Service title",
                    value: s.title,
                    required: false,
                  },
                  {
                    name: "metaTitle",
                    type: "text",
                    label: "Meta Title",
                    value: s.metaTitle || "",
                    required: false,
                  },
                  {
                    name: "metaDescription",
                    type: "textarea",
                    label: "Meta Description",
                    value: s.metaDescription || "",
                    required: false,
                  },
                  {
                    name: "description",
                    type: "textarea",
                    label: "Sub Service Description",
                    value: s.description,
                    required: true,
                  },
                  {
                    name: "subServicePageDescription",
                    type: "textarea",
                    label: "Sub-Service Page Description",
                    value: s.subServicePageDescription,
                    required: false,
                  },
                  {
                    name: "servicePageImageURL",
                    type: "text",
                    label: "Sub Service Page Image URL",
                    value: s.servicePageImageURL,
                    required: false,
                  },
                  {
                    name: "subServicePageImage1URL",
                    type: "text",
                    label: "Sub Service Page Image 1 URL",
                    value: s.subServicePageImage1URL,
                    required: false,
                  },
                  {
                    name: "subServicePageImage2URL",
                    type: "text",
                    label: "Sub Service Page Image 2 URL",
                    value: s.subServicePageImage2URL,
                    required: false,
                  },
                  {
                    name: "actionUrl",
                    type: "text",
                    label: "actionUrl",
                    value: s.actionUrl || "-",
                    required: false,
                  },
                ],
                onSubmit: async (data) => {
                  await editSubService(s.serviceId, s.id, data);
                  refetch();
                },
              });
            }}
          >
            <TbEdit className="text-xl" />
          </button>
          <Link
            href={`/admin/dashboard/services/${s.serviceId}/sub-service/${s.id}`}
            className="btn btn-ghost btn-xs rounded-full text-secondary hover:bg-base-300 btn-circle"
            aria-label="Edit service"
          >
            <TbSection className="text-xl" />
          </Link>
          <button
            className="btn btn-ghost btn-xs rounded-full text-error hover:bg-base-300 btn-circle"
            aria-label="Delete service"
            onClick={async () => {
              dialog({
                open: true,
                content: "Are you sure you want to delete this sub-service?",
                onSubmit: async () => {
                  await deleteSubService(s.serviceId, s.id);
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
        {s.description}
      </p>

      <div className="flex gap-2 absolute -top-2 left-2 opacity-0 group-hover:opacity-100 transition-all">
        <button
          className="btn btn-success btn-xs btn-circle "
          onClick={decrementPriority}
        >
          <TfiAngleLeft />
        </button>
        <button
          className="btn btn-success btn-xs btn-circle "
          onClick={incrementPriority}
        >
          <TfiAngleRight />
        </button>
      </div>
    </div>
  );
};

const EditService = ({ serviceDetails: s, patch }) => {
  const dialog = useDialogProvider();

  return (
    <button
      onClick={() => {
        dialog({
          open: true,
          form: [
            {
              name: "name",
              type: "text",
              label: "Service Name",
              value: s.name,
              required: true,
            },
            {
              name: "title",
              type: "text",
              label: "Service title",
              value: s.title,
              required: false,
            },
            {
              name: "description",
              type: "textarea",
              label: "Service Description",
              value: s.description,
              required: true,
            },
            {
              name: "metaTitle",
              type: "text",
              label: "Meta Title",
              value: s.metaTitle || "",
              required: false,
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: "Meta Description",
              value: s.metaDescription || "",
              required: false,
            },
            {
              name: "homePageImageURL",
              type: "text",
              label: "Home Page Image URL",
              value: s.homePageImageURL,
              required: false,
            },
            {
              name: "servicePageImage1URL",
              type: "text",
              label: "Service Page Image 1 URL",
              value: s.servicePageImage1URL,
              required: false,
            },
            {
              name: "servicePageImage1Description",
              type: "textarea",
              label: "Service Page Image 1 Description",
              value: s.servicePageImage1Description,
              required: false,
            },
            {
              name: "servicePageImage2URL",
              type: "text",
              label: "Service Page Image 2 URL",
              value: s.servicePageImage2URL,
              required: false,
            },
            {
              name: "servicePageDescription",
              type: "textarea",
              label: "Service Page Description",
              value: s.servicePageDescription,
              required: false,
            },
            {
              name: "servicePageSubServiceTitle",
              type: "text",
              label: "Sub-Service Title",
              value: s.servicePageSubServiceTitle,
              required: false,
            },
            {
              name: "faqImageURL",
              type: "text",
              label: "FAQ Image URL",
              value: s.faqImageURL,
              required: false,
            },
            {
              name: "servicePageSubServiceDescription",
              type: "textarea",
              label: "Sub-Service Description",
              value: s.servicePageSubServiceDescription,
              required: false,
            },
          ],
          onSubmit: async (data) => {
            await patch(data);
          },
        });
      }}
      className="btn btn-content btn-sm btn-outline"
    >
      <span>
        <BsPencilSquare />
      </span>
      <span>Edit</span>
    </button>
  );
};

export default function ServicesDetails() {
  const router = useRouter();
  const { sid = 1 } = router.query;
  const {
    data: sData,
    refetch: refetchS,
    patch: patchService,
  } = useQuery(`/api/services/${sid}`);

  const {
    data: ssData,
    put,
    patch,
    refetch: refetchSS,
  } = useQuery(`/api/services/${sid}/sub-services`);

  return (
    <div className="bg-base-100 min-h-screen">
      <DialogProvider>
        <AdminPanelWrapper>
          <>
            <div className="flex justify-between">
              <div className="flex justify-start items-center mb-8 gap-2">
                <Link
                  className="flex items-center gap-3"
                  href="/admin/dashboard/services"
                  aria-label="Back"
                >
                  <span className="btn btn-ghost btn-square text-base-content text-5xl">
                    <BsArrowLeftSquare />
                  </span>
                </Link>
                <div>
                  <h1 className="font-semibold text-xl uppercase text-base-content">
                    <div className="text-xs font-medium">Services</div>
                    <Link
                      target="_blank"
                      href={`/services/${sData?.name}/`.replaceAll(" ", "-")}
                      className="font-black flex items-center gap-2"
                    >
                      <span>{sData?.name || "Loading..."}</span>
                      <span>
                        <TbExternalLink />
                      </span>
                    </Link>
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <EditService
                  patch={patchService}
                  title="Edit Service"
                  serviceDetails={sData}
                />
                <NewService put={put} title="Add Sub Service" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ssData
                ?.sort((a, b) => a.priority - b.priority)
                .map((s) => {
                  return (
                    <SubServiceItem
                      key={s.id}
                      service={s}
                      refetch={refetchSS}
                    />
                  );
                })}
            </div>
          </>
        </AdminPanelWrapper>
      </DialogProvider>
    </div>
  );
}
