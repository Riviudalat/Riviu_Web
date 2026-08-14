"use client";

import { ArrowRight, Check } from "@phosphor-icons/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { mediaUrl } from "../lib/api";
import { sectionPad, type SectionPadding } from "../lib/section-utils";
import { SECTION_ICONS, type SectionIconKey } from "./icons";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export type ServicesProps = {
  layout?: "stack" | "list" | "grid";
  paddingY?: SectionPadding;
  kicker?: string;
  title?: string;
  sub?: string;
  contactEmail?: string;
  items?: {
    icon: SectionIconKey;
    title: string;
    description: string;
    /** Mỗi dòng một gạch đầu dòng (Puck textarea) */
    bullets: string;
    image?: string;
    imageAlt?: string;
  }[];
};

export const servicesDefaults = {
  layout: "stack" as const,
  paddingY: "normal" as SectionPadding,
  kicker: "Dịch vụ",
  title: "Giải pháp truyền thông cho thương hiệu F&B",
  sub: "Kết nối thương hiệu với cộng đồng thực khách lớn nhất Việt Nam — từ một bài review tới chiến dịch tổng thể.",
  contactEmail: "contact@riviu.vn",
  items: [
    {
      icon: "megaphone" as SectionIconKey,
      title: "Booking review & Food blogger",
      description:
        "Kết nối food blogger, KOL/KOC phù hợp với khẩu vị thương hiệu. Quản lý từ brief, lịch đăng tới báo cáo tương tác.",
      bullets:
        "Mạng lưới food blogger toàn quốc\nKiểm chứng follower thật\nBáo cáo minh bạch",
      image: "",
      imageAlt: "",
    },
    {
      icon: "storefront" as SectionIconKey,
      title: "Truyền thông thương hiệu F&B",
      description:
        "Xây dựng chiến lược hiện diện cho quán và chuỗi F&B: định vị, câu chuyện thương hiệu và kế hoạch nội dung dài hạn.",
      bullets:
        "Chiến lược định vị\nKế hoạch nội dung theo quý\nĐo lường nhận diện",
      image: "",
      imageAlt: "",
    },
    {
      icon: "chart" as SectionIconKey,
      title: "Quảng cáo trên nền tảng Riviu",
      description:
        "Vị trí hiển thị nổi bật trong trang khám phá, bộ sưu tập tuần và kết quả tìm kiếm — chạm đúng người đang tìm chỗ ăn.",
      bullets:
        "Targeting theo khu vực & món\nHiển thị trong bộ sưu tập hot\nDashboard hiệu quả realtime",
      image: "",
      imageAlt: "",
    },
    {
      icon: "film" as SectionIconKey,
      title: "Sản xuất nội dung",
      description:
        "Đội ngũ in-house chụp ảnh, quay video món ăn và không gian quán theo chuẩn nhận diện của thương hiệu.",
      bullets:
        "Ảnh & video món chuyên nghiệp\nNội dung chuẩn brand voice\nTối ưu cho từng nền tảng",
      image: "",
      imageAlt: "",
    },
    {
      icon: "community" as SectionIconKey,
      title: "Chiến dịch cộng đồng",
      description:
        "Thiết kế minigame, sự kiện check-in và thử thách review giúp thương hiệu lan tỏa tự nhiên trong cộng đồng Riviu.",
      bullets:
        "Kịch bản viral tự nhiên\nKích hoạt cộng đồng địa phương\nTổng kết insight sau chiến dịch",
      image: "",
      imageAlt: "",
    },
  ],
} satisfies Required<ServicesProps>;

type ServiceItem = NonNullable<ServicesProps["items"]>[number];

const SERVICE_PHOTOS = [
  { src: "/photos/pho.jpg", alt: "Món phở" },
  { src: "/photos/restaurant.jpg", alt: "Không gian quán" },
  { src: "/photos/coffee.jpg", alt: "Cà phê" },
  { src: "/photos/dessert.jpg", alt: "Tráng miệng" },
  { src: "/photos/grill.jpg", alt: "Đồ nướng" },
];

function servicePhoto(index: number, item: ServiceItem) {
  if (item.image) {
    return {
      src: mediaUrl(item.image),
      alt: item.imageAlt || item.title,
    };
  }
  return SERVICE_PHOTOS[index % SERVICE_PHOTOS.length] ?? SERVICE_PHOTOS[0]!;
}

function CardContent({
  item,
  index,
  contactEmail,
}: {
  item: ServiceItem;
  index: number;
  contactEmail: string;
}) {
  const Icon = SECTION_ICONS[item.icon] ?? SECTION_ICONS.megaphone;
  const number = String(index + 1).padStart(2, "0");
  const bullets = item.bullets
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <span className="group/icon flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50">
          <Icon size={30} weight="duotone" className="text-brand-500" />
        </span>
        <p className="text-base font-black text-brand-500">({number})</p>
      </div>

      <h3 className="mt-5 max-w-xl text-2xl leading-tight font-black tracking-tight text-balance md:text-3xl">
        {item.title}
      </h3>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
        {item.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {bullets.map((bullet, bulletIndex) => (
          <span
            key={bulletIndex}
            className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold text-ink-soft"
          >
            <Check size={12} weight="bold" className="text-brand-500" />
            {bullet}
          </span>
        ))}
      </div>

      <a
        href={`mailto:${contactEmail}?subject=${encodeURIComponent(`[Riviu] Quan tâm dịch vụ: ${item.title}`)}`}
        data-track={`service-${index + 1}`}
        className="group mt-7 inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:text-brand-600"
      >
        Tìm hiểu thêm
        <ArrowRight
          size={16}
          weight="bold"
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>
    </div>
  );
}

function StackCard({
  item,
  index,
  total,
  progress,
  contactEmail,
}: {
  item: ServiceItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  contactEmail: string;
}) {
  const reduced = useReducedMotion();
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const number = String(index + 1).padStart(2, "0");
  const photo = servicePhoto(index, item);
  const isLast = index === total - 1;

  return (
    <div
      className={isLast ? "relative" : "sticky"}
      style={isLast ? undefined : { top: `calc(5.5rem + ${index * 1.5}rem)` }}
    >
      <motion.div
        style={reduced || isLast ? undefined : { scale }}
        className="relative mb-8 origin-top overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl shadow-black/[0.06] md:mb-10"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[5rem] leading-none font-black text-brand-50 select-none md:right-[260px] md:text-[8rem]"
        >
          {number}
        </span>

        <div className="grid md:grid-cols-[1fr_240px]">
          <div className="p-7 md:p-12">
            <CardContent
              item={item}
              index={index}
              contactEmail={contactEmail}
            />
          </div>
          <div className="relative hidden min-h-[280px] md:block">
            {/* eslint-disable-next-line @next/next/no-img-element -- ảnh CMS, domain không cố định */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FlatCard({
  item,
  index,
  contactEmail,
}: {
  item: ServiceItem;
  index: number;
  contactEmail: string;
}) {
  const photo = servicePhoto(index, item);
  return (
    <div className="h-full overflow-hidden rounded-3xl border border-black/10 bg-white transition-colors duration-300 hover:border-brand-500">
      <div className="relative h-44 w-full">
        {/* eslint-disable-next-line @next/next/no-img-element -- ảnh CMS, domain không cố định */}
        <img
          src={photo.src}
          alt={photo.alt}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-7">
        <CardContent item={item} index={index} contactEmail={contactEmail} />
      </div>
    </div>
  );
}

export function Services(props: ServicesProps) {
  const d = { ...servicesDefaults, ...props };
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="dich-vu"
      data-section="dich-vu"
      className={`scroll-mt-24 border-y border-black/5 bg-white ${sectionPad(d.paddingY)}`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading kicker={d.kicker} title={d.title} sub={d.sub} wide />

        {d.layout === "stack" ? (
          <div ref={containerRef} className="relative">
            {d.items.map((item, index) => (
              <StackCard
                key={index}
                item={item}
                index={index}
                total={d.items.length}
                progress={scrollYProgress}
                contactEmail={d.contactEmail}
              />
            ))}
          </div>
        ) : null}

        {d.layout === "list" ? (
          <div className="space-y-6">
            {d.items.map((item, index) => (
              <Reveal key={index}>
                <FlatCard
                  item={item}
                  index={index}
                  contactEmail={d.contactEmail}
                />
              </Reveal>
            ))}
          </div>
        ) : null}

        {d.layout === "grid" ? (
          <div className="grid gap-6 md:grid-cols-2">
            {d.items.map((item, index) => (
              <Reveal key={index} delay={(index % 2) * 0.1}>
                <FlatCard
                  item={item}
                  index={index}
                  contactEmail={d.contactEmail}
                />
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
