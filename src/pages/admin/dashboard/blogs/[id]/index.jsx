import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import SectionEditor from "@/components/admin/blogs/SectionEditor"; // Reuse or create new
import DialogProvider, { useDialogProvider } from "@/context/DialogProvider";
import { useQuery } from "@/hooks/useQuery";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsArrowLeftSquare, BsPencilSquare } from "react-icons/bs";
import { TbExternalLink } from "react-icons/tb";

const EditBlog = ({ blogDetails, patch }) => {
  const dialog = useDialogProvider();

  return (
    <button
      onClick={() => {
        dialog({
          open: true,
          form: [
            {
              name: "title",
              type: "text",
              label: "Blog Title",
              value: blogDetails.title,
              required: true,
            },
            {
              name: "slug",
              type: "text",
              label: "Blog Slug",
              value: blogDetails.slug,
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              label: "Blog Description",
              value: blogDetails.description,
              required: true,
            },
            {
              name: "metaTitle",
              type: "text",
              label: "Meta Title",
              value: blogDetails.metaTitle || "",
              required: false,
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: "Meta Description",
              value: blogDetails.metaDescription || "",
              required: false,
            },
            {
              name: "imageURL",
              type: "text",
              label: "Blog Image URL",
              value: blogDetails.imageURL,
              required: false,
            },
            {
              name: "imageDescription",
              type: "textarea",
              label: "Image Description",
              value: blogDetails.imageDescription,
              required: false,
            },
            {
              name: "isPublished",
              type: "text",
              label: "Publish Blog",
              value: blogDetails.isPublished,
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
      <BsPencilSquare />
      <span>Edit</span>
    </button>
  );
};

export default function BlogDetails() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: blogData,
    patch,
    isLoading: loading,
    error,
    refetch, // Add refetch to destructuring
  } = useQuery(id ? `/api/blogs/${id}` : null);

  // Handle loading and error states
  if (!id || id === "undefined") return <div>Loading...</div>;
  if (loading) return <div>Loading blog data...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!blogData) return <div>Blog not found</div>;
  return (
    <div className="bg-base-100 min-h-screen">
      <DialogProvider>
        <AdminPanelWrapper>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center mb-8 gap-2">
              <Link
                className="flex items-center gap-3"
                href="/admin/dashboard/blogs"
                aria-label="Back"
              >
                <span className="btn btn-ghost btn-square text-base-content text-5xl">
                  <BsArrowLeftSquare />
                </span>
              </Link>
              <div>
                <h1 className="font-semibold text-xl uppercase text-base-content">
                  <div className="text-xs font-medium">Blogs</div>
                  <Link
                    target="_blank"
                    href={`/blogs/${blogData?.slug}`}
                    className="font-black flex items-center gap-2"
                  >
                    <span>{blogData?.title || "Loading..."}</span>
                    <TbExternalLink />
                  </Link>
                </h1>
              </div>
            </div>
            <EditBlog patch={patch} blogDetails={blogData} />
          </div>
          <div role="tablist" className="tabs tabs-bordered">
            <input
              type="radio"
              name="blog_tabs"
              role="tab"
              className="tab"
              aria-label="Sections"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content py-10">
              <SectionEditor
                sections={blogData?.content || []}
                patch={async (data) => {
                  const response = await patch(data);
                  await refetch(); // Force a refresh after update
                  return response;
                }}
              />
            </div>
          </div>
        </AdminPanelWrapper>
      </DialogProvider>
    </div>
  );
}
