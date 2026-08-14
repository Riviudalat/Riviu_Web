import { NextResponse } from "next/server";
import { API_INTERNAL, getAdminToken } from "../../../../../lib/server-api";

const ALLOWED_SLUGS = new Set(["home", "bang-gia"]);

function slugFrom(params: { slug: string }) {
  return params.slug;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const slug = slugFrom(await context.params);
  if (!ALLOWED_SLUGS.has(slug)) {
    return NextResponse.json({ error: "Slug không hợp lệ" }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_INTERNAL}/api/content/${slug}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (res.status === 404) {
      return NextResponse.json({ data: null });
    }
    const json = (await res.json().catch(() => ({}))) as object;
    return NextResponse.json(json, { status: res.status });
  } catch {
    return NextResponse.json(
      { error: "Không kết nối được API" },
      { status: 502 },
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const slug = slugFrom(await context.params);
  if (!ALLOWED_SLUGS.has(slug)) {
    return NextResponse.json({ error: "Slug không hợp lệ" }, { status: 400 });
  }

  const body = await request.text();
  try {
    const res = await fetch(`${API_INTERNAL}/api/content/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
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
