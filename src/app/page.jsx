import SectionsRender from "@/components/admin/home-editor/SectionsRender";
import FeatureArticlesSection from "@/components/FeaturedArticles";
import HomeFAQ from "@/components/home/sections/HomeFAQ";
import ReelsSection from "@/components/reelsSection";
import ReelsSectionVerisionTwo from "@/components/reelsSectionVersionTwo";
import getPart from "@/helpers/getPart";
import Head from "next/head";

export const generateMetadata = async () => {
  const { content } = await getPart("HOME");

  const { seo } = content;
  return {
    title: seo?.metaTitle || "The Derma House ",
    description: seo?.metaDescription || "Complete dermal solutions",
    images: [seo?.metaImage],
    alternates: {
      canonical: "https://thedermahouse.com",
    },
  };
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of skin concerns does Dr. Manu Walia treat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "She treats all types of medical skin and hair concerns. She is also expert in all kinds of aesthetic skin procedures.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a prior appointment for a consultation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Preferably yes. Without prior appointment, there may be a waiting period.",
      },
    },
    {
      "@type": "Question",
      name: "What skincare treatments are available at the clinic?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Q switch laser, Laser hair Reduction, Hydrafacial, Medifacials, Morpheus 8 (microneedling with RF), Dermapen (Microneedling), Forma (RF skin tightening), Medical peels, Masks, Fillers, Botox, Hair and skin PRP, GFC, Hair mesotherapy.",
      },
    },
    {
      "@type": "Question",
      name: "Is Dr. Manu Walia experienced in treating sensitive or acne-prone skin?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, she is an expert in treating Acne and Acne scars with sound knowledge of underlying issues such as hormonal imbalances.",
      },
    },
    {
      "@type": "Question",
      name: "I'm starting to see fine lines and wrinkles. When should I consider anti-ageing treatments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Skin ageing starts much before fine lines are visible, so if you are seeing them, it is time to consider rejuvenation treatments so that fine lines don't become static.",
      },
    },
    {
      "@type": "Question",
      name: "My skin has developed uneven patches and dark spots. Can pigmentation really be treated?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, pigmentation can be treated. There are numerous causes for skin pigmentation which vary with geography, climate, skin type, and ethnicity. Multiple treatments like Q switch, medical peels, IV or oral glutathione can help reduce pigmentation. Correct sunscreen can prevent depigmentation.",
      },
    },
    {
      "@type": "Question",
      name: "I've heard of IV Glutathione for skin brightening. Is it safe and does it really work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, it works. It is a powerful antioxidant that works on melanin production. IV works better as absorption is much greater compared to oral methods.",
      },
    },
    {
      "@type": "Question",
      name: "I have old acne scars that bother me. Are there treatments that can really improve them?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, with the help of medical interventions and procedures, acne scars can be reduced or even eliminated.",
      },
    },
    {
      "@type": "Question",
      name: "I’ve tried multiple products but my acne keeps coming back. What else can I do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It's best to see a board-certified dermatologist to understand the root cause and treat it properly. Using DIY methods without understanding the cause can worsen acne and may lead to scar formation if not treated properly.",
      },
    },
  ],
};

export default async function Home() {
  const part = await getPart("HOME");
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <main>
        <SectionsRender sections={part?.content?.sections} />
        {/* <ReelsSection /> */}
        <ReelsSectionVerisionTwo />
        <FeatureArticlesSection />
        <HomeFAQ />
        <div></div>
      </main>
    </>
  );
}
