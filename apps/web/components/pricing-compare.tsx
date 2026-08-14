import { Check, Minus } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {
  FACEBOOK_COMBOS,
  formatVnd,
  type ComboPackage,
} from "../lib/pricing-data";
import { Reveal } from "./reveal";

function itemQty(
  combo: ComboPackage,
  matcher: (service: string) => boolean,
): number | null {
  const item = combo.items.find((entry) => matcher(entry.service));
  if (!item) return null;
  return item.quantity ?? 1;
}

function hasAds(combo: ComboPackage): boolean {
  return combo.items.some((entry) =>
    entry.service.toLowerCase().includes("ads"),
  );
}

type Cell = string | number | boolean | null;

const ROWS: { label: string; hint?: string; cells: Cell[] }[] = [
  {
    label: "Bài Review",
    hint: "Group Đà Lạt đi và trải nghiệm + reup Review Đà Lạt",
    cells: FACEBOOK_COMBOS.map((combo) =>
      itemQty(combo, (service) => service === "Bài Review"),
    ),
  },
  {
    label: "Bài check-in",
    cells: FACEBOOK_COMBOS.map((combo) =>
      itemQty(combo, (service) => service.toLowerCase().includes("check-in")),
    ),
  },
  {
    label: "Bài Review “Thánh Riviu”",
    cells: FACEBOOK_COMBOS.map((combo) =>
      itemQty(combo, (service) => service.includes("Thánh Riviu")),
    ),
  },
  {
    label: "Bài giới thiệu fanpage",
    hint: "Riviu.vn Đà Lạt — cam kết 70.000 lượt tiếp cận",
    cells: FACEBOOK_COMBOS.map((combo) =>
      itemQty(combo, (service) =>
        service.toLowerCase().includes("giới thiệu trên fanpage"),
      ),
    ),
  },
  {
    label: "Bài tổng hợp",
    hint: "Top 1 bài tổng hợp theo chủ đề",
    cells: FACEBOOK_COMBOS.map((combo) =>
      itemQty(combo, (service) => service.toLowerCase().includes("tổng hợp")),
    ),
  },
  {
    label: "Facebook Ads",
    hint: "Phí 30% dịch vụ, tối thiểu 100.000đ/ngày",
    cells: FACEBOOK_COMBOS.map((combo) => hasAds(combo)),
  },
  {
    label: "Cam kết tương tác",
    cells: FACEBOOK_COMBOS.map((combo) => combo.commitInteractions),
  },
  {
    label: "Cam kết tiếp cận",
    cells: FACEBOOK_COMBOS.map((combo) => combo.commitReach ?? null),
  },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <Check
        size={18}
        weight="bold"
        className="mx-auto text-brand-500"
        aria-label="Có"
      />
    );
  }
  if (value === false || value === null) {
    return (
      <Minus size={16} className="mx-auto text-black/20" aria-label="Không có" />
    );
  }
  if (typeof value === "number") {
    return (
      <span className="font-black">
        {value >= 100 ? value.toLocaleString("vi-VN") : `${value}×`}
      </span>
    );
  }
  return <span className="font-bold">{value}</span>;
}

/** Bảng so sánh 4 gói combo — một hàng một hạng mục, Gói 3 nổi bật. */
export function PricingCompare() {
  return (
    <section
      id="combo"
      data-section="combo"
      className="scroll-mt-36 py-12 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase">
            Gói combo Facebook
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-tight text-balance md:text-4xl">
            So sánh 4 gói — chọn đúng mức phủ sóng
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Mỗi gói gồm nội dung Riviu sản xuất và đăng trên hệ sinh thái
            group/fanpage. Áp dụng 1 gói / quán / 30 ngày.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse overflow-hidden rounded-3xl border border-black/10 bg-white text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  <th className="w-[220px] px-5 py-4 text-left text-xs font-bold tracking-wider text-ink-soft uppercase">
                    Hạng mục
                  </th>
                  {FACEBOOK_COMBOS.map((combo) => (
                    <th
                      key={combo.name}
                      className={`px-4 py-4 text-center ${
                        combo.highlight ? "bg-brand-50" : ""
                      }`}
                    >
                      {combo.highlight ? (
                        <span className="mb-1 inline-block rounded-full bg-brand-500 px-2.5 py-0.5 text-[10px] font-black tracking-wider text-white uppercase">
                          Phổ biến
                        </span>
                      ) : null}
                      <p className="font-black">{combo.name}</p>
                      <p className="mt-1 text-lg font-black tracking-tight text-brand-500">
                        {formatVnd(combo.totalAfter)}
                      </p>
                      <p className="text-[11px] text-ink-soft line-through">
                        {formatVnd(combo.totalBefore)}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-black/5 last:border-b-0"
                  >
                    <th className="px-5 py-3.5 text-left font-bold">
                      {row.label}
                      {row.hint ? (
                        <span className="mt-0.5 block text-[11px] font-normal text-ink-soft">
                          {row.hint}
                        </span>
                      ) : null}
                    </th>
                    {row.cells.map((cell, index) => (
                      <td
                        key={index}
                        className={`px-4 py-3.5 text-center ${
                          FACEBOOK_COMBOS[index]?.highlight ? "bg-brand-50" : ""
                        }`}
                      >
                        <CellValue value={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th className="px-5 py-4" />
                  {FACEBOOK_COMBOS.map((combo) => (
                    <td
                      key={combo.name}
                      className={`px-4 py-4 text-center ${
                        combo.highlight ? "bg-brand-50" : ""
                      }`}
                    >
                      <Link
                        href="/#lien-he"
                        data-track={`pricing-${combo.name}`}
                        className={`inline-flex w-full items-center justify-center rounded-full py-2.5 text-xs font-bold transition-colors ${
                          combo.highlight
                            ? "bg-brand-500 text-white hover:bg-brand-600"
                            : "border border-ink/15 hover:border-brand-500 hover:text-brand-600"
                        }`}
                      >
                        Chọn {combo.name}
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
