// src/app/services/[serviceName]/page.jsx
import db from "@/lib/db";
import { notFound } from "next/navigation";
import HeaderHero from "./HeaderHero";
import SubServices from "./SubServices";
import SectionsRender from "@/components/admin/home-editor/SectionsRender";
import Testimonials from "@/components/home/sections/Testimonials";
import FAQSection from "./sub-service/[subServiceName]/FAQSection";
import PricingSection from "./sub-service/[subServiceName]/PricingSection";

const serviceDetails = async (name) => {
  return await db.Services.findFirst({
    where: { name: decodeURIComponent(name.replaceAll("-", " ")) },
    include: {
      subServices: {
        where: { isShow: true, isDeleted: false },
      },
    },
  });
};

export const generateMetadata = async ({ params }) => {
  const { serviceName } = await params;
  const service = await serviceDetails(serviceName);

  if (!service) {
    return {
      title: "Not Found | TheDermaHouse",
      description: "The requested service could not be found",
    };
  }

  const canonicalUrl = `https://thedermahouse.com/services/${serviceName}`;
  return {
    title: service.metaTitle
      ? service.metaTitle
      : `Best ${service.name} Treatment | TheDermaHouse`,
    description: service.metaDescription
      ? service.metaDescription
      : service.description,
    openGraph: {
      title: service.metaTitle
        ? service.metaTitle
        : `Best ${service.name} Treatment | TheDermaHouse`,
      description: service.metaDescription
        ? service.metaDescription
        : service.description || "",
      images: [service.servicePageImage1URL || service.servicePageImageURL],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
};

export default async function Page({ params }) {
  const { serviceName } = await params;
  const service = await serviceDetails(serviceName);

  if (!service) {
    notFound();
  }

  // Check if the service is IV Therapy (ID 17)
  const isIVTherapy = service.id === 17;
  let sectionsToRender = service.sections || [];
  let ssid = service.id;

  if (isIVTherapy && service.subServices.length === 1) {
    sectionsToRender = service.subServices[0].sections || []; // IV Drip Therapy's sections
    ssid = service.subServices[0].id; // IV Drip Therapy's ID (56)
  }

  return (
    <main className="min-h-screen ">
      <HeaderHero service={service} /> {/* Always use service data */}
      {isIVTherapy ? (
        <div className="container mx-auto px-4">
          <SectionsRender sections={sectionsToRender} />
          <PricingSection ssid={ssid} />
          <Testimonials ssid={ssid} />
          {/* <FAQSection ssid={ssid} /> */}
        </div>
      ) : (
        <SubServices service={service} />
      )}
    </main>
  );
}
