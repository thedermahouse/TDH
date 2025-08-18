import db from "@/lib/db";

const getLandingFaqs = async (lid) => {
  return await db.LandingPageFAQ.findMany({
    where: { landingPageId: lid },
  });
};

export default async function FAQSection({ landingPageId }) {
  const faqs = await getLandingFaqs(landingPageId);
  if (!faqs.length) return null;

  return (
    <section className="bg-white  px-4 lg:px-0 sm:w-[80%] mx-auto">
      <div className="container mx-auto py-12 lg:py-20">
        {/* Title */}
        <div className="text-center mb-8">
          <h4 className="text-dh-p text-sm font-semibold uppercase">FAQ's</h4>
          <h2 className="text-2xl lg:text-4xl font-semibold text-black mt-2">
            Here’s everything you may ask…
          </h2>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-gray-300 border border-gray-300 rounded-md">
          {faqs.map((f, i) => (
            <details
              key={f.id}
              className="group"
              open={i === 0} // first one expanded
            >
              <summary className="flex justify-between items-center cursor-pointer py-4 px-6 text-black border-b border-gray-300 font-semibold uppercase">
                {f.question}
                <span className="transition-transform group-open:rotate-45">
                 +
                </span>
              </summary>
              <div className="px-6 py-4 text-sm text-gray-700 space-y-2">
                {f.answer.split("\n").map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
