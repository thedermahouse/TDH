import db from "@/lib/db";
import { notFound } from "next/navigation";
import SectionsRender from "@/components/admin/home-editor/SectionsRender";
import Banner from "@/components/landing-page/banner";
import LandingTestimonialsBanner from "@/components/home/sections/LandingTestimonialsBanner";
import LandingTestimonialsBannerView from "@/components/home/sections/LandingTestimonialsBannerView";
import FAQSection from "@/components/home/sections/FAQSection";
import Footer2 from "@/components/home/sections/Footer2";

const getLanding = async (slug) => {
  return await db.landingPage.findUnique({
    where: { slug: decodeURIComponent(slug) },
  });
};

export async function generateMetadata({ params }) {
  const page = await getLanding(params.slug);
  if (!page) return { title: "Not Found" };
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.description,
  };
}

export default async function Page({ params }) {
  const page = await getLanding(params.slug);
  if (!page) notFound();

  return (
    <main className="min-h-screen">
      <section className="py-8">
        {/* <h1 className="text-4xl font-bold text-center">{page.title}</h1>
        {page.bannerUrl && (
          <img src={page.bannerUrl} className="mx-auto my-6" alt="banner" />
        )} */}

        <Banner
          title={page.title}
          subtitle={page.subtitle}
          backgroundImage={page.bannerUrl}
        />

        <div className=" ">
          <SectionsRender sections={page.sections || []} />
        </div>
        <LandingTestimonialsBannerView landingPageId={page.id} />
        <FAQSection />
        {/* <Footer2 /> */}
      </section>
    </main>
  );
}
