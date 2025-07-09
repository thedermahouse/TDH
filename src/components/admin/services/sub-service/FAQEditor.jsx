import { useDialogProvider } from "@/context/DialogProvider";
import { useQuery } from "@/hooks/useQuery";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";

const faqDelete = (sid, ssid, faqId) => {
  const url = `/api/services/${sid}/sub-services/${ssid}/faqs/${faqId}`;
  return axios.delete(url);
};

const FAQItem = ({ faq, refetch, sid, ssid }) => {
  const dialog = useDialogProvider();
  return (
    <div className="bg-base-200 p-2 rounded-md">
      <div className="p-2">
        <div>
          <div className="flex justify-between">
            <div className="font-bold">Q. {faq.question}</div>
            <div>
              <button
                className="btn btn-error btn-xs btn-circle"
                onClick={async () => {
                  dialog({
                    open: true,
                    title: `Delete FAQ?`,
                    onSubmit: async () => {
                      await faqDelete(sid, ssid, faq.id);
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
            <p>{faq.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FAQEditor(props) {
  const { data, put, refetch } = useQuery(
    `/api/services/${props.sid}/sub-services/${props.ssid}/faqs`
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
                title: "Create New FAQ",
                form: [
                  {
                    type: "text",
                    name: "question",
                    label: "Question",
                  },
                  {
                    type: "textarea",
                    name: "answer",
                    label: "Answer",
                  },
                ],
                onSubmit: (data) => {
                  put({ question: data.question, answer: data.answer });
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
          {data?.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
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
