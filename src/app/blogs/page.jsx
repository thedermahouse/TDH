import db from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    title: "Blogs | TheDermaHouse blogs",
    description: "Explore our latest blog posts on dermatology and wellness.",
    alternates: {
      canonical: `https://thedermahouse.com/blogs`,
    },
  };
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  function truncate(str, n) {
    if (!str) return "";
    return str.length > n ? str.slice(0, n) + "..." : str;
  }

  if (!blogs.length) {
    return (
      <main className="min-h-screen bg-base-100">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-hallengerSerif text-4xl text-center mb-12">
              Our Blogs 2 
            </h1>
            <p className="text-center text-base-content opacity-75">
              No blogs available at the moment.
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-base-100">
      <section className="py-16">
        <div className=" py-10 lg:py-32 text-center"></div>
        <div className="container mx-auto px-4">
          <h1 className="font-hallengerSerif text-4xl text-center mb-12">
            Our Blogs
          </h1>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className=" relative  flex flex-col justify-between "
                >
                  <div>
                    {blog.imageURL && (
                      <img
                        src={blog.imageURL}
                        alt={blog.imageDescription || blog.title}
                        className="w-full h-[14rem] object-cover mb-4"
                      />
                    )}
                    <h2 className=" font-hallengerSerif text-2xl mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-sm font-hallengerSerif text-base-content opacity-75 line-clamp-3">
                      {truncate(blog.description, 120)}
                    </p>
                  </div>

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="mt-4 btn text-white bg-[#F76931] font-medium font-hallengerSerif btn-sm shadow-none "
                  >
                    Read More
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
