/** Tùy chọn độ rộng padding dọc cho các section (chỉnh được từ Puck). */
export type SectionPadding = "compact" | "normal" | "spacious";

export const SECTION_PAD: Record<SectionPadding, string> = {
  compact: "py-12 md:py-16",
  normal: "py-20 md:py-28",
  spacious: "py-28 md:py-40",
};

export const PADDING_OPTIONS = [
  { label: "Gọn", value: "compact" },
  { label: "Vừa (mặc định)", value: "normal" },
  { label: "Rộng", value: "spacious" },
];

export function sectionPad(padding: SectionPadding | undefined): string {
  return SECTION_PAD[padding ?? "normal"];
}
