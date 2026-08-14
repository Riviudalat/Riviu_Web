import { NextResponse } from "next/server";
import { API_INTERNAL, getAdminToken } from "../../../../lib/server-api";

export async function GET(request: Request) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const format =
    new URL(request.url).searchParams.get("format") === "json"
      ? "json"
      : "csv";

  try {
    const res = await fetch(
      `${API_INTERNAL}/api/chat/export?format=${format}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );
    if (!res.ok) {
      return NextResponse.json({ error: "Xuất thất bại" }, { status: res.status });
    }
    const body = await res.text();
    return new NextResponse(body, {
      headers: {
        "Content-Type":
          res.headers.get("Content-Type") ?? "text/csv; charset=utf-8",
        "Content-Disposition":
          res.headers.get("Content-Disposition") ??
          `attachment; filename="riviu-chat.${format}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Không kết nối được API" },
      { status: 502 },
    );
  }
}
