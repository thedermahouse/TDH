import db from "@/lib/db";
import BlogsList from "./blogsList";


const getBlogs = async () => {
  try {
    if (!db.Blogs) {
      throw new Error("Blogs model is not defined in Prisma client");
    }
    return await db.Blogs.findMany({
      where: { isPublished: true, isDeleted: false },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

export const generateMetadata = async () => {
  return {
    title: "Blogs | TheDermaHouse blogs and articles",
    description: "Explore our latest blog posts on dermatology and wellness.",
    alternates: {
      canonical: `https://thedermahouse.com/blogs`,
    },
  };
};

export default async function BlogsPage() {
  const blogs = await getBlogs();
  return <BlogsList blogs={blogs} />;
}
