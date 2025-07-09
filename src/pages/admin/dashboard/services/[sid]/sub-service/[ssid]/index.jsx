import AdminPanelWrapper from "@/components/admin/AdminPanelWrapper";
import FAQEditor from "@/components/admin/services/sub-service/FAQEditor";
import PricingEditor from "@/components/admin/services/sub-service/PricingEditor";
import SectionEditor from "@/components/admin/services/sub-service/SectionEditor";
import DialogProvider from "@/context/DialogProvider";
import { useQuery } from "@/hooks/useQuery";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsArrowLeftSquare } from "react-icons/bs";
import { TbExternalLink } from "react-icons/tb";

export default function index({ sid, ssid }) {
  const { data, patch } = useQuery(`/api/services/${sid}/sub-services/${ssid}`);
  return (
    <div>
      <DialogProvider>
        <AdminPanelWrapper>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center mb-8 gap-2">
              <Link
                className="flex items-center gap-3"
                href={`/admin/dashboard/services/${sid}/`}
                aria-label="Back"
              >
                <span className="btn btn-ghost btn-square text-base-content text-5xl">
                  <BsArrowLeftSquare />
                </span>
              </Link>
              <div>
                <h1 className="font-semibold text-xl uppercase text-base-content">
                  <div className="text-xs font-medium">Sub Services</div>

                  <Link
                    target="_blank"
                    href={`/services/${data?.service?.name}/sub-service/${data?.name}`.replaceAll(
                      " ",
                      "-"
                    )}
                    className="font-black flex items-center gap-2"
                  >
                    <span>{data?.name || "Loading..."}</span>
                    <span>
                      <TbExternalLink />
                    </span>
                  </Link>
                </h1>
              </div>
            </div>
          </div>
          <div role="tablist" className="tabs tabs-bordered">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Sections"
            />
            <div role="tabpanel" className="tab-content py-10">
              <SectionEditor sections={data?.sections || []} patch={patch} />
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Pricing"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content py-10">
              <PricingEditor {...{ sid, ssid }} />
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="FAQ"
            />
            <div role="tabpanel" className="tab-content py-10">
              <FAQEditor {...{ sid, ssid }} />
            </div>
          </div>
        </AdminPanelWrapper>
      </DialogProvider>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { sid, ssid } = params;
  if (!sid || !ssid) {
    return { notFound: true };
  }

  return {
    props: {
      sid,
      ssid,
    },
  };
};
