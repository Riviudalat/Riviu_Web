import { VelocityMarquee } from "./effects/velocity-marquee";
import { Reveal } from "./reveal";
import { sectionPad, type SectionPadding } from "../lib/section-utils";

export type ImpactProps = {
  kicker?: string;
  statement?: string;
  accent?: string;
  sub?: string;
  paddingY?: SectionPadding;
  marqueeItems?: { text: string }[];
};

export const impactDefaults = {
  kicker: "Vì sao là Riviu",
  statement: "Một bài riviu đúng lúc đáng giá hơn",
  accent: "nghìn banner quảng cáo.",
  sub: "Người ta tin lời kể của thực khách thật hơn bất kỳ lời tự giới thiệu nào — Riviu là nơi những lời kể đó bắt đầu.",
  paddingY: "normal" as SectionPadding,
  marqueeItems: [
    { text: "RIVIU" },
    { text: "TRUYỀN THÔNG F&B" },
    { text: "REVIEW THẬT" },
    { text: "ĂN KHẮP NƠI" },
    { text: "CHƠI KHẮP CHỐN" },
  ],
} satisfies Required<ImpactProps>;

export function Impact(props: ImpactProps) {
  const d = { ...impactDefaults, ...props };

  return (
    <section
      id="an-tuong"
      data-section="an-tuong"
      className={`overflow-hidden bg-ink text-white ${sectionPad(d.paddingY)}`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.25em] text-brand-400 uppercase">
            {d.kicker}
          </p>
          <h2 className="mt-5 max-w-3xl text-3xl leading-tight font-black tracking-tight text-balance md:text-5xl">
            {d.statement} <span className="text-brand-500">{d.accent}</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
            {d.sub}
          </p>
        </Reveal>
      </div>

      <div className="mt-10 md:mt-12">
        {/* leading + padding đủ rộng để dấu tiếng Việt (Ề, Ố…) không bị cắt */}
        <VelocityMarquee baseVelocity={3}>
          {[...d.marqueeItems, ...d.marqueeItems].map((item, index) => (
            <span
              key={index}
              className="flex items-center gap-6 py-[0.18em] pr-6 text-[13vw] leading-[1.3] font-black whitespace-nowrap select-none md:text-[7vw]"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px rgba(255,255,255,0.22)",
              }}
            >
              {item.text}
              <span
                aria-hidden
                className="inline-block h-[0.14em] w-[0.14em] rounded-full bg-brand-500"
              />
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
