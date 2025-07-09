import Img from "@/components/misc/Img";
import db from "@/lib/db";

const subServiceDetails = (ssid) =>
  db.SubServices.findFirst({
    select: {
      service: true,
      faqs: true,
    },
    where: { id: ssid },
  });

export default async function FAQSection({ ssid }) {
 
  const subService = await subServiceDetails(ssid);
  const { service, faqs } = subService;
  const { faqImageURL } = service;

  if ((faqs?.length || 0) === 0) {
    return null;
  }

  return (
    <section className="bg-dh-q px-4 lg:px-0 w-full">
      <div className="hidden">
        <pre>{JSON.stringify(subService, null, 2)}</pre>
      </div>
      <div className="container m-auto py-12 lg:py-24">
        <div className="w-full flex lg:flex-nowrap flex-wrap-reverse">
          <div className=" w-full">
            <div className="lg:pr-24">
              <div className="lg:p-0 p-2">
                <div className="text-center md:text-left">
                  <h2 className="font-hallengerSerif text-3xl lg:text-5xl text-black">
                    FAQs
                  </h2>
                </div>

                <div className="mt-6">
                  {faqs?.map((f, i) => {
                    return (
                      <div
                        className="collapse collapse-plus rounded-none border-b border-gray-600"
                        key={f?.id}
                      >
                        <input
                          type="radio"
                          name="my-accordion-3"
                          defaultChecked={i === 0}
                        />
                        <div className="collapse-title text-md text-black uppercase px-0 font-normal after:text-4xl after:font-light">
                          {f?.question}
                        </div>
                        <div className="collapse-content text-black text-sm px-0">
                          <p>{f?.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="lg:w-3/12 w-full">
            {faqImageURL && (
              <div className="lg:p-0 p-3">
                <Img src={faqImageURL} className="w-full" alt="FAQ Image" />
              </div>
            )}
          </div> */}
        </div>
      </div>
    </section>
  );
}
