import db from "@/lib/db";
import { validateBlogData } from "@/lib/validators/blog";

export default async function handler(req, res) {
  // Handle GET requests - List all blogs
  if (req.method === "GET") {
    try {
      const blogs = await db.Blogs.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          imageURL: true,
          isPublished: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.status(200).json(blogs);
    } catch (error) {
      console.error("GET /api/blogs error:", error);
      return res.status(500).json({
        message: "Failed to fetch blogs",
        error: error.message,
      });
    }
  }

  // Handle POST requests - Create new blog
  if (req.method === "POST") {
    try {
      const { title, slug, description, imageURL, isPublished } = req.body;

      // Validate input data
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

      // Create new blog
      const newBlog = await db.Blogs.create({
        data: {
          title,
          slug,
          description,
          imageURL: imageURL || null,
          isPublished: Boolean(isPublished),
          content: [], // Initialize empty content array
        },
      });

      return res.status(201).json({
        message: "Blog created successfully",
        blog: {
          id: newBlog.id,
          title: newBlog.title,
          slug: newBlog.slug,
        },
      });
    } catch (error) {
      console.error("POST /api/blogs error:", error);

      // Handle duplicate slug error
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "Blog with this slug already exists",
          field: "slug",
        });
      }

      return res.status(500).json({
        message: "Failed to create blog",
        error: error.message,
      });
    }
  }

  // Handle other methods
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: "Method not allowed" });
}
