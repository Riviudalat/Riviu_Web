export type Summary = {
  online: number;
  todayVisitors: number;
  pageviews7d: number;
  avgDurationMs: number;
  chatSessions: number;
};

export type TimePoint = { day: string; pageviews: number; visitors: number };

export type GroupCount = { key: string; count: number };

export type PageRow = { path: string; views: number; avgDurationMs: number };

export type SectionRow = {
  path: string;
  sectionId: string;
  reached: number;
  reachPct: number;
  avgDwellMs: number;
  clicks: number;
};

export type ChatSessionRow = {
  id: string;
  createdAt: string;
  messageCount: number;
  lastMessage: string;
  lastMessageAt: string;
  firstUserMessage: string;
};

export type ContactLeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

export type AdminInbox = {
  leads: number;
  chats: number;
  latestLead: {
    id: string;
    name: string;
    phone: string;
    createdAt: string;
  } | null;
  latestChat: {
    id: string;
    preview: string;
    createdAt: string;
  } | null;
};

export type ChatSessionDetail = {
  id: string;
  createdAt: string;
  messages: {
    id: string;
    role: string;
    content: string;
    source?: string;
    createdAt: string;
  }[];
};

export type ChatStats = {
  sessions: number;
  messages: number;
  ai: number;
  knowledge: number;
  fallback: number;
  fallbackRate: number;
};

export type AiConfigView = {
  enabled: boolean;
  baseUrl: string;
  model: string;
  systemPrompt: string;
  apiKeySet: boolean;
};

export const CHAT_SOURCE_LABELS: Record<string, string> = {
  ai: "AI",
  knowledge: "Kiến thức",
  fallback: "Chưa có KT",
};

export type KnowledgeRow = {
  id: string;
  title: string;
  content: string;
  keywords: string;
  attachmentUrl: string | null;
  updatedAt: string;
};

export const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  "ve-riviu": "Về Riviu",
  "dich-vu": "Dịch vụ",
  "bang-gia": "Bảng giá tóm tắt",
  "bang-gia-page": "Hero bảng giá",
  "ban-nhan-duoc-gi": "Bạn nhận được gì",
  combo: "Gói combo Facebook",
  "goi-facebook": "Tab Facebook",
  "goi-facebook-thang": "Gói Facebook tháng",
  "bai-dang": "Tab Bài đăng",
  "goi-tiktok": "Tab TikTok",
  "goi-duyet-bai": "Gói duyệt bài",
  "goi-xay-kenh": "Gói xây kênh",
  "tat-ca-goi": "Toàn bộ gói (tab + thẻ)",
  "dich-vu-khac": "Tab Khác",
  "he-sinh-thai": "Hệ sinh thái kênh",
  "hieu-qua": "Hiệu quả thật",
  "quy-trinh": "Quy trình",
  "nen-tang": "Nền tảng (đã gỡ)",
  "an-tuong": "Điểm nhấn",
  faq: "FAQ",
  "lien-he": "Liên hệ",
  khac: "Khác",
};

export const SECTION_BLURBS: Record<string, string> = {
  hero: "Khối mở đầu trang — tiêu đề, CTA và số liệu hệ sinh thái.",
  "ve-riviu": "Ba trụ cột + 4 số liệu thật từ fanpage/group và Insights.",
  "dich-vu": "Năm giải pháp truyền thông F&B (booking, brand, ads…).",
  "bang-gia": "Tab + thẻ giá trên trang chủ (Facebook / bài đăng / TikTok).",
  "bang-gia-page": "Hero trang /bang-gia — chọn gói theo kết quả.",
  "ban-nhan-duoc-gi": "Bốn thẻ kết quả khách nhận được khi mua gói.",
  combo: "Bảng so sánh 4 gói combo Facebook (Gói 3 nổi bật).",
  "goi-facebook": "Tab Facebook — 4 thẻ combo.",
  "goi-facebook-thang": "Gói Facebook tháng 5 triệu — 20 bài trọn gói.",
  "bai-dang": "Tab Bài đăng — gói tháng và duyệt bài.",
  "goi-tiktok": "Tab TikTok — bốn mức phủ sóng.",
  "dich-vu-khac": "Tab Khác — xây kênh, lẻ, KOL, phụ thu.",
  "goi-duyet-bai": "Ba gói duyệt bài theo số bài và số group.",
  "goi-xay-kenh": "Xây kênh TikTok hoặc Fanpage riêng cho quán.",
  "tat-ca-goi": "Tab Facebook / Bài đăng / TikTok / Khác — mỗi gói một slide vuốt ngang.",
  "he-sinh-thai": "Sáu fanpage/group Riviu đang vận hành.",
  "hieu-qua": "Bảy bài nổi bật kèm số liệu Facebook Insights.",
  "quy-trinh": "Bốn bước hợp tác từ brief tới báo cáo.",
  "nen-tang": "Section ứng dụng cũ — đã gỡ khỏi trang.",
  "an-tuong": "Dải đen điểm nhấn + chữ chạy.",
  faq: "Câu hỏi thường gặp.",
  "lien-he": "Form liên hệ và thông tin công ty.",
  khac: "Click ngoài section (header, footer, widget).",
};

export function pageLabel(path: string): string {
  if (path === "/" || path === "") return "Trang chủ";
  if (path.startsWith("/bang-gia")) return "Trang bảng giá";
  return path;
}

export function sectionLabel(id: string): string {
  return SECTION_LABELS[id] ?? id;
}
