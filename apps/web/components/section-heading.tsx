import { Reveal } from "./reveal";

export function SectionHeading({
  kicker,
  title,
  sub,
  wide = false,
}: {
  kicker: string;
  title: string;
  sub?: string;
  wide?: boolean;
}) {
  return (
    <Reveal
      className={`mx-auto mb-14 text-center md:mb-20 ${wide ? "max-w-6xl" : "max-w-3xl"}`}
    >
      <p className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase">
        {kicker}
      </p>
      <h2 className="mt-4 text-3xl leading-tight font-black tracking-tight text-balance md:text-5xl">
        {title}
      </h2>
      {sub ? (
        <p
          className={`mt-5 text-base text-ink-soft md:text-lg ${wide ? "mx-auto max-w-6xl xl:whitespace-nowrap" : ""}`}
        >
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}
