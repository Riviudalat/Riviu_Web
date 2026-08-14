"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  pageLabel,
  sectionLabel,
  type GroupCount,
  type SectionRow,
  type TimePoint,
} from "../../lib/admin-types";

const BRAND = "#ff6600";
const BRAND_LIGHT = "#ffb37d";
const PIE_COLORS = ["#ff6600", "#ffb37d", "#8a3800", "#ffd0ad", "#4b4b4b"];

export function TrafficChart({ data }: { data: TimePoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#00000010" />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 11 }}
          tickFormatter={(value: string) => value.slice(5)}
        />
        <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="visitors"
          name="Khách"
          stroke={BRAND}
          fill={BRAND}
          fillOpacity={0.25}
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="pageviews"
          name="Lượt xem"
          stroke={BRAND_LIGHT}
          fill={BRAND_LIGHT}
          fillOpacity={0.2}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DevicesPie({ data }: { data: GroupCount[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="key"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.key}
              fill={PIE_COLORS[index % PIE_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function SectionsChart({ data }: { data: SectionRow[] }) {
  const chartData = data.slice(0, 8).map((row) => ({
    name: `${sectionLabel(row.sectionId)} · ${pageLabel(row.path)}`,
    "Thời gian xem TB (giây)": Math.round(row.avgDwellMs / 1000),
    "Tỉ lệ xem tới (%)": row.reachPct,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 8, right: 16, left: 24 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#00000010" />
        <XAxis type="number" tick={{ fontSize: 11 }} />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 11 }}
          width={140}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="Thời gian xem TB (giây)"
          fill={BRAND}
          radius={[0, 6, 6, 0]}
        />
        <Bar
          dataKey="Tỉ lệ xem tới (%)"
          fill={BRAND_LIGHT}
          radius={[0, 6, 6, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
