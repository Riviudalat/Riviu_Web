/**
 * Intent + nhãn các bảng giá Cost.pdf để chat hiện từng bảng riêng,
 * không đổ cả file vào một tin.
 */

export type PricingTableId =
  | "facebook-combo"
  | "facebook-month"
  | "tiktok"
  | "approval"
  | "channel"
  | "single"
  | "kol"
  | "surcharge";

export type PricingIntent = "menu" | PricingTableId;

export const PRICING_TABLES: {
  id: PricingTableId;
  label: string;
  prompt: string;
  aliases: string[];
  blurb: string;
}[] = [
  {
    id: "facebook-combo",
    label: "Gói combo Facebook",
    prompt: "Gói combo Facebook",
    aliases: ["combo facebook", "goi combo", "goi facebook", "4 goi"],
    blurb: "4 gói combo từ 7,5 triệu — review, check-in, fanpage.",
  },
  {
    id: "facebook-month",
    label: "Gói Facebook tháng",
    prompt: "Gói Facebook tháng",
    aliases: ["facebook thang", "goi thang", "goi facebook thang", "20 bai"],
    blurb: "5 triệu/tháng trọn gói — 20 bài trên 2 group Đà Lạt.",
  },
  {
    id: "tiktok",
    label: "Gói TikTok",
    prompt: "Gói TikTok",
    aliases: ["goi tiktok", "tiktok", "phu song"],
    blurb: "Bốn mức phủ sóng, cam kết view theo tháng.",
  },
  {
    id: "approval",
    label: "Gói duyệt bài",
    prompt: "Gói duyệt bài",
    aliases: ["duyet bai"],
    blurb: "Khách tự chuẩn bị nội dung, chọn số bài và group.",
  },
  {
    id: "channel",
    label: "Gói xây kênh",
    prompt: "Gói xây kênh",
    aliases: ["xay kenh", "xay dung kenh"],
    blurb: "Xây kênh TikTok hoặc Fanpage riêng cho quán.",
  },
  {
    id: "single",
    label: "Dịch vụ lẻ",
    prompt: "Dịch vụ lẻ",
    aliases: ["dich vu le", "gia le", "chup hinh", "bai review"],
    blurb: "Từng hạng mục: chụp, video, review, fanpage.",
  },
  {
    id: "kol",
    label: "KOL TikTok",
    prompt: "KOL TikTok",
    aliases: ["kol", "koc", "booking tiktok", "influencer"],
    blurb: "17 kênh booking video review theo follower.",
  },
  {
    id: "surcharge",
    label: "Phụ thu",
    prompt: "Phụ thu",
    aliases: ["phu thu", "quy dinh"],
    blurb: "Di chuyển, cuối tuần, ngoài giờ.",
  },
];

const MENU_ALIASES = [
  "ve bang gia",
  "bang gia",
  "bang gia dich vu",
  "xem bang gia",
  "gia dich vu",
  "xem gia",
  "bao gia",
  "bao nhieu tien",
  "chi phi",
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[?!.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function resolvePricingIntent(text: string): PricingIntent | null {
  const normalized = normalize(text);
  if (!normalized) return null;

  const ranked = [...PRICING_TABLES].sort(
    (a, b) =>
      Math.max(...b.aliases.map((alias) => alias.length)) -
      Math.max(...a.aliases.map((alias) => alias.length)),
  );
  for (const table of ranked) {
    if (table.aliases.some((alias) => normalized.includes(alias))) {
      return table.id;
    }
  }
  if (MENU_ALIASES.some((alias) => normalized.includes(alias))) {
    return "menu";
  }
  return null;
}

export function pricingTableLabel(id: PricingTableId): string {
  return PRICING_TABLES.find((table) => table.id === id)?.label ?? id;
}
