import db from "@/lib/db";
import { notFound } from "next/navigation";
import HeaderHero from "./HeaderHero";
import SectionsRender from "@/components/admin/home-editor/SectionsRender";
import FAQSection from "./FAQSection";
import PricingSection from "./PricingSection";
import Testimonials from "@/components/home/sections/Testimonials";

// Helper to get sub-service details
const serviceDetails = async (name) =>
  await db.SubServices.findFirst({
    where: { name: decodeURIComponent(name.replaceAll("-", " ")) },
  });

// Metadata function for SEO and canonical
export const generateMetadata = async ({ params }) => {
  const { serviceName, subServiceName } = params;
  const service = await serviceDetails(subServiceName);

  if (!service || service.isShow === false) {
    return {
      title: "Not Found | TheDermaHouse",
      description: "The requested service could not be found",
      alternates: {
        canonical: `https://thedermahouse.com/services/${serviceName}/sub-service/${subServiceName}`,
      },
    };
  }

  return {
    title: service.metaTitle
      ? service.metaTitle
      : `${service.name} | TheDermaHouse`,
    description: service.metaDescription
      ? service.metaDescription
      : service.description,
    openGraph: {
      title: service.metaTitle
        ? service.metaTitle
        : `${service.name} | TheDermaHouse`,
      description: service.metaDescription
        ? service.metaDescription
        : service.description || "",
      images: [service?.servicePageImageURL],
    },
    alternates: {
      canonical: `https://thedermahouse.com/services/${serviceName}/sub-service/${subServiceName}`,
    },
  };
};

// The actual page component (must return JSX)
export default async function Page({ params }) {
  const { subServiceName } = params;
  const service = await serviceDetails(subServiceName);

  if (!service || service.isShow === false) {
    notFound();
  }

  return (
    <main>
      <HeaderHero service={service} />
      <SectionsRender sections={service?.sections || []} />
      <PricingSection ssid={service.id} />
      <Testimonials ssid={service.id} />
      <FAQSection ssid={service.id} />
    </main>
  );
}
