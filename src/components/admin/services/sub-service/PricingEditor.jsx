import { useDialogProvider } from "@/context/DialogProvider";
import { useQuery } from "@/hooks/useQuery";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { BsCurrencyRupee, BsTrash3 } from "react-icons/bs";
import axios from "axios";
import { PlanIcon, SubServicePaymentTerms } from "@prisma/client";
import {
  icons_elements,
  pricing_dem,
} from "@/app/services/[serviceName]/sub-service/[subServiceName]/planData";

const icons = Object.values(PlanIcon);
const payment_terms = Object.values(SubServicePaymentTerms);

const pricingDelete = (sid, ssid, faqId) => {
  const url = `/api/services/${sid}/sub-services/${ssid}/pricing/${faqId}`;
  return axios.delete(url);
};

const PricingItem = ({ pricing, refetch, sid, ssid }) => {
  const dialog = useDialogProvider();
  console.log(pricing.name);
  const { i: Icon } = icons_elements[pricing?.iconName || ""];
  return (
    <div className="bg-base-200 p-2 rounded-md">
      <div className="p-2">
        <div>
          <div className="flex justify-between">
            <div className="flex gap-1">
              <div>
                <span className="text-xl">
                  <Icon />
                </span>
              </div>
              <div className="font-bold">{pricing.name}</div>
              <span>-</span>
              <span className="flex items-center">
                <span>
                  <BsCurrencyRupee />
                </span>
                <span>{pricing.price}</span>
                <span>/</span>
                <span className="capitalize">
                  {pricing_dem[pricing?.paymentTerms].d.toLowerCase()}
                </span>
              </span>
            </div>
            <div>
              <button
                className="btn btn-error btn-xs btn-circle"
                onClick={async () => {
                  dialog({
                    open: true,
                    title: `Delete FAQ?`,
                    onSubmit: async () => {
                      await pricingDelete(sid, ssid, pricing.id);
                      refetch();
                    },
                  });
                }}
              >
                <BsTrash3 />
              </button>
            </div>
          </div>
          <div>
            <p>{pricing.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PricingEditor(props) {
  const { data, put, refetch } = useQuery(
    `/api/services/${props.sid}/sub-services/${props.ssid}/pricing`
  );
  const dialog = useDialogProvider();
  return (
    <div>
      <div className="w-full flex justify-end py-4">
        <div>
          <button
            className="btn btn-content btn-sm"
            onClick={() => {
              dialog({
                open: true,
                title: "Create New Plan",
                form: [
                  {
                    type: "text",
                    name: "name",
                    label: "Plan Name",
                  },
                  {
                    type: "textarea",
                    name: "description",
                    label: "Plan Description",
                  },
                  {
                    type: "number",
                    name: "price",
                    label: "Pricing",
                  },
                  {
                    type: "select",
                    name: "paymentTerms",
                    label: "Payment Terms",
                    options: payment_terms.map((t) => ({ option: t, val: t })),
                  },
                  {
                    type: "select",
                    name: "iconName",
                    label: "Icon",
                    options: icons.map((t) => ({ option: t, val: t })),
                  },
                ],
                onSubmit: (data) => {
                  put(data);
                },
              });
            }}
          >
            <span>
              <CiCirclePlus />
            </span>
            <span>New</span>
          </button>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-5">
          {data?.map((d) => (
            <PricingItem
              key={d.id}
              pricing={d}
              refetch={refetch}
              sid={props.sid}
              ssid={props.ssid}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
