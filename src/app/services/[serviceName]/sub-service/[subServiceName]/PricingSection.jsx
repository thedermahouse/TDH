import db from "@/lib/db";
import { icons_elements, pricing_dem } from "./planData";
import Currency from "@/components/misc/Currency";
import Link from "next/link";

const subServiceDetails = (ssid) =>
  db.SubServices.findFirst({
    select: {
      name: true,
      plans: true,
    },
    where: { id: ssid },
  });

const PricingItem = ({ plan, ssName }) => {
  const { i: Icon } = icons_elements[plan?.iconName || ""];
  const { d: Dem } = pricing_dem[plan?.paymentTerms];
  return (
    <div className="w-full">
      <div className="bg-dh-p px-4 py-12 w-full">
        <div className="py-5"></div>
        <div className="text-center w-full ac">
          <div className="rounded-full h-20 w-20 border border-white ac text-white text-5xl">
            <Icon />
          </div>
        </div>
        <div className="py-5"></div>
        <div className="flex items-center justify-between text-lg font-bold">
          <div>
            <span className="text-white font-hallengerSerif text-3xl font-light">
              {plan?.name}
            </span>
          </div>
          <div className="text-white space-x-1">
            <span className="font-hallengerSerif font-light text-3xl">
              <Currency value={plan?.price} minimumFractionDigits={0} /> /
            </span>
            {Dem && (
              <>
                <span className="font-hallengerSerif font-light">
                  {Dem.toLowerCase()}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="divider after:bg-gray-200 before:bg-gray-200 after:h-[1px] before:h-[1px] my-0"></div>
        <div className="text-white text-start min-h-64">
          <p>{plan?.description}</p>
        </div>
        <div>
          <Link
            className="dh-sm-btn"
            href={`/contact-us?enquiry_from=${ssName}`}
            aria-label="Enquire Now"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default async function PricingSection({ ssid }) {
  const subService = await subServiceDetails(ssid);
  const { plans, name } = subService;

  if ((plans?.length || 0) === 0) {
    return null;
  }

  const col_length =
    plans?.length > 3
      ? `lg: grid-cols-3 grid-cols-1`
      : plans?.length === 2
      ? `lg: grid-cols-2 grid-cols-1`
      : `lg: grid-cols-1 grid-cols-1`;

  return (
    <section className="text-center">
      <div className="hidden">
        <pre>{JSON.stringify(subService, null, 2)}</pre>
      </div>
      <div className="container m-auto py-24">
        <div className="w-full">
          <div className="w-full">
            <div className="w-full">
              <div>
                <h1 className="font-hallengerSerif text-5xl text-black text-center">
                  Find your Ideal Plan
                </h1>
                <h2 className="max-w-screen-sm m-auto mt-3 text-sm text-black">
                  Our plans are designed to cater to your unique skincare needs,
                  offering flexible options that grow with your skin's journey.
                  Whether you're looking for a simple routine or personalized
                  care, we have a plan for every goal
                </h2>
              </div>
            </div>
          </div>
          <div className="py-8"></div>
          <div className="w-full lg:p-0 p-2 grid ">
            <div className={`grid ${col_length} lg:gap-5 gap-2`}>
              {plans?.map((p) => {
                return <PricingItem key={p.id} plan={p} ssName={name} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
