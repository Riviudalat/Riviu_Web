import { NextResponse } from "next/server";
import {
  API_INTERNAL,
  getAdminToken,
} from "../../../../../lib/server-api";

type RouteContext = { params: Promise<{ id: string }> };

async function proxy(
  request: Request,
  context: RouteContext,
  method: "PUT" | "DELETE",
) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Chưa đăng nhập" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = method === "PUT" ? await request.text() : undefined;

  try {
    const res = await fetch(
      `${API_INTERNAL}/api/knowledge/${encodeURIComponent(id)}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        ...(body ? { body } : {}),
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

export async function PUT(request: Request, context: RouteContext) {
  return proxy(request, context, "PUT");
}

export async function DELETE(request: Request, context: RouteContext) {
  return proxy(request, context, "DELETE");
}
