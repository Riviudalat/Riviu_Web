import {
  ChartLineUp,
  ChatsCircle,
  Clock,
  Eye,
  Pulse,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import {
  DevicesPie,
  SectionsChart,
  TrafficChart,
} from "../../../components/admin/charts";
import { SectionHoverTable } from "../../../components/admin/section-hover-table";
import {
  type GroupCount,
  type PageRow,
  type SectionRow,
  type Summary,
  type TimePoint,
} from "../../../lib/admin-types";
import { adminFetch } from "../../../lib/server-api";

export const dynamic = "force-dynamic";

function formatDuration(ms: number): string {
  const seconds = Math.round(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5">
      <div className="flex items-center gap-2 text-ink-soft">
        {icon}
        <p className="text-xs font-bold tracking-wide uppercase">{label}</p>
      </div>
      <p className="mt-2 text-3xl font-black text-ink">{value}</p>
    </div>
  );
}

function DataTable({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-5">
      <h3 className="text-sm font-black">{title}</h3>
      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-ink-soft">Chưa có dữ liệu</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {rows.map((row, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="truncate text-ink-soft">{row.label}</span>
              <span className="shrink-0 font-bold">{row.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [
    summary,
    timeseries,
    devices,
    browsers,
    osList,
    countries,
    referrers,
    pages,
    sections,
  ] = await Promise.all([
    adminFetch<Summary>("/analytics/summary"),
    adminFetch<TimePoint[]>("/analytics/timeseries"),
    adminFetch<GroupCount[]>("/analytics/devices"),
    adminFetch<GroupCount[]>("/analytics/browsers"),
    adminFetch<GroupCount[]>("/analytics/os"),
    adminFetch<GroupCount[]>("/analytics/countries"),
    adminFetch<GroupCount[]>("/analytics/referrers"),
    adminFetch<PageRow[]>("/analytics/pages"),
    adminFetch<SectionRow[]>("/analytics/sections"),
  ]);

  const apiDown = summary === null;

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-black">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Traffic và mức độ quan tâm của khách trong 30 ngày gần nhất.
      </p>

      {apiDown ? (
        <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm font-semibold text-amber-800">
          Không lấy được dữ liệu — kiểm tra API đang chạy (pnpm --filter api
          dev) và đăng nhập lại nếu phiên hết hạn.
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard
          icon={<Pulse size={16} />}
          label="Đang online"
          value={String(summary?.online ?? 0)}
        />
        <StatCard
          icon={<UsersThree size={16} />}
          label="Khách hôm nay"
          value={String(summary?.todayVisitors ?? 0)}
        />
        <StatCard
          icon={<Eye size={16} />}
          label="Lượt xem 7 ngày"
          value={String(summary?.pageviews7d ?? 0)}
        />
        <StatCard
          icon={<Clock size={16} />}
          label="Thời gian TB"
          value={formatDuration(summary?.avgDurationMs ?? 0)}
        />
        <StatCard
          icon={<ChatsCircle size={16} />}
          label="Hội thoại chat"
          value={String(summary?.chatSessions ?? 0)}
        />
      </div>

      <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5">
        <div className="flex items-center gap-2">
          <ChartLineUp size={18} className="text-brand-500" />
          <h2 className="text-sm font-black">Khách & lượt xem 30 ngày</h2>
        </div>
        <div className="mt-4">
          <TrafficChart data={timeseries ?? []} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <h2 className="text-sm font-black">Thiết bị</h2>
          <DevicesPie data={devices ?? []} />
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <h2 className="text-sm font-black">
            Section được quan tâm nhất
          </h2>
          <div className="mt-2">
            <SectionsChart data={sections ?? []} />
          </div>
          {sections && sections.length > 0 ? (
            <SectionHoverTable rows={sections} />
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DataTable
          title="Trình duyệt"
          rows={(browsers ?? []).map((row) => ({
            label: row.key,
            value: String(row.count),
          }))}
        />
        <DataTable
          title="Hệ điều hành"
          rows={(osList ?? []).map((row) => ({
            label: row.key,
            value: String(row.count),
          }))}
        />
        <DataTable
          title="Quốc gia"
          rows={(countries ?? []).map((row) => ({
            label: row.key,
            value: String(row.count),
          }))}
        />
        <DataTable
          title="Nguồn truy cập"
          rows={(referrers ?? []).map((row) => ({
            label: row.key,
            value: String(row.count),
          }))}
        />
      </div>

      <div className="mt-6">
        <DataTable
          title="Trang được xem nhiều"
          rows={(pages ?? []).map((row) => ({
            label: row.path,
            value: `${row.views} lượt · ${formatDuration(row.avgDurationMs)}`,
          }))}
        />
      </div>
    </div>
  );
}
