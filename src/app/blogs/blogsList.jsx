"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function BlogsList({ blogs }) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag") || null;

  const normalizeTags = (tags) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") {
      try {
        // If it's a JSON string like '["a","b"]'
        if (tags.trim().startsWith("[")) {
          return JSON.parse(tags);
        }
        // If it's comma-separated like "a, b"
        return tags.split(",").map((t) => t.trim());
      } catch {
        return [tags]; // fallback
      }
    }
    return [];
  };

  const filteredBlogs = selectedTag
    ? blogs.filter((b) => normalizeTags(b.tags).includes(selectedTag))
    : blogs;

  const allTags = Array.from(
    new Set(blogs.flatMap((b) => normalizeTags(b.tags)))
  ).sort();

  function truncate(str, n) {
    if (!str) return "";
    return str.length > n ? str.slice(0, n) + "..." : str;
  }

  if (!blogs.length) {
    return (
      <main className="min-h-screen bg-base-100">
        <section className="py-16">
          <div className=" py-10 lg:py-32 text-center"></div>
          <div className="container mx-auto px-4">
            <h1 className="font-hallengerSerif text-4xl text-center mb-12">
              Our Blogs
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

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Link
              href="/blogs"
              className={`px-3 py-1 rounded-full ${
                !selectedTag ? "bg-[#F76931] text-white" : "bg-gray-200"
              }`}
            >
              All
            </Link>
            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/blogs?tag=${encodeURIComponent(tag)}`}
                className={`px-3 py-1 rounded-full ${
                  selectedTag === tag
                    ? "bg-[#F76931] text-white"
                    : "bg-gray-200"
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="relative flex flex-col justify-between"
              >
                <div>
                  {blog.imageURL && (
                    <img
                      src={blog.imageURL}
                      alt={blog.imageDescription || blog.title}
                      className="w-full h-[14rem] object-cover mb-4"
                    />
                  )}
                  <h2 className="font-hallengerSerif text-2xl mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm font-hallengerSerif text-base-content opacity-75 line-clamp-3">
                    {truncate(blog.description, 120)}
                  </p>
                </div>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="mt-4 btn text-white bg-[#F76931] font-medium font-hallengerSerif btn-sm shadow-none"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
