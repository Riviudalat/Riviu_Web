import { NextResponse } from "next/server";
import { API_INTERNAL, getAdminToken } from "../../../../lib/server-api";

export async function GET(request: Request) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const qs = new URL(request.url).searchParams.toString();
  try {
    const res = await fetch(`${API_INTERNAL}/api/admin/inbox?${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const json = (await res.json().catch(() => ({}))) as object;
    return NextResponse.json(json, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Không kết nối được API" },
      { status: 502 },
    );
  }
}
