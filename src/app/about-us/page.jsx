import React from "react";
import getPart from "@/helpers/getPart";
import SectionsRender from "@/components/admin/home-editor/SectionsRender";
import { notFound } from "next/navigation";

export const generateMetadata = async () => {
  const { content } = await getPart("ABOUT_US");
  const { seo } = content;
  return {
    title: seo?.metaTitle || "The Derma House",
    description: seo?.metaDescription || "Complete dermal solutions",
    images: [seo?.metaImage],
    alternates: {
      canonical: "https://thedermahouse.com/about-us",
    },
  };
};

export default async function page() {
  const part = await getPart("ABOUT_US");
  part || notFound();

  return (
    <main className="mt-24 lg:mt-56">
      <SectionsRender sections={part?.content?.sections} />
    </main>
  );
}
