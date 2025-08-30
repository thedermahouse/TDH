import React from "react";
import { useDialogProvider } from "@/context/DialogProvider";
import { TbNewSection } from "react-icons/tb";

export default function NewBlog({ post }) {
  const dialog = useDialogProvider();

  const addNewBlog = () => {
    dialog({
      open: true,
      title: "Add New Blog",
      form: [
        {
          name: "title",
          type: "text",
          label: "Blog Title",
          placeholder: "Enter blog title",
          required: true,
        },
        {
          name: "slug",
          type: "text",
          label: "Blog Slug",
          placeholder: "Enter blog slug (e.g., my-blog-post)",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Blog Description",
          placeholder: "Enter blog description",
          required: true,
        },
        {
          name: "imageURL",
          type: "",
          label: "Featured Image URL",
          placeholder: "Enter image URL",
          required: false,
        },
        {
          name: "tags",
          type: "text",
          label: "Tags (comma separated)",
          placeholder: "e.g. skincare, wellness, acne",
          required: false,
        },
        {
          name: "isPublished",
          type: "checkbox",
          label: "Publish Immediately",
          value: false,
          required: false,
        },
      ],
      onSubmit: async (formData) => {
        try {
          // Initialize content as empty array for sections
          const blogData = {
            ...formData,
            content: [],
            tags: formData.tags
              ? formData.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
              : [],
          };
          await post(blogData);
        } catch (error) {
          console.error("Error adding blog:", error);
          alert("Failed to add blog: " + error.message);
        }
      },
    });
  };

  return (
    <button onClick={addNewBlog} className="btn btn-primary btn-sm">
      <TbNewSection className="text-xl" />
      <span className="hidden sm:inline">Add Blog</span>
    </button>
  );
}
