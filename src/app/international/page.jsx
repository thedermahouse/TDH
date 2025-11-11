// import SectionsRender from "@/components/admin/home-editor/SectionsRender";
// import getPart from "@/helpers/getPart";
// import Head from "next/head";

// export const generateMetadata = async () => {
//   const { content } = await getPart("INTERNATIONAL");
//   const { seo } = content || {};

//   return {
//     title: seo?.metaTitle || "The Derma House International",
//     description: seo?.metaDescription || "International skincare and wellness solutions",
//     images: [seo?.metaImage],
//     alternates: {
//       canonical: "https://thedermahouse.com/international",
//     },
//   };
// };

// export default async function InternationalPage() {
//   const part = await getPart("INTERNATIONAL");

//   return (
//     <>
//       <Head>
//         {/* You can add structured data here later if needed */}
//       </Head>

//       <main>
//         <SectionsRender sections={part?.content?.sections} />
//       </main>
//     </>
//   );
// }
