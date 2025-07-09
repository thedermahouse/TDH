import db from "@/lib/db";
import React from "react";

const getPage = async (slug) => {
  return db.Pages.findFirst({
    where: {
      slug: slug,
    },
  });
};
export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const page = await getPage(slug);
  return {
    title: `${page?.title} | TheDermaHouse`,
    description: page?.description,
    openGraph: {
      title: `${page?.title} | TheDermaHouse`,
      description: page?.meta_description || "",
      images: [page?.meta_image],
    },
  };
};

export default async function page({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);
  return (
    <div>
      <div className="min-h-dvh">
        <div className="lg:py-36 py-6"></div>
        <div className="m-auto container">
          <div className="p-3">
            <div>
              <div>
                <h1 className="text-3xl font-hallengerSerif">{page?.title}</h1>
              </div>
              <div className="divider"></div>
              <div
                className="mt-5 custom-html-content"
                dangerouslySetInnerHTML={{ __html: page?.content }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
