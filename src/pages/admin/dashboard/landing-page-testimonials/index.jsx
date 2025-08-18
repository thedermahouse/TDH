  import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
  import { useDialogProvider } from "@/context/DialogProvider";
  import { useQuery } from "@/hooks/useQuery";
  import { BsPencil, BsPlusCircle, BsTrash } from "react-icons/bs";

  const AddNewLandingTestimonial = ({ put }) => {
    const dialog = useDialogProvider();

    const openForm = async () => {
      try {
        const res = await fetch("/api/landing-pages");
        const landingPages = await res.json();

        // Ensure we always work with an array of valid {id, title}
        const validLandingPages = (
          Array.isArray(landingPages) ? landingPages : []
        )
          .filter(
            (lp) =>
              lp?.id != null && typeof lp.title === "string" && lp.title.trim()
          )
          .map((lp) => ({ id: lp.id, title: lp.title.trim() }));

        const uniqueLandingPages = Array.from(
          new Map(validLandingPages.map((lp) => [lp.id, lp])).values()
        );
        console.log("Select options:", [
          { label: "General / All", value: "" },
          ...uniqueLandingPages.map((lp) => ({
            label: lp.title,
            value: String(lp.id),
          })),
        ]);

        dialog({
          open: true,
          title: `Add new landing testimonial`,
          form: [
            { type: "input", label: "Author", name: "author", optional: false },
            {
              type: "textarea",
              label: "Content",
              name: "content",
              optional: false,
              rows: 4,
            },
            { type: "input", label: "Image URL", name: "image", optional: true },
            { type: "input", label: "Date", name: "date", optional: true },
            {
              type: "select",
              label: "Landing Page",
              name: "landingPageId",
              options: [
                { label: "General / All", value: "" },
                ...uniqueLandingPages.map((lp) => ({
                  label: lp.title,
                  value: String(lp.id),
                })),
              ],
              optional: true,
            },
            ,
          ],
          onSubmit: async (data) => {
            await put({
              ...data,
              landingPageId: data.landingPageId
                ? Number(data.landingPageId)
                : null,
            });
          },
        });
      } catch (err) {
        console.error("Failed to load landing pages:", err);
        dialog({
          open: true,
          title: "Error",
          message: "Could not load landing pages. Please try again later.",
        });
      }
    };

    return (
      <button className="btn btn-sm" onClick={openForm}>
        <BsPlusCircle /> <span>Add New</span>
      </button>
    );
  };

  const LandingTestimonialCard = ({ testimonial: t, refetch }) => {
    const {
      data: testimonial,
      patch,
      del,
      isLoading,
    } = useQuery(`/api/landing-testimonials/${t.id}`);
    const { content, author, image, date } = testimonial || {};
    const dialog = useDialogProvider();

    return (
      <div className="card bg-base-100 shadow-md relative">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{author}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  dialog({
                    open: true,
                    title: `Edit Landing Testimonial`,
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
                        type: "input",
                        label: "Image URL",
                        value: image || "",
                        name: "image",
                        optional: true,
                      },
                      {
                        type: "input",
                        label: "Date",
                        value: date || "",
                        name: "date",
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
                <BsPencil />
              </button>
              <button
                onClick={() => {
                  dialog({
                    open: true,
                    title: `Delete Landing Testimonial`,
                    onSubmit: async () => {
                      await del();
                      refetch();
                    },
                  });
                }}
                className="btn btn-ghost btn-circle btn-xs"
              >
                <BsTrash />
              </button>
            </div>
          </div>
          <p className="text-sm">{content}</p>
        </div>
        {isLoading && (
          <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
            <span className="loading"></span>
          </div>
        )}
      </div>
    );
  };

  export default function LandingPageTestimonialsAdmin() {
    const { data, put, refetch } = useQuery("/api/landing-testimonials");

    return (
      <div className="bg-base-100 min-h-screen">
        <AdminPanelWrapper>
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-semibold text-xl uppercase">
                Landing Page Testimonials
              </h1>
              <AddNewLandingTestimonial put={put} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.data?.map((t) => (
                <LandingTestimonialCard
                  key={t.id}
                  testimonial={t}
                  refetch={refetch}
                />
              ))}
            </div>
          </div>
        </AdminPanelWrapper>
      </div>
    );
  }
