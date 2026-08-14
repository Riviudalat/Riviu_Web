import type { DetailRow, DetailTableModel } from "../lib/package-tables";

function detailBullets(row: DetailRow): string[] {
  const lines = row.detail
    .split(/\n|(?:\s+·\s+)/)
    .map((line) => line.replace(/^[•-]\s*/, "").trim())
    .filter(Boolean);

  if (row.quantity && /^\d+$/.test(row.quantity) && row.quantity !== "1") {
    return [`Số lượng: ${row.quantity}`, ...lines];
  }
  return lines.length > 0 ? lines : [row.detail];
}

export function PackageDetailTable({
  table,
  compact = false,
}: {
  table: DetailTableModel;
  compact?: boolean;
}) {
  const cell = compact ? "px-3 py-2.5 md:px-4" : "px-4 py-3 md:px-5";

  return (
    <div
      className={`h-fit min-w-0 overflow-hidden rounded-2xl border bg-white ${
        table.highlight ? "border-brand-500" : "border-black/10"
      }`}
    >
      {table.title ? (
        <div className="border-b border-black/5 px-4 py-2.5 md:px-5">
          <h3 className="text-sm font-black tracking-wide uppercase">
            {table.title}
          </h3>
        </div>
      ) : null}

      <div className="min-w-0 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left text-xs md:min-w-0 md:text-sm">
          <thead>
            <tr className="bg-brand-500 text-center text-[11px] font-black tracking-wide text-white uppercase">
              <th className={`${cell} text-left`}>Dịch vụ</th>
              <th className={`${cell} text-left`}>Thông tin</th>
              <th className={`${cell} whitespace-nowrap`}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, index) => (
              <tr
                key={`${row.service}-${index}`}
                className="border-b border-black/10 last:border-b-0"
              >
                <td className={`${cell} align-top font-bold`}>{row.service}</td>
                <td className={`${cell} align-top text-ink-soft`}>
                  <ul className="list-disc space-y-1 pl-4">
                    {detailBullets(row).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </td>
                <td
                  className={`${cell} align-top text-center font-black whitespace-nowrap text-ink`}
                >
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.totalAfter || table.totalBefore ? (
        <div
          className={`space-y-1 border-t border-black/10 px-4 py-3 text-sm md:px-5 ${
            compact ? "py-2 text-xs" : ""
          }`}
        >
          {table.totalBefore ? (
            <p className="flex justify-between gap-4 text-ink-soft">
              <span className="font-bold">Tổng cộng</span>
              <span>{table.totalBefore}</span>
            </p>
          ) : null}
          {table.discount ? (
            <p className="flex justify-between gap-4 text-ink-soft">
              <span className="font-bold">Giảm giá</span>
              <span>{table.discount}</span>
            </p>
          ) : null}
          {table.totalAfter ? (
            <p className="flex justify-between gap-4 font-black text-brand-600">
              <span>Thành tiền</span>
              <span>{table.totalAfter}</span>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
