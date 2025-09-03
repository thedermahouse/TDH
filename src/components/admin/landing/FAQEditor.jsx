import { useDialogProvider } from "@/context/DialogProvider";
import { useQuery } from "@/hooks/useQuery";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { BsTrash3 } from "react-icons/bs";
import axios from "axios";

const faqDelete = (lid, faqId) => {
  return axios.delete(`/api/landing-pages/${lid}/faqs/${faqId}`);
};

const FAQItem = ({ faq, refetch, lid }) => {
  const dialog = useDialogProvider();

  return (
    <div className="bg-base-200 p-2 rounded-md">
      <div className="p-2">
        <div className="flex justify-between">
          <div className="font-bold">Q. {faq.question}</div>
          <button
            className="btn btn-error btn-xs btn-circle"
            onClick={() => {
              dialog({
                open: true,
                title: `Delete FAQ?`,
                onSubmit: async () => {
                  await faqDelete(lid, faq.id);
                  refetch();
                },
              });
            }}
          >
            <BsTrash3 />
          </button>
        </div>
        <p>{faq.answer}</p>
      </div>
    </div>
  );
};

export default function LandingFAQEditor({ lid }) {
  if (!lid) {
    return <div className="text-red-500">⚠ No landing page selected</div>;
  }

  const { data, put, refetch } = useQuery(`/api/landing-pages/${lid}/faqs`);

  const dialog = useDialogProvider();

  return (
    <div>
      <div className="w-full flex justify-end py-4">
        <button
          className="btn btn-content btn-sm"
          onClick={() => {
            dialog({
              open: true,
              title: "Create New FAQ",
              form: [
                { type: "text", name: "question", label: "Question" },
                { type: "textarea", name: "answer", label: "Answer" },
              ],
              onSubmit: (formData) => {
                put({ question: formData.question, answer: formData.answer });
              },
            });
          }}
        >
          <CiCirclePlus />
          <span>New</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {data?.map((faq) => (
          <FAQItem key={faq.id} faq={faq} refetch={refetch} lid={lid} />
        ))}
      </div>
    </div>
  );
}
