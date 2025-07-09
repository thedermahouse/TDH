import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import { useDialogProvider } from "@/context/DialogProvider";
import { useQuery } from "@/hooks/useQuery";
import axios from "axios";
import { BsPencil, BsPlusCircle, BsTrash } from "react-icons/bs";

const AddNewTestimonial = ({ put }) => {
  const { data } = useQuery("/api/services/sub-services");
  const ss = data?.map((a) => ({ val: a.id, option: a.name })) || [];
  const dialog = useDialogProvider();

  return (
    <button
      className="btn btn-sm"
      onClick={() => {
        dialog({
          open: true,
          title: `Add new testimonial`,
          form: [
            {
              type: "input",
              label: "Author",
              name: "author",
              optional: false,
            },
            {
              type: "textarea",
              label: "Content",
              name: "content",
              optional: false,
              rows: 4,
            },
            {
              type: "select",
              label: "Sub Service",
              name: "subServiceId",
              options: ss,
              optional: true,
            },
          ],
          onSubmit: async (data) => {
            await put(data);
          },
        });
      }}
    >
      <span>
        <BsPlusCircle />
      </span>
      <span>Add New</span>
    </button>
  );
};

const TestimonialCard = ({ testimonial: t, refetch }) => {
  const {
    data: testimonial,
    patch,
    del,
    isLoading,
  } = useQuery(`/api/testimonials/${t.id}`);
  const { data: ssd } = useQuery("/api/services/sub-services");
  const ss = ssd?.map((a) => ({ val: a.id, option: a.name })) || [];
  const { content, author, subServiceId } = testimonial || {};
  const dialog = useDialogProvider();

  return (
    <div className="card card-sm bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200 relative overflow-hidden">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">{author}</h3>
          </div>
          <div className="flex justify-between gap-2">
            <button
              onClick={() => {
                dialog({
                  open: true,
                  title: `Edit Testimonial ${author}`,
                  form: [
                    {
                      type: "input",
                      label: "Author",
                      value: author,
                      name: "author",
                      optional: false,
                    },
                    {
                      type: "textarea",
                      label: "Content",
                      value: content,
                      name: "content",
                      optional: false,
                      rows: 4,
                    },
                    {
                      type: "select",
                      label: "Sub Service",
                      value: subServiceId || "",
                      name: "subServiceId",
                      options: ss,
                      optional: true,
                    },
                  ],
                  onSubmit: async (data) => {
                    await patch(data);
                    refetch();
                  },
                });
              }}
              className="btn btn-ghost btn-circle btn-xs"
            >
              <BsPencil className="inline-block" />
            </button>
            <button
              onClick={() => {
                dialog({
                  open: true,
                  title: `Delete Testimonial ${author}`,
                  onSubmit: async () => {
                    await del();
                    refetch();
                  },
                });
              }}
              className="btn btn-ghost btn-circle btn-xs"
            >
              <BsTrash className="inline-block" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-50">{content}</p>
      </div>
      {isLoading && (
        <div className="absolute top-0 left-0 right-0 bottom-0 ac bg-black/50 backdrop-blur-sm">
          <span className="loading"></span>
        </div>
      )}
    </div>
  );
};

export default function Testimonials() {
  const { data, put, refetch } = useQuery("/api/testimonials");
  return (
    <div className="bg-base-100 min-h-screen">
      <AdminPanelWrapper>
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-semibold text-xl uppercase text-base-content">
              Testimonials
            </h1>
            <div>
              <AddNewTestimonial put={put} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.data?.map((t) => {
              return (
                <TestimonialCard key={t.id} testimonial={t} refetch={refetch} />
              );
            })}
          </div>
        </div>
      </AdminPanelWrapper>
    </div>
  );
}
