import React from "react";
import { useRouter } from "next/router";
import { useDialogProvider } from "@/context/DialogProvider";
import axios from "axios";
import { TbEdit, TbTrash } from "react-icons/tb";

const deletePage = (id) => axios.delete(`/api/landing-pages/${id}`);
const updatePage = (id, data) => axios.patch(`/api/landing-pages/${id}`, data);

export default function LandingPageItem({ page, refetch }) {
  const dialog = useDialogProvider();
  const router = useRouter();

  return (
    <div className="bg-base-200 rounded-lg p-4 border">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{page.title}</h3>
        <div className="flex gap-2">
          {/* Redirect to sections editor page */}
          <button
            className="btn btn-sm"
            onClick={() => router.push(`/admin/dashboard/landing-pages/${page.id}`)}
          >
            Edit Sections
          </button>

          {/* Edit page meta/data */}
          <button
            className="btn btn-sm"
            onClick={() =>
              dialog({
                open: true,
                title: "Edit Landing Page",
                form: [
                  { name: "title", type: "text", label: "Title", value: page.title, required: true },
                  { name: "description", type: "textarea", label: "Description", value: page.description || "" },
                  { name: "slug", type: "text", label: "Slug (optional)", value: page.slug || "" },
                  { name: "metaTitle", type: "text", label: "Meta Title", value: page.metaTitle || "" },
                  { name: "metaDescription", type: "textarea", label: "Meta Description", value: page.metaDescription || "" },
                  { name: "bannerUrl", type: "text", label: "Banner Image URL", value: page.bannerUrl || "" },
                  { name: "ctaText", type: "text", label: "Call To Action Text", value: page.ctaText || "" },
                  { name: "ctaLink", type: "text", label: "Call To Action Link", value: page.ctaLink || "" },
                  { name: "published", type: "checkbox", label: "Published", value: !!page.published },
                ],
                onSubmit: async (values) => {
                  await updatePage(page.id, values);
                  refetch();
                },
              })
            }
          >
            <TbEdit />
          </button>

          {/* Delete */}
          <button
            className="btn btn-sm text-error"
            onClick={() =>
              dialog({
                open: true,
                content: "Delete this page?",
                onSubmit: async () => {
                  await deletePage(page.id);
                  refetch();
                },
              })
            }
          >
            <TbTrash />
          </button>
        </div>
      </div>

      <p className="text-sm mt-2 line-clamp-2">{page.description}</p>
      <div className="mt-3">
        <a
          href={`/landing/${page.slug}`}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-primary"
        >
          View
        </a>
      </div>
    </div>
  );
}
