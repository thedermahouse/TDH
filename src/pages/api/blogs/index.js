import db from "@/lib/db";

// Simple validation function
function validateBlogData(data) {
  const errors = {};

  // Title: required and must be string
  if (!data.title || typeof data.title !== "string" || data.title.trim() === "") {
    errors.title = "Title is required and must be a non-empty string.";
  }

  // Slug: required and must be string
  if (!data.slug || typeof data.slug !== "string" || data.slug.trim() === "") {
    errors.slug = "Slug is required and must be a non-empty string.";
  }

  // Description: required and must be string
  if (!data.description || typeof data.description !== "string" || data.description.trim() === "") {
    errors.description = "Description is required and must be a non-empty string.";
  }

  // Image URL: optional, but if present must be valid URL or relative path
  if (data.imageURL && typeof data.imageURL === "string") {
    if (
      !/^https?:\/\/.+\..+/.test(data.imageURL) && // absolute URL
      !/^\/.+/.test(data.imageURL) // OR relative path like /images/...
    ) {
      errors.imageURL = "Image URL must be a valid absolute or relative URL.";
    }
  }
 // Tags validation
 if (data.tags !== undefined) {
   if (!Array.isArray(data.tags)) {
     errors.tags = "Tags must be an array of strings.";
   } else if (data.tags.some((t) => typeof t !== "string" || t.trim() === "")) {
     errors.tags = "Each tag must be a non-empty string.";
   }
 }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export default async function handler(req, res) {
  // ✅ Handle GET - Fetch all blogs
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
          tags: true,
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

  // ✅ Handle POST - Create new blog
  if (req.method === "POST") {
    try {
      const { title, slug, description, imageURL, isPublished } = req.body;

      // Validate input
      const validation = validateBlogData({
        title,
        slug,
        description,
        imageURL,
      });

      if (!validation.valid) {
        console.warn("Validation failed:", validation.errors);
        return res.status(400).json({
          message: "Validation failed",
          errors: validation.errors,
        });
      }

      // Save blog
      const newBlog = await db.Blogs.create({
        data: {
          title,
          slug,
          description,
          imageURL: imageURL || null,
          isPublished: Boolean(isPublished),
          content: [], // Optional: add if needed
          tags: true,
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

      // Handle Prisma duplicate slug error
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

  // ❌ Unsupported methods
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ message: "Method not allowed" });
}
