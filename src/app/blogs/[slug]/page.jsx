import db from "@/lib/db";
import { notFound } from "next/navigation";
import Img from "@/components/misc/Img";
import SectionsRender from "@/components/admin/home-editor/SectionsRender";
import TableOfContents from "@/components/home/sections/TableOfContents";

const getBlog = async (slug) => {
  return await db.Blogs.findFirst({
    where: { slug, isPublished: true, isDeleted: false },
  });
};

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Not Found | TheDermaHouse",
      description: "The requested blog could not be found",
    };
  }

  return {
    title: blog.metaTitle || `${blog.title} | TheDermaHouse`,
    description: blog.metaDescription || blog.description,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.description,
      images: [blog.imageURL],
    },
    alternates: {
      canonical: `https://thedermahouse.com/blogs/${slug}`,
    },
  };
};

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }
  // Safe slugify function
  function slugify(str) {
    if (!str) return "";
    return str
      .toString()
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  // Fetch other blogs at the top of your BlogPost function
  const otherBlogs = await db.Blogs.findMany({
    where: {
      isPublished: true,
      isDeleted: false,
      NOT: { slug },
    },
    select: { title: true, slug: true },
  });

  function shuffle(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  const shuffledBlogs = shuffle(otherBlogs);
  return (
    <main className="min-h-screen bg-base-100">
      <section className=" ">
        {/* <div className=" py-10 lg:py-32 text-center"></div> */}

        {blog.imageURL && (
          <div className="w-full  lg:h-[45rem] bg-no-repeat  overflow-hidden mx-auto mb-8">
            <Img
              src={blog.imageURL}
              alt={blog.imageDescription || blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="container mx-auto px-4">
          {/* <h1 className="font-hallengerSerif text-4xl lg:text-5xl text-center mb-6">
            {blog.title}
          </h1> */}
          {/* {blog.imageURL && (
            <div className="w-full max-w-3xl mx-auto mb-8">
              <Img
                src={blog.imageURL}
                alt={blog.imageDescription || blog.title}
                className="w-full rounded-lg"
              />
              {blog.imageDescription && (
                <p className="text-sm text-center mt-2 opacity-75">
                  {blog.imageDescription}
                </p>
              )}
            </div>
          )}
          <p className="text-center text-base-content opacity-75 max-w-2xl mx-auto">
            {blog.description}
          </p> */}
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-hallengerSerif text-4xl lg:text-5xl text-center ">
            {blog.title}
          </h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content: 60% width on large screens */}
            <div className="w-full lg:w-4/5">
              <SectionsRender
                sections={(blog.content || []).filter((s) => s?.sectionTitle)}
              />
            </div>
            {/* Table of Contents: 40% width on large screens */}
            <div className="w-full lg:w-2/5">
              <div className="sticky top-32 ">
                <TableOfContents sections={blog.content || []} />
                <div className="p-6 border-1 rounded-lg ">
                  <label className="block mb-2 font-medium text-xl">
                    Trending post
                  </label>
                  <ul>
                    {shuffledBlogs.slice(0, 6).map((b) => (
                      <li
                        className="border-b-1 border-[#909009] p-2"
                        key={b.slug}
                      >
                        <a
                          href={`/blogs/${b.slug}`}
                          className=" text-lg text-black-600 transition-colors font-hallengerSerif font-medium block"
                        >
                          {b.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
