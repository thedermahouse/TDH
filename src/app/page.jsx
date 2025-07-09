import SectionsRender from "@/components/admin/home-editor/SectionsRender";
import getPart from "@/helpers/getPart";

export const generateMetadata = async () => {
  const { content } = await getPart("HOME");

  const { seo } = content;
  return {
    title: seo?.metaTitle || "The Derma House",
    description: seo?.metaDescription || "Complete dermal solutions",
    images: [seo?.metaImage],
    alternates: {
      canonical: "https://thedermahouse.com",
    },
  };
};

export default async function Home() {
  const part = await getPart("HOME");
  return (
    <main>
      <SectionsRender sections={part?.content?.sections} />
      <div></div>
    </main>
  );
}
