import { ArrowRight, ChatCircleDots } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { type SectionPadding } from "../lib/section-utils";
import { OpenChatButton } from "./open-chat-button";
import { PricingBoard } from "./pricing-board";
import { Reveal } from "./reveal";

export type PricingProps = {
  paddingY?: SectionPadding;
  kicker?: string;
  title?: string;
  sub?: string;
};

export const pricingDefaults = {
  paddingY: "normal" as SectionPadding,
  kicker: "Bảng giá",
  title: "Gói truyền thông cho quán của bạn",
  sub: "",
} satisfies Required<PricingProps>;

export function Pricing(props: PricingProps) {
  const d = { ...pricingDefaults, ...props };

  return (
    <div id="bang-gia">
      <section
        data-section="bang-gia"
        className={`relative scroll-mt-24 border-t border-black/5 bg-brand-50 pb-0 ${
          d.paddingY === "compact"
            ? "pt-12 md:pt-16"
            : d.paddingY === "spacious"
              ? "pt-28 md:pt-40"
              : "pt-20 md:pt-28"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase">
              {d.kicker}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl leading-[1.08] font-black tracking-tight text-balance md:text-6xl">
              {d.title}
            </h2>
          </Reveal>
        </div>
      </section>

      <PricingBoard />

      <section className="border-b border-black/5 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <Reveal>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/bang-gia"
                data-track="pricing-summary-detail"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
              >
                Xem trang bảng giá đầy đủ
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <OpenChatButton
                track="pricing-summary-ask-ai"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-ink/15 px-7 py-3.5 text-sm font-bold transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                <ChatCircleDots size={16} weight="bold" />
                Hỏi trợ lý về bảng giá
              </OpenChatButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
