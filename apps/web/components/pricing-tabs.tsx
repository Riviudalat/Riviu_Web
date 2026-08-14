"use client";

import {
  ArrowsHorizontal,
  CaretLeft,
  CaretRight,
  Check,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AD_RULES,
  APPROVAL_PACKAGES,
  CHANNEL_PACKAGES,
  formatVnd,
  MONTHLY_PACKAGE,
  SINGLE_SERVICES,
  SURCHARGES,
  TIKTOK_KOLS,
  TIKTOK_PACKAGES,
  type SimplePackage,
} from "../lib/pricing-data";

function price(value: number | string): string {
  return typeof value === "number" ? formatVnd(value) : value;
}

function ServiceRows({ items }: { items: SimplePackage[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 border-b border-black/5 p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        >
          <div className="min-w-0">
            <p className="font-bold">{item.name}</p>
            <p className="mt-0.5 text-sm text-ink-soft">{item.detail}</p>
          </div>
          <p className="shrink-0 text-lg font-black whitespace-nowrap text-brand-600">
            {price(item.price)}
            {item.unit ? (
              <span className="ml-1 text-xs font-semibold text-ink-soft">
                / {item.unit}
              </span>
            ) : null}
          </p>
        </div>
      ))}
    </div>
  );
}

/**
 * Dải thẻ GÓI lướt ngang: snap từng thẻ, thẻ kế tiếp lộ một phần, mũi tên
 * hai bên và cú đẩy nhẹ lúc mở để người xem nhận ra là lướt được.
 */
function PackageCarousel({
  items,
  ariaLabel,
}: {
  items: ReactNode[];
  ariaLabel: string;
}) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);

    // Hiệu ứng nhận biết: đẩy dải thẻ sang trái một nhịp rồi trả về
    const el = trackRef.current;
    let nudge: number | undefined;
    let nudgeBack: number | undefined;
    if (el && !reduced && el.scrollWidth > el.clientWidth) {
      nudge = window.setTimeout(() => {
        el.scrollTo({ left: 56, behavior: "smooth" });
        nudgeBack = window.setTimeout(
          () => el.scrollTo({ left: 0, behavior: "smooth" }),
          450,
        );
      }, 500);
    }
    return () => {
      window.removeEventListener("resize", update);
      window.clearTimeout(nudge);
      window.clearTimeout(nudgeBack);
    };
  }, [reduced]);

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    el?.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const scrollable = canLeft || canRight;

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={update}
        role="region"
        aria-label={ariaLabel}
        className="-mx-4 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="w-[82%] min-w-[240px] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
          >
            {item}
          </div>
        ))}
      </div>

      {scrollable ? (
        <div className="mt-3 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
            <ArrowsHorizontal size={14} weight="bold" className="text-brand-500" />
            Lướt ngang để xem các gói
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              disabled={!canLeft}
              aria-label="Xem gói phía trước"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:border-brand-500 hover:text-brand-600 disabled:cursor-default disabled:opacity-30 disabled:hover:border-black/10 disabled:hover:text-ink"
            >
              <CaretLeft size={15} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              disabled={!canRight}
              aria-label="Xem gói tiếp theo"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:border-brand-500 hover:text-brand-600 disabled:cursor-default disabled:opacity-30 disabled:hover:border-black/10 disabled:hover:text-ink"
            >
              <CaretRight size={15} weight="bold" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const TABS = [
  { id: "goi-thang", label: "Gói Facebook tháng" },
  { id: "tiktok", label: "Gói TikTok" },
  { id: "duyet-bai", label: "Duyệt bài" },
  { id: "xay-kenh", label: "Xây kênh" },
  { id: "dich-vu-le", label: "Dịch vụ lẻ" },
  { id: "kol", label: "KOL TikTok" },
  { id: "phu-thu", label: "Phụ thu" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function TabPanel({ id }: { id: TabId }) {
  if (id === "goi-thang") {
    return (
      <div>
        <p className="mb-4 text-sm text-ink-soft">
          Một gói trọn cho Facebook — Riviu đăng và reup đều đặn trên 2 group
          lớn. Gói TikTok tính riêng ở tab bên cạnh.
        </p>
        <article className="overflow-hidden rounded-2xl border border-black/10 bg-white">
          <div className="flex flex-col gap-2 border-b border-black/10 bg-brand-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black tracking-wider text-brand-600 uppercase">
                {MONTHLY_PACKAGE.name}
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Tổng 20 bài mỗi tháng trên group “Đà Lạt đi và trải nghiệm” và
                “Review Đà Lạt”
              </p>
            </div>
            <p className="shrink-0 text-2xl font-black tracking-tight text-brand-600">
              {formatVnd(MONTHLY_PACKAGE.price)}
              <span className="ml-1 text-xs font-semibold text-ink-soft">
                / {MONTHLY_PACKAGE.unit} · trọn gói
              </span>
            </p>
          </div>
          <div className="grid md:grid-cols-2">
            {MONTHLY_PACKAGE.items.map((item, index) => (
              <div
                key={item.name}
                className={`p-6 ${
                  index === 0
                    ? "border-b border-black/5 md:border-r md:border-b-0"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold">{item.name}</p>
                  <span className="rounded-full bg-brand-500 px-2.5 py-1 text-xs font-black whitespace-nowrap text-white">
                    {item.total}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="border-t border-black/5 px-6 py-3 text-xs text-ink-soft">
            {MONTHLY_PACKAGE.note}
          </p>
        </article>
      </div>
    );
  }

  if (id === "tiktok") {
    return (
      <div>
        <p className="mb-4 text-sm text-ink-soft">
          Bảng giá TikTok tách riêng khỏi Facebook — 4 mức phủ sóng, nội dung
          tạo và chuẩn hóa bằng AI, lồng ghép tự nhiên.
        </p>
        <PackageCarousel
          ariaLabel="Các gói TikTok phủ sóng"
          items={TIKTOK_PACKAGES.map((pack) => (
            <article
              key={pack.name}
              className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-5"
            >
              <p className="text-sm font-black tracking-wider text-brand-600 uppercase">
                {pack.name}
              </p>
              <p className="mt-2 text-2xl font-black tracking-tight">
                {formatVnd(pack.price)}
                <span className="ml-1 text-xs font-semibold text-ink-soft">
                  / tháng
                </span>
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex gap-2">
                  <Check
                    size={15}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-brand-500"
                  />
                  {pack.contents} nội dung phủ sóng thương hiệu
                </li>
                {pack.extra ? (
                  <li className="flex gap-2">
                    <Check
                      size={15}
                      weight="bold"
                      className="mt-0.5 shrink-0 text-brand-500"
                    />
                    {pack.extra}
                  </li>
                ) : null}
                <li className="flex gap-2">
                  <Check
                    size={15}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-brand-500"
                  />
                  {pack.commitment}
                </li>
              </ul>
            </article>
          ))}
        />
      </div>
    );
  }

  if (id === "duyet-bai") {
    return (
      <div>
        <p className="mb-4 text-sm text-ink-soft">
          Hình ảnh và nội dung do khách hàng chuẩn bị, đăng dạng check-in trong
          vòng 1 tháng.
        </p>
        <PackageCarousel
          ariaLabel="Các gói duyệt bài"
          items={APPROVAL_PACKAGES.map((pack) => (
            <article
              key={pack.name}
              className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-5"
            >
              <p className="text-sm font-black tracking-wider text-brand-600 uppercase">
                {pack.name}
              </p>
              <p className="mt-2 text-sm text-ink-soft">{pack.detail}</p>
              <div className="mt-auto pt-4">
                <p className="text-sm font-bold">{pack.posts} bài / tháng</p>
                <p className="mt-1 text-2xl font-black tracking-tight text-brand-600">
                  {formatVnd(pack.price1Month)}
                  <span className="ml-1 text-xs font-semibold text-ink-soft">
                    / tháng
                  </span>
                </p>
                <p className="mt-0.5 text-sm font-semibold text-ink-soft">
                  {formatVnd(pack.price3Months)} / 3 tháng
                </p>
              </div>
            </article>
          ))}
        />
      </div>
    );
  }

  if (id === "xay-kenh") {
    return (
      <div>
        <p className="mb-4 text-sm text-ink-soft">
          Xây và duy trì kênh riêng của quán với đội ngũ Riviu.
        </p>
        <PackageCarousel
          ariaLabel="Các gói xây kênh"
          items={CHANNEL_PACKAGES.map((pack) => (
            <article
              key={pack.name}
              className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6"
            >
              <p className="text-sm font-black tracking-wider text-brand-600 uppercase">
                {pack.name}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                {pack.detail}
              </p>
              <p className="mt-5 text-2xl font-black tracking-tight text-brand-600">
                {price(pack.price)}
                {pack.unit ? (
                  <span className="ml-1 text-xs font-semibold text-ink-soft">
                    / {pack.unit}
                  </span>
                ) : null}
              </p>
            </article>
          ))}
        />
      </div>
    );
  }

  if (id === "dich-vu-le") {
    return (
      <div>
        <p className="mb-4 text-sm text-ink-soft">
          Chọn đúng thứ bạn cần — từ chụp hình, video tới từng bài đăng.
        </p>
        <ServiceRows items={SINGLE_SERVICES} />
      </div>
    );
  }

  if (id === "kol") {
    return (
      <div>
        <p className="mb-4 text-sm text-ink-soft">
          Video review bởi các kênh TikTok trong hệ sinh thái Riviu Đà Lạt.
        </p>
        <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
          <div className="hidden grid-cols-[1.4fr_110px_1.4fr_150px_130px] gap-4 border-b border-black/10 bg-neutral-50 px-5 py-3 text-xs font-bold tracking-wider text-ink-soft uppercase md:grid">
            <span>Kênh TikTok</span>
            <span className="text-right">Follower</span>
            <span>Phong cách</span>
            <span>Hình thức</span>
            <span className="text-right">Giá / video</span>
          </div>
          {TIKTOK_KOLS.map((kol, index) => (
            <div
              key={index}
              className="grid gap-1 border-b border-black/5 px-5 py-4 last:border-b-0 md:grid-cols-[1.4fr_110px_1.4fr_150px_130px] md:items-center md:gap-4"
            >
              <p className="font-bold">{kol.channel}</p>
              <p className="text-sm text-ink-soft md:text-right">
                {kol.followers} follower
              </p>
              <p className="hidden text-sm text-ink-soft md:block">
                {kol.style}
              </p>
              <p className="text-sm text-ink-soft">{kol.format}</p>
              <p className="font-black text-brand-600 md:text-right">
                {formatVnd(kol.price)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div>
        <h3 className="text-sm font-black tracking-wider text-ink-soft uppercase">
          Phụ thu
        </h3>
        <div className="mt-3">
          <ServiceRows items={SURCHARGES} />
        </div>
      </div>
      <div className="space-y-5">
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <h3 className="text-sm font-black tracking-wider text-ink-soft uppercase">
            Hình ảnh / bài viết
          </h3>
          <ul className="mt-3 space-y-2">
            {AD_RULES.images.map((rule, index) => (
              <li key={index} className="flex gap-2 text-sm">
                <Check
                  size={15}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-brand-500"
                />
                {rule}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <h3 className="text-sm font-black tracking-wider text-ink-soft uppercase">
            Video
          </h3>
          <ul className="mt-3 space-y-2">
            {AD_RULES.videos.map((rule, index) => (
              <li key={index} className="flex gap-2 text-sm">
                <Check
                  size={15}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-brand-500"
                />
                {rule}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-soft">
            {AD_RULES.notes.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}

const SECONDARY_TABS = TABS.filter((tab) =>
  ["dich-vu-le", "kol", "phu-thu"].includes(tab.id),
);

function PackageSection({
  id,
  kicker,
  title,
  description,
  children,
  cream = false,
}: {
  id: string;
  kicker: string;
  title: string;
  description: string;
  children: ReactNode;
  cream?: boolean;
}) {
  return (
    <section
      id={id}
      data-section={id}
      className={`scroll-mt-24 py-12 md:py-16 ${cream ? "bg-brand-50" : "bg-white"}`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase">
          {kicker}
        </p>
        <h2 className="mt-3 max-w-3xl text-2xl font-black tracking-tight text-balance md:text-4xl">
          {title}
        </h2>
        <p className="mt-2 mb-7 max-w-2xl text-sm leading-relaxed text-ink-soft">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}

/** Các nhóm "Gói" là section độc lập; chỉ dịch vụ bổ sung mới nằm trong tab. */
export function PricingTabs() {
  const [open, setOpen] = useState<TabId>("dich-vu-le");

  return (
    <>
      <PackageSection
        id="goi-facebook-thang"
        kicker="Gói Facebook tháng"
        title="Duy trì hiện diện đều đặn — một mức giá trọn gói"
        description="Facebook tháng là một gói độc lập, không gộp với TikTok: 20 bài mỗi tháng trên hai group Đà Lạt do Riviu vận hành."
      >
        <TabPanel id="goi-thang" />
      </PackageSection>

      <PackageSection
        id="goi-tiktok"
        kicker="Gói TikTok"
        title="Chọn mức phủ sóng phù hợp mục tiêu view"
        description="Bốn gói TikTok được trình bày riêng. Kéo hoặc bấm mũi tên để xem lần lượt từng gói."
        cream
      >
        <TabPanel id="tiktok" />
      </PackageSection>

      <PackageSection
        id="goi-duyet-bai"
        kicker="Gói duyệt bài"
        title="Chủ động nội dung, chọn số lượng bài cần duyệt"
        description="Ba gói theo số bài, số group và thời hạn. Vuốt ngang để so sánh nhanh."
      >
        <TabPanel id="duyet-bai" />
      </PackageSection>

      <PackageSection
        id="goi-xay-kenh"
        kicker="Gói xây kênh"
        title="Xây kênh TikTok hoặc Fanpage riêng cho quán"
        description="Tách riêng hai lựa chọn xây kênh để bạn thấy rõ đầu việc và ngân sách hàng tháng."
        cream
      >
        <TabPanel id="xay-kenh" />
      </PackageSection>

      <section
        id="dich-vu-khac"
        data-section="dich-vu-khac"
        className="scroll-mt-24 py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase">
            Dịch vụ bổ sung
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-tight text-balance md:text-4xl">
            Dịch vụ lẻ, KOL TikTok và phụ thu
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Các bảng dài được gom theo nhu cầu; phần gói chính ở các section
            riêng phía trên.
          </p>

          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {SECONDARY_TABS.map((tab) => {
              const active = open === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setOpen(tab.id)}
                  className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-bold whitespace-nowrap transition-colors ${
                    active
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-black/10 text-ink-soft hover:border-brand-500 hover:text-brand-600"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={open}
              id={open}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-6"
            >
              <TabPanel id={open} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
