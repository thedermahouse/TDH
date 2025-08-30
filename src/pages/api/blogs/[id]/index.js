import db from "@/lib/db";
import { validateBlogData } from "@/lib/validators/blog";

export default async function handler(req, res) {
  const { id } = req.query;

  // ✅ Validate blog ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  // ✅ GET - Fetch single blog
  if (req.method === "GET") {
    try {
      const blog = await db.Blogs.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          tags: true,
          content: true,
          metaTitle: true,
          metaDescription: true,
          imageURL: true,
          imageDescription: true,
          isPublished: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      return res.status(200).json(blog);
    } catch (error) {
      console.error(`GET /api/blogs/${id} error:`, error);
      return res.status(500).json({
        message: "Failed to fetch blog",
        error: error.message,
      });
    }
  }

  // ✅ PATCH - Update blog
  if (req.method === "PATCH") {
    try {
      const {
        title,
        slug,
        description,
        imageURL,
        metaTitle,
        metaDescription,
        isPublished,
        content,
        tags,
      } = req.body;

      const inputToValidate = {};
      if (title !== undefined) inputToValidate.title = title;
      if (slug !== undefined) inputToValidate.slug = slug;
      if (description !== undefined) inputToValidate.description = description;
      if (imageURL !== undefined) inputToValidate.imageURL = imageURL;

      const { valid, errors } = validateBlogData(inputToValidate);
      if (!valid) {
        return res.status(400).json({ message: "Validation failed", errors });
      }

      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (slug !== undefined) updateData.slug = slug;
      if (description !== undefined) updateData.description = description;
      if (imageURL !== undefined) updateData.imageURL = imageURL;
      if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
      if (metaDescription !== undefined)
        updateData.metaDescription = metaDescription;
      if (isPublished !== undefined)
        updateData.isPublished = Boolean(isPublished);
      if (content !== undefined) updateData.content = content;
      if (tags !== undefined) updateData.tags = tags;

      const updatedBlog = await db.Blogs.update({
        where: { id: Number(id) },
        data: updateData,
      });

      return res.status(200).json({
        message: "Blog updated successfully",
        blog: {
          id: updatedBlog.id,
          title: updatedBlog.title,
          slug: updatedBlog.slug,
        },
      });
    } catch (error) {
      console.error(`PATCH /api/blogs/${id} error:`, error);

      if (error.code === "P2002") {
        return res.status(409).json({
          message: "Blog with this slug already exists",
          field: "slug",
        });
      }

      if (error.code === "P2025") {
        return res.status(404).json({ message: "Blog not found" });
      }

      return res.status(500).json({
        message: "Failed to update blog",
        error: error.message,
      });
    }
  }

  // ✅ DELETE - Soft delete blog
  if (req.method === "DELETE") {
    try {
      await db.Blogs.update({
        where: { id: Number(id) },
        data: { isDeleted: true },
      });

      return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      console.error(`DELETE /api/blogs/${id} error:`, error);
      return res.status(500).json({
        message: "Failed to delete blog",
        error: error.message,
      });
    }
  }

  // ❌ Unsupported method
  res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
  return res.status(405).json({ message: "Method not allowed" });
}
