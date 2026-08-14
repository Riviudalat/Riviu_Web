import { NextResponse } from "next/server";
import {
  API_INTERNAL,
  getAdminToken,
} from "../../../../../lib/server-api";

export async function POST(request: Request) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const { id } = (await request.json().catch(() => ({}))) as { id?: string };
  if (!id) {
    return NextResponse.json({ error: "Thiếu id phiên bản" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `${API_INTERNAL}/api/content/home/restore/${encodeURIComponent(id)}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );
    const json = (await res.json().catch(() => ({}))) as object;
    return NextResponse.json(json, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Không kết nối được API" },
      { status: 502 },
    );
  }
}
