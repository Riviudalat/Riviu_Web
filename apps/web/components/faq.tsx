"use client";

import { Plus } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { DEFAULT_FAQ_ITEMS } from "../lib/faq-data";
import { sectionPad, type SectionPadding } from "../lib/section-utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export type FaqProps = {
  paddingY?: SectionPadding;
  kicker?: string;
  title?: string;
  sub?: string;
  items?: { question: string; answer: string }[];
};

export const faqDefaults = {
  paddingY: "normal" as SectionPadding,
  kicker: "FAQ",
  title: "Câu hỏi thường gặp",
  sub: "Chưa tìm thấy câu trả lời? Gửi email về contact@riviu.vn nhé.",
  items: DEFAULT_FAQ_ITEMS,
} satisfies Required<FaqProps>;

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
        open ? "border-brand-500 bg-white" : "border-black/10 bg-white"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-bold md:text-lg">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
            open ? "bg-brand-500 text-white" : "bg-brand-50 text-brand-600"
          }`}
        >
          <Plus size={16} weight="bold" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.65, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft md:text-base">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function Faq(props: FaqProps) {
  const d = { ...faqDefaults, ...props };
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      data-section="faq"
      className={`scroll-mt-24 ${sectionPad(d.paddingY)}`}
    >
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeading kicker={d.kicker} title={d.title} sub={d.sub} />

        <Reveal>
          <div className="space-y-4">
            {d.items.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                open={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
