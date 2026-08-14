/**
 * Base URL của NestJS API.
 * - Dev: đặt NEXT_PUBLIC_API_URL=http://localhost:4000 trong apps/web/.env.local
 * - Production sau nginx: để trống ("") để gọi cùng origin qua /api
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

/** Đường dẫn ảnh upload (/api/uploads/...) cần prefix API_BASE khi dev. */
export function mediaUrl(src: string): string {
  return src.startsWith("/api/") ? `${API_BASE}${src}` : src;
}
