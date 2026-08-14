"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { PRICING_TABLES, type PricingTableId } from "../lib/chat-pricing";
import { tablesForGroup } from "../lib/package-tables";
import { PackageDetailTable } from "./package-detail-table";

function MoreLink({ hash, children }: { hash: string; children: string }) {
  return (
    <Link
      href={`/bang-gia#${hash}`}
      className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-600 hover:text-brand-500"
    >
      {children}
      <ArrowRight size={12} weight="bold" />
    </Link>
  );
}

export function ChatPricingMenu({
  onPick,
}: {
  onPick: (prompt: string) => void;
}) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-1.5">
      {PRICING_TABLES.map((table) => (
        <button
          key={table.id}
          type="button"
          onClick={() => onPick(table.prompt)}
          className="cursor-pointer rounded-xl border border-black/10 bg-brand-50 px-3 py-2 text-left transition-colors hover:border-brand-500 hover:bg-white"
        >
          <p className="text-xs font-black text-ink">{table.label}</p>
          <p className="text-[11px] leading-snug text-ink-soft">{table.blurb}</p>
        </button>
      ))}
    </div>
  );
}

const GROUP_HASH: Record<PricingTableId, string> = {
  "facebook-combo": "goi-facebook",
  "facebook-month": "bai-dang",
  tiktok: "goi-tiktok",
  approval: "bai-dang",
  channel: "dich-vu-khac",
  single: "dich-vu-khac",
  kol: "dich-vu-khac",
  surcharge: "dich-vu-khac",
};

export function ChatPricingTable({ id }: { id: PricingTableId }) {
  const tables = tablesForGroup(id);

  return (
    <div className="mt-2">
      <div className="max-h-72 space-y-3 overflow-y-auto overflow-x-auto pr-1">
        {tables.map((table) => (
          <PackageDetailTable key={table.id} table={table} compact />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        <MoreLink hash={GROUP_HASH[id]}>Xem đủ trên trang bảng giá</MoreLink>
        <MoreLink hash="hieu-qua">Xem bài nổi bật</MoreLink>
      </div>
    </div>
  );
}
