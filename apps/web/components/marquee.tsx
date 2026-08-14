import {
  AirplaneTilt,
  Bed,
  BowlFood,
  Cake,
  Coffee,
  Confetti,
  FishSimple,
  ForkKnife,
  Hamburger,
  IceCream,
  Leaf,
  MapPin,
  Martini,
  Pepper,
  Sparkle,
  Storefront,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import { VelocityMarquee } from "./effects/velocity-marquee";

type MarqueeIcon = ComponentType<{
  size?: number;
  weight?: "regular" | "duotone" | "fill";
  className?: string;
}>;

const topicIcons: MarqueeIcon[] = [
  ForkKnife,
  FishSimple,
  Pepper,
  BowlFood,
  Leaf,
  Sparkle,
  Cake,
  Coffee,
  Hamburger,
  IceCream,
  Storefront,
  Martini,
];

const placeIcons: MarqueeIcon[] = [
  MapPin,
  MapPin,
  MapPin,
  MapPin,
  MapPin,
  MapPin,
  AirplaneTilt,
  Coffee,
  Cake,
  Martini,
  Confetti,
  Bed,
];

export type MarqueeProps = {
  topics?: { label: string }[];
  places?: { label: string }[];
};

export const marqueeDefaults = {
  topics: [
    { label: "Món Hàn" },
    { label: "Món Nhật" },
    { label: "Món Thái" },
    { label: "Cơm tấm" },
    { label: "Healthy" },
    { label: "Skincare" },
    { label: "Bánh flan" },
    { label: "Cà phê" },
    { label: "Ăn vặt" },
    { label: "Tráng miệng" },
    { label: "Lẩu nướng" },
    { label: "Bar & Pub" },
  ],
  places: [
    { label: "Hồ Chí Minh" },
    { label: "Hà Nội" },
    { label: "Đà Nẵng" },
    { label: "Đà Lạt" },
    { label: "Huế" },
    { label: "Cần Thơ" },
    { label: "Du lịch" },
    { label: "Cà phê" },
    { label: "Bakery" },
    { label: "Bar & Pub" },
    { label: "Vui chơi" },
    { label: "Nghỉ dưỡng" },
  ],
} satisfies Required<MarqueeProps>;

function MarqueeChips({
  items,
  icons,
}: {
  items: { label: string }[];
  icons: MarqueeIcon[];
}) {
  return (
    <>
      {[...items, ...items].map((item, index) => {
        const Icon = icons[index % icons.length] ?? MapPin;
        return (
          <span
            key={index}
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-ink-soft"
          >
            <Icon size={16} weight="duotone" className="text-brand-500" />
            {item.label}
          </span>
        );
      })}
    </>
  );
}

export function Marquee(props: MarqueeProps) {
  const d = { ...marqueeDefaults, ...props };

  return (
    <section className="border-y border-black/5 bg-brand-50 py-8">
      <VelocityMarquee baseVelocity={2.4}>
        <MarqueeChips items={d.topics} icons={topicIcons} />
      </VelocityMarquee>
      <div className="mt-4">
        <VelocityMarquee baseVelocity={-2}>
          <MarqueeChips items={d.places} icons={placeIcons} />
        </VelocityMarquee>
      </div>
    </section>
  );
}
