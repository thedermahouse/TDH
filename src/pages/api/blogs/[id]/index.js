import db from "@/lib/db";
import { validateBlogData } from "@/lib/validators/blog";

export default async function handler(req, res) {
  const { id } = req.query;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: "Invalid blog ID" });
  }

  // Handle GET requests - Get single blog
  if (req.method === "GET") {
    try {
      const blog = await db.Blogs.findUnique({
        where: { id: Number(id), isDeleted: false },
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

  // Handle PATCH requests - Update blog
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
      } = req.body;

      // Validate input data if present
      if (title || slug || description || imageURL) {
        const validation = validateBlogData({
          title,
          slug,
          description,
          imageURL,
        });

        if (!validation.valid) {
          return res.status(400).json({
            message: "Validation failed",
            errors: validation.errors,
          });
        }
      }

      // Build update data object
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

      // Update blog
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

      // Handle duplicate slug error
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "Blog with this slug already exists",
          field: "slug",
        });
      }

      // Handle not found error
      if (error.code === "P2025") {
        return res.status(404).json({ message: "Blog not found" });
      }

      return res.status(500).json({
        message: "Failed to update blog",
        error: error.message,
      });
    }
  }

  // Handle DELETE requests - Soft delete blog
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

  // Handle other methods
  res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
  return res.status(405).json({ message: "Method not allowed" });
}
