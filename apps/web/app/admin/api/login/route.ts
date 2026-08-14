import { NextResponse } from "next/server";
import { ADMIN_COOKIE, API_INTERNAL } from "../../../../lib/server-api";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  let res: Response;
  try {
    res = await fetch(`${API_INTERNAL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { error: "Không kết nối được API — hãy chạy pnpm --filter api dev" },
      { status: 502 },
    );
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: "Sai tài khoản hoặc mật khẩu" },
      { status: 401 },
    );
  }

  const { accessToken } = (await res.json()) as { accessToken: string };
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}
