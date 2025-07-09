import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import NewBlog from "@/components/admin/blogs/NewBlogs";
import { useDialogProvider } from "@/context/DialogProvider";
import { useQuery } from "@/hooks/useQuery";
import axios from "axios";
import Link from "next/link";
import { TbEdit, TbTrash } from "react-icons/tb";

const deleteBlog = (id) => axios.delete(`/api/blogs/${id}`);

const BlogItem = ({ blog, refetch }) => {
  const dialog = useDialogProvider();
  return (
    <div className="bg-base-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 border border-base-300">
      <div className="flex justify-between items-center gap-2">
        <h3 className="font-semibold text-lg flex-1 text-base-content">
          {blog.title}
        </h3>
        <div className="flex gap-2">
          <Link
            className="btn btn-ghost btn-xs rounded-full text-primary hover:bg-base-300 btn-circle"
            aria-label="Edit blog"
            href={`blogs/${blog.id}`}
          >
            <TbEdit className="text-xl" />
          </Link>
          <button
            className="btn btn-ghost btn-xs rounded-full text-error hover:bg-base-300 btn-circle"
            aria-label="Delete blog"
            onClick={() => {
              dialog({
                open: true,
                title: `Delete ${blog.title}?`,
                content: "Are you sure you want to delete this blog?",
                onSubmit: async () => {
                  await deleteBlog(blog.id);
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
        {blog.description}
      </p>
    </div>
  );
};

export default function Blogs() {
  const { data, post, refetch } = useQuery("/api/blogs");

  return (
    <div className="bg-base-100 min-h-screen">
      <AdminPanelWrapper>
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-semibold text-xl uppercase text-base-content">
              Blogs
            </h1>
            <NewBlog post={post} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.map((blog) => (
              <BlogItem key={blog.id} blog={blog} refetch={refetch} />
            ))}
          </div>
        </div>
      </AdminPanelWrapper>
    </div>
  );
}
