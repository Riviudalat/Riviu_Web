import { cookies } from "next/headers";

/** URL API cho server-side fetch (Docker: http://api:4000). */
export const API_INTERNAL =
  process.env.API_URL_INTERNAL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000";

export const ADMIN_COOKIE = "riviu_admin_token";

export async function getAdminToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value ?? null;
}

/** Fetch API với JWT admin từ cookie. Trả null khi lỗi/chưa đăng nhập. */
export async function adminFetch<T>(path: string): Promise<T | null> {
  const token = await getAdminToken();
  if (!token) return null;
  try {
    const res = await fetch(`${API_INTERNAL}/api${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
