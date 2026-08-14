"use client";

import { motion, useReducedMotion } from "motion/react";
import { SECTION_ICONS, type SectionIconKey } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { sectionPad, type SectionPadding } from "../lib/section-utils";

export type ProcessProps = {
  kicker?: string;
  title?: string;
  sub?: string;
  paddingY?: SectionPadding;
  steps?: { icon: SectionIconKey; title: string; text: string }[];
};

export const processDefaults = {
  kicker: "Quy trình",
  title: "Hợp tác cùng Riviu trong 4 bước",
  sub: "Gọn gàng, minh bạch — từ buổi trao đổi đầu tiên tới báo cáo cuối chiến dịch.",
  paddingY: "normal" as SectionPadding,
  steps: [
    {
      icon: "handshake" as SectionIconKey,
      title: "Kết nối & brief",
      text: "Trao đổi mục tiêu, khẩu vị thương hiệu và ngân sách dự kiến.",
    },
    {
      icon: "compass" as SectionIconKey,
      title: "Chiến lược & báo giá",
      text: "Đề xuất kênh, KOL/food blogger phù hợp kèm báo giá chi tiết.",
    },
    {
      icon: "rocket" as SectionIconKey,
      title: "Triển khai chiến dịch",
      text: "Sản xuất nội dung, đăng bài theo lịch, tối ưu theo phản hồi thực.",
    },
    {
      icon: "chart" as SectionIconKey,
      title: "Báo cáo & mở rộng",
      text: "Tổng kết số liệu minh bạch, đề xuất bước tăng trưởng tiếp theo.",
    },
  ],
} satisfies Required<ProcessProps>;

export function Process(props: ProcessProps) {
  const d = { ...processDefaults, ...props };
  const reduced = useReducedMotion();

  return (
    <section
      id="quy-trinh"
      data-section="quy-trinh"
      className={`scroll-mt-24 border-y border-black/5 bg-brand-50 ${sectionPad(d.paddingY)}`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading kicker={d.kicker} title={d.title} sub={d.sub} />

        <div className="relative">
          {/* Đường nối giữa các bước (desktop) */}
          <motion.div
            aria-hidden
            className="absolute top-7 right-[12%] left-[12%] hidden h-0.5 origin-left bg-brand-200 md:block"
            initial={reduced ? undefined : { scaleX: 0 }}
            whileInView={reduced ? undefined : { scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.21, 0.65, 0.36, 1] }}
          />

          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {d.steps.map((step, index) => {
              const Icon = SECTION_ICONS[step.icon] ?? SECTION_ICONS.handshake;
              return (
                <Reveal key={index} delay={index * 0.12}>
                  <div className="relative text-center md:px-2">
                    <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-200 bg-white">
                      <Icon
                        size={28}
                        weight="duotone"
                        className="text-brand-500"
                      />
                    </div>
                    <p className="mt-4 text-xs font-black tracking-widest text-brand-500">
                      BƯỚC {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-lg font-black">{step.title}</h3>
                    <p className="mx-auto mt-2 max-w-[260px] text-sm leading-relaxed text-ink-soft">
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
