"use client";

import { Eye } from "@phosphor-icons/react";
import { useState } from "react";
import {
  pageLabel,
  SECTION_BLURBS,
  sectionLabel,
  type SectionRow,
} from "../../lib/admin-types";

function formatDuration(ms: number): string {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function sectionHref(path: string, sectionId: string): string {
  const page = path || "/";
  if (sectionId === "hero") return page;
  if (sectionId === "bang-gia-page") return "/bang-gia";
  if (sectionId === "khac") return page;
  return `${page}#${sectionId}`;
}

/** Bảng section: hover một dòng hiện card cho biết khách đang xem đoạn nào. */
export function SectionHoverTable({ rows }: { rows: SectionRow[] }) {
  const [active, setActive] = useState<SectionRow | null>(null);

  return (
    <div className="mt-4">
      <div
        className={`mb-3 rounded-2xl border p-4 transition-colors ${
          active
            ? "border-brand-200 bg-brand-50"
            : "border-dashed border-black/15 bg-neutral-50"
        }`}
      >
        {active ? (
          <>
            <p className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-brand-600 uppercase">
              <Eye size={12} weight="bold" />
              Khách đang xem
            </p>
            <p className="mt-1.5 text-base font-black">
              {sectionLabel(active.sectionId)}
            </p>
            <p className="mt-0.5 text-xs text-ink-soft">
              {pageLabel(active.path)} · {sectionHref(active.path, active.sectionId)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              {SECTION_BLURBS[active.sectionId] ??
                "Đoạn nội dung khách đã cuộn tới trên trang này."}
            </p>
            <p className="mt-2 text-xs font-semibold text-ink-soft">
              {active.reached} khách · TB {formatDuration(active.avgDwellMs)} ·{" "}
              {active.clicks} click
            </p>
          </>
        ) : (
          <p className="text-sm text-ink-soft">
            Di chuột vào một dòng bên dưới để xem khách đang ở đoạn nào trên
            trang chủ hoặc /bang-gia.
          </p>
        )}
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-black/10 text-left text-xs text-ink-soft uppercase">
            <th className="py-2">Section</th>
            <th className="py-2 text-right">Xem tới</th>
            <th className="py-2 text-right">Thời gian TB</th>
            <th className="py-2 text-right">Click</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const key = `${row.path}:${row.sectionId}`;
            const hovered =
              active?.path === row.path && active.sectionId === row.sectionId;
            return (
              <tr
                key={key}
                onMouseEnter={() => setActive(row)}
                onMouseLeave={() => setActive(null)}
                className={`cursor-default border-b border-black/5 transition-colors ${
                  hovered ? "bg-brand-50" : "hover:bg-neutral-50"
                }`}
              >
                <td className="py-2.5">
                  <p className="font-semibold">{sectionLabel(row.sectionId)}</p>
                  <p className="text-xs text-ink-soft">{pageLabel(row.path)}</p>
                </td>
                <td className="py-2.5 text-right">{row.reachPct}%</td>
                <td className="py-2.5 text-right">
                  {formatDuration(row.avgDwellMs)}
                </td>
                <td className="py-2.5 text-right">{row.clicks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
