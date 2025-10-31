"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FaqJsonLd from "@/app/faqschema";

const faqs = [
  {
    question: "What types of skin concerns does Dr. Manu Walia treat?",
    answer:
      "She treats all types of medical skin and hair concerns. She is also an expert in all kinds of aesthetic skin procedures.",
  },
  {
    question: "Do I need a prior appointment for a consultation?",
    answer:
      "Preferably yes. Without prior appointment, there may be a waiting period.",
  },
  {
    question: "What skincare treatments are available at the clinic?",
    answer:
      "Q switch laser, Laser hair Reduction, Hydrafacial, Medifacials, Morpheus 8 (microneedling with RF), Dermapen (Microneedling), Forma (RF skin tightening), Medical peels, Masks, Fillers, Botox, Hair and skin PRP, GFC, Hair mesotherapy.",
  },
  {
    question:
      "Is Dr. Manu Walia experienced in treating sensitive or acne-prone skin?",
    answer:
      "Yes, she is an expert in treating Acne and Acne scars with sound knowledge of underlying issues such as hormonal imbalances.",
  },
  {
    question:
      "I'm starting to see fine lines and wrinkles. When should I consider anti-ageing treatments?",
    answer:
      "Skin ageing starts much before fine lines are visible, so if you are seeing them, it is time to consider rejuvenation treatments so that fine lines don't become static.",
  },
  {
    question:
      "My skin has developed uneven patches and dark spots. Can pigmentation really be treated?",
    answer:
      "Yes, pigmentation can be treated. There are numerous causes for skin pigmentation which vary with geography, climate, skin type, and ethnicity. Multiple treatments like Q switch, medical peels, IV or oral glutathione can help reduce pigmentation. Correct sunscreen can prevent depigmentation.",
  },
  {
    question:
      "I've heard of IV Glutathione for skin brightening. Is it safe and does it really work?",
    answer:
      "Yes it works. It is a powerful antioxidant which works on melanine production. air works better as the absorption is much better and greater.",
  },
  {
    question:
      "I have old acne scars that bother me. Are there treatments that can really improve them?",
    answer:
      "Yes. with the help of medical intervention and procedures which can help reduce or eliminate acne scars",
  },
  {
    question:
      "I’ve tried multiple products but my acne keeps coming back. What else can I do?",
    answer:
      "It's best to see a board-certified dermatologist to understand the root cause and treat it properly. Using DIY methods without understanding the cause can worsen acne and may lead to scar formation if not treated properly.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto container py-10 px-4">
      <FaqJsonLd faqs={faqs} />
      <h2 className="font-primary text-4xl lg:max-w-screen-sm text-black lg:w-3/4 w-full mb-6">
        FAQs
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-md bg-gray-100 font-montserrat overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium"
            >
              <span>{faq.question}</span>
              <span className="text-xl font-bold">
                {openIndex === index ? "–" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-white border-t text-black font-normal">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
