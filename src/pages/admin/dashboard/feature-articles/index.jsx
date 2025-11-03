import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import { useDialogProvider } from "@/context/DialogProvider";
import { useQuery } from "@/hooks/useQuery";
import { BsPlusCircle, BsPencil, BsTrash } from "react-icons/bs";

const AddFeatureArticle = ({ post }) => {
  const dialog = useDialogProvider();

  return (
    <button
      className="btn btn-sm"
      onClick={() => {
        dialog({
          open: true,
          title: "Add New Feature Article",
          form: [
            { type: "input", label: "Title", name: "title", optional: false },
            { type: "input", label: "Image URL", name: "image", optional: false },
            { type: "input", label: "Article Link", name: "link", optional: false },
            { type: "date", label: "Date", name: "date", optional: false },
          ],
          onSubmit: async (data) => {
            await post(data); // ✅ correct method
          },
        });
      }}
    >
      <BsPlusCircle /> <span>Add New</span>
    </button>
  );
};


const ArticleCard = ({ article, refetch }) => {
  const { data, patch, del, isLoading } = useQuery(
    `/api/feature-articles/${article.id}`
  );
  const { title, image, date, link } = data || {};
  const dialog = useDialogProvider();

  return (
    <div className="card card-sm bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200 relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="card-body">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">
          {date ? new Date(date).toLocaleDateString() : "—"}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm underline"
        >
          Read More
        </a>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => {
              dialog({
                open: true,
                title: `Edit Article - ${title}`,
                form: [
                  {
                    type: "input",
                    label: "Title",
                    name: "title",
                    value: title,
                  },
                  {
                    type: "input",
                    label: "Image URL",
                    name: "image",
                    value: image,
                  },
                  {
                    type: "input",
                    label: "Article Link",
                    name: "link",
                    value: link,
                  },
                  {
                    type: "date",
                    label: "Date",
                    name: "date",
                    value: date ? date.split("T")[0] : "",
                  },
                ],
                onSubmit: async (data) => {
                  await patch(data);
                  refetch();
                },
              });
            }}
            className="btn btn-ghost btn-xs"
          >
            <BsPencil />
          </button>

          <button
            onClick={() => {
              dialog({
                open: true,
                title: `Delete Article - ${title}`,
                onSubmit: async () => {
                  await del();
                  refetch();
                },
              });
            }}
            className="btn btn-ghost btn-xs"
          >
            <BsTrash />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <span className="loading"></span>
        </div>
      )}
    </div>
  );
};

export default function FeatureArticles() {
  const { data, post, refetch } = useQuery("/api/feature-articles");

  return (
    <div className="bg-base-100 min-h-screen">
      <AdminPanelWrapper>
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-semibold text-xl uppercase">Feature Articles</h1>
          <AddFeatureArticle post={post} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((a) => (
            <ArticleCard key={a.id} article={a} refetch={refetch} />
          ))}
        </div>
      </AdminPanelWrapper>
    </div>
  );
}

