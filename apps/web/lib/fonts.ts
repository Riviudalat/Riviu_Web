/**
 * Danh sách font cho editor — TẤT CẢ đều có subset `vietnamese` trên Google Fonts.
 * Font được nạp trong app/layout.tsx (preload: false trừ font mặc định),
 * trình duyệt chỉ tải font khi thật sự được dùng.
 */
export const FONT_OPTIONS = [
  { label: "Bricolage Grotesque (mặc định tiêu đề)", value: "bricolage" },
  { label: "Be Vietnam Pro (mặc định nội dung)", value: "be-vietnam" },
  { label: "Inter", value: "inter" },
  { label: "Lexend", value: "lexend" },
  { label: "Manrope", value: "manrope" },
  { label: "Montserrat", value: "montserrat" },
  { label: "Archivo", value: "archivo" },
  { label: "Nunito", value: "nunito" },
  { label: "Baloo 2 (tròn trịa)", value: "baloo" },
  { label: "Playfair Display (serif)", value: "playfair" },
];

export const FONT_VARS: Record<string, string> = {
  "be-vietnam": "var(--font-be-vietnam)",
  inter: "var(--font-inter)",
  lexend: "var(--font-lexend)",
  manrope: "var(--font-manrope)",
  montserrat: "var(--font-montserrat)",
  archivo: "var(--font-archivo)",
  nunito: "var(--font-nunito)",
  baloo: "var(--font-baloo)",
  playfair: "var(--font-playfair)",
  bricolage: "var(--font-bricolage)",
};

export function fontVar(key: string | undefined): string {
  return FONT_VARS[key ?? "be-vietnam"] ?? FONT_VARS["be-vietnam"]!;
}
