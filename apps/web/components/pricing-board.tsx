"use client";

import {
  CaretDown,
  Check,
  FacebookLogo,
  Note,
  Plus,
  TiktokLogo,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { tablesForGroup, type DetailTableModel } from "../lib/package-tables";
import {
  APPROVAL_PACKAGES,
  CHANNEL_PACKAGES,
  FACEBOOK_COMBOS,
  formatVnd,
  MONTHLY_PACKAGE,
  TIKTOK_PACKAGES,
} from "../lib/pricing-data";
import { OpenChatButton } from "./open-chat-button";
import { PackageCarousel } from "./package-carousel";
import { PackageDetailTable } from "./package-detail-table";

type TabId = "goi-facebook" | "bai-dang" | "goi-tiktok" | "dich-vu-khac";

type PriceCardModel = {
  id: string;
  name: string;
  highlight?: boolean;
  price: string;
  priceBefore?: string;
  unit?: string;
  bullets: string[];
  commitment?: string;
  table: DetailTableModel;
};

const TABS: {
  id: TabId;
  label: string;
  icon: typeof FacebookLogo;
}[] = [
  { id: "goi-facebook", label: "Facebook", icon: FacebookLogo },
  { id: "bai-dang", label: "Bài đăng", icon: Note },
  { id: "goi-tiktok", label: "TikTok", icon: TiktokLogo },
  { id: "dich-vu-khac", label: "Khác", icon: Plus },
];

function cardsForTab(tab: TabId): PriceCardModel[] {
  if (tab === "goi-facebook") {
    const tables = tablesForGroup("facebook-combo");
    return FACEBOOK_COMBOS.map((combo, index) => ({
      id: tables[index]!.id,
      name: combo.name,
      highlight: combo.highlight,
      price: formatVnd(combo.totalAfter),
      priceBefore: formatVnd(combo.totalBefore),
      bullets: combo.items
        .filter((item) => item.quantity != null)
        .map((item) => `${item.quantity} ${item.service.toLowerCase()}`),
      commitment: combo.commitment,
      table: tables[index]!,
    }));
  }

  if (tab === "bai-dang") {
    const month = tablesForGroup("facebook-month")[0]!;
    const approvals = tablesForGroup("approval");
    return [
      {
        id: month.id,
        name: MONTHLY_PACKAGE.name,
        price: formatVnd(MONTHLY_PACKAGE.price),
        unit: MONTHLY_PACKAGE.unit,
        bullets: MONTHLY_PACKAGE.items.map(
          (item) => `${item.total} · ${item.name}`,
        ),
        commitment: "20 bài / tháng — trọn gói",
        table: month,
      },
      ...APPROVAL_PACKAGES.map((pkg, index) => ({
        id: approvals[index]!.id,
        name: pkg.name,
        price: formatVnd(pkg.price1Month),
        unit: "tháng",
        bullets: [`${pkg.posts} bài / tháng`, pkg.detail],
        commitment: `3 tháng: ${formatVnd(pkg.price3Months)}`,
        table: approvals[index]!,
      })),
    ];
  }

  if (tab === "goi-tiktok") {
    const tables = tablesForGroup("tiktok");
    return TIKTOK_PACKAGES.map((pkg, index) => ({
      id: tables[index]!.id,
      name: pkg.name,
      price: formatVnd(pkg.price),
      unit: "tháng",
      bullets: [
        `${pkg.contents} nội dung / tháng`,
        ...(pkg.extra ? [pkg.extra] : []),
      ],
      commitment: pkg.commitment,
      table: tables[index]!,
    }));
  }

  const channels = tablesForGroup("channel");
  const [single, kol, surcharge] = [
    tablesForGroup("single")[0]!,
    tablesForGroup("kol")[0]!,
    tablesForGroup("surcharge")[0]!,
  ];
  return [
    ...CHANNEL_PACKAGES.map((pkg, index) => ({
      id: channels[index]!.id,
      name: pkg.name,
      price:
        typeof pkg.price === "number" ? formatVnd(pkg.price) : String(pkg.price),
      unit: pkg.unit,
      bullets: [pkg.detail],
      table: channels[index]!,
    })),
    {
      id: single.id,
      name: "Dịch vụ lẻ",
      price: "Theo mục",
      bullets: [
        "Chụp hình, video, bài review",
        "Fanpage, bài tổng hợp",
        "Mua đúng một hạng mục",
      ],
      table: single,
    },
    {
      id: kol.id,
      name: "KOL TikTok",
      price: "Từ 500.000đ",
      unit: "video",
      bullets: [
        "17 kênh tại Đà Lạt",
        "Review quán, cafe, homestay",
        "Giá theo follower",
      ],
      table: kol,
    },
    {
      id: surcharge.id,
      name: "Phụ thu",
      price: "Theo khu vực",
      bullets: [
        "Di chuyển nhiều chi nhánh",
        "Cuối tuần, ngoài giờ",
        "Khu vực xa / tỉnh",
      ],
      table: surcharge,
    },
  ];
}

function PackageCard({ card }: { card: PriceCardModel }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const bullets = card.bullets.slice(0, 5);

  return (
    <div>
      <article
        className={`relative overflow-hidden rounded-3xl border bg-white p-6 md:p-8 ${
          card.highlight ? "border-2 border-brand-500" : "border-black/10"
        }`}
      >
        {card.highlight ? (
          <span className="absolute top-5 -right-8 w-36 rotate-45 bg-brand-500 py-1 text-center text-[10px] font-black tracking-wider text-white uppercase">
            Phổ biến
          </span>
        ) : null}
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-start">
          <div>
            <h3 className="text-2xl font-black tracking-tight md:text-3xl">
              {card.name}
            </h3>

            {card.priceBefore ? (
              <p className="mt-5 text-sm text-ink-soft line-through">
                {card.priceBefore}
              </p>
            ) : null}
            <p className="mt-1 flex flex-wrap items-end gap-x-1.5">
              <span className="text-4xl leading-none font-black tracking-tight text-brand-600 md:text-5xl">
                {card.price}
              </span>
              {card.unit ? (
                <span className="pb-1 text-sm font-semibold text-ink-soft">
                  /{card.unit}
                </span>
              ) : null}
            </p>
            {card.commitment ? (
              <p className="mt-3 text-sm font-bold text-brand-700">
                {card.commitment}
              </p>
            ) : null}
          </div>

          <div>
            <ul className="space-y-2.5">
              {bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-sm leading-snug text-ink-soft md:text-base"
                >
                  <Check
                    size={18}
                    weight="bold"
                    className="mt-0.5 shrink-0 text-brand-500"
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600"
              >
                {open ? "Thu gọn" : "Chi tiết"}
                <CaretDown
                  size={14}
                  weight="bold"
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>
              <OpenChatButton
                track={`pricing-card-chat-${card.id}`}
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-black/10 px-5 py-3 text-sm font-bold transition-colors hover:border-brand-500 hover:text-brand-600"
              >
                Hỏi Riviu
              </OpenChatButton>
            </div>
          </div>
        </div>
      </article>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.21, 0.65, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <PackageDetailTable table={card.table} compact />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function PricingBoard() {
  const [tab, setTab] = useState<TabId>("goi-facebook");

  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.replace("#", "") as TabId;
      if (TABS.some((item) => item.id === hash)) setTab(hash);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const select = (id: TabId) => {
    setTab(id);
    history.replaceState(null, "", `#${id}`);
  };

  const cards = cardsForTab(tab);

  return (
    <section
      id={tab}
      data-section="tat-ca-goi"
      className="scroll-mt-24 bg-brand-50 pt-8 pb-16 md:pb-20"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="sticky top-20 z-20 mb-8">
          <div className="grid grid-cols-2 gap-1 rounded-2xl border border-black/10 bg-white p-1 sm:grid-cols-4">
            {TABS.map((item) => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => select(item.id)}
                  className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${
                    active
                      ? "bg-brand-500 text-white"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <item.icon size={16} weight={active ? "fill" : "regular"} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <PackageCarousel
          key={tab}
          ariaLabel={`Gói ${TABS.find((item) => item.id === tab)?.label ?? ""}`}
          items={cards.map((card) => (
            <PackageCard key={card.id} card={card} />
          ))}
        />
      </div>
    </section>
  );
}
