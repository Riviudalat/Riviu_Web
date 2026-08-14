/**
 * Toàn bộ bảng giá dịch vụ Riviu Đà Lạt — nguồn: Cost.pdf (bản public:
 * /bang-gia-riviu-dalat.pdf). Dùng cho trang /bang-gia, section tóm tắt
 * trên landing và seed kiến thức chatbot.
 */

export const PRICING_NOTE =
  "Bảng giá áp dụng cho khách hàng tại Đà Lạt, từ tháng 01/2026. Mỗi gói áp dụng 1 gói / quán / 30 ngày, tính từ ngày đầu tiên đăng bài.";

export const PRICING_PDF = "/bang-gia-riviu-dalat.pdf";

export function formatVnd(value: number): string {
  return value.toLocaleString("vi-VN") + "đ";
}

/* ---------- 1. Gói combo Facebook ---------- */

export type ComboItem = {
  service: string;
  detail: string;
  unit?: string;
  unitPrice?: number;
  quantity?: number;
};

export type ComboPackage = {
  name: string;
  highlight?: boolean;
  totalBefore: number;
  discount: number;
  totalAfter: number;
  commitment: string;
  /** Số tương tác cam kết — dùng cho thanh đo trực quan */
  commitInteractions: number;
  /** Lượt tiếp cận fanpage cam kết (nếu có) */
  commitReach?: number;
  items: ComboItem[];
};

export const FACEBOOK_COMBOS: ComboPackage[] = [
  {
    name: "Gói 1",
    totalBefore: 12_000_000,
    discount: 4_500_000,
    totalAfter: 7_500_000,
    commitment: "Cam kết tối thiểu 600 tương tác",
    commitInteractions: 600,
    items: [
      {
        service: "Bài Review",
        detail:
          "Bài Review trên group “Đà Lạt đi và trải nghiệm”\nReup trên group “Review Đà Lạt”",
        unitPrice: 3_500_000,
        quantity: 2,
      },
      {
        service: "Bài check-in",
        detail:
          "Bài check-in trên group “Đà Lạt đi và trải nghiệm” và “Review Đà Lạt”\nNội dung ngắn gọn, kèm địa chỉ",
        unitPrice: 1_000_000,
        quantity: 3,
      },
      {
        service: "Bài tổng hợp",
        detail:
          "Bài tổng hợp trên group “Đà Lạt đi và trải nghiệm”\nVị trí Top 1 bài tổng hợp 10-15 quán theo chủ đề",
        unitPrice: 2_000_000,
        quantity: 1,
      },
    ],
  },
  {
    name: "Gói 2",
    totalBefore: 15_000_000,
    discount: 4_500_000,
    totalAfter: 10_500_000,
    commitment: "Cam kết 800 tương tác + 70.000 lượt tiếp cận",
    commitInteractions: 800,
    commitReach: 70_000,
    items: [
      {
        service: "Bài Review",
        detail:
          "Bài Review trên group “Đà Lạt đi và trải nghiệm”\nReup trên group “Review Đà Lạt”",
        unitPrice: 3_500_000,
        quantity: 1,
      },
      {
        service: "Bài check-in",
        detail:
          "Bài check-in trên group “Đà Lạt đi và trải nghiệm” và “Review Đà Lạt”",
        unitPrice: 1_000_000,
        quantity: 5,
      },
      {
        service: "Bài giới thiệu trên fanpage",
        detail:
          "Bài giới thiệu trên fanpage “Riviu.vn Đà Lạt”\nCam kết tối thiểu 70.000 lượt tiếp cận",
        unitPrice: 4_500_000,
        quantity: 1,
      },
      {
        service: "Bài tổng hợp",
        detail:
          "Bài tổng hợp trên group “Đà Lạt đi và trải nghiệm”\nTop 1 bài tổng hợp theo chủ đề",
        unitPrice: 2_000_000,
        quantity: 1,
      },
      {
        service: "Facebook Ads",
        detail: "Tính phí 30% dịch vụ\nTối thiểu 100.000đ/ngày",
      },
    ],
  },
  {
    name: "Gói 3",
    highlight: true,
    totalBefore: 18_500_000,
    discount: 5_600_000,
    totalAfter: 12_900_000,
    commitment: "Cam kết 1.000 tương tác + 70.000 lượt tiếp cận",
    commitInteractions: 1_000,
    commitReach: 70_000,
    items: [
      {
        service: "Bài Review",
        detail:
          "Bài Review trên group “Đà Lạt đi và trải nghiệm”\nReup trên group “Review Đà Lạt”",
        unitPrice: 3_500_000,
        quantity: 2,
      },
      {
        service: "Bài check-in",
        detail:
          "Bài check-in trên group “Đà Lạt đi và trải nghiệm” và “Review Đà Lạt”",
        unitPrice: 1_000_000,
        quantity: 5,
      },
      {
        service: "Bài giới thiệu trên fanpage",
        detail:
          "Bài giới thiệu trên fanpage “Riviu.vn Đà Lạt”\nCam kết tối thiểu 70.000 lượt tiếp cận",
        unitPrice: 4_500_000,
        quantity: 1,
      },
      {
        service: "Bài tổng hợp",
        detail:
          "Bài tổng hợp trên group “Đà Lạt đi và trải nghiệm”\nTop 1 bài tổng hợp theo chủ đề",
        unitPrice: 2_000_000,
        quantity: 1,
      },
      {
        service: "Facebook Ads",
        detail: "Tính phí 30% dịch vụ\nTối thiểu 100.000đ/ngày",
      },
    ],
  },
  {
    name: "Gói 4",
    totalBefore: 23_500_000,
    discount: 6_100_000,
    totalAfter: 17_400_000,
    commitment: "Cam kết 1.500 tương tác + 70.000 lượt tiếp cận",
    commitInteractions: 1_500,
    commitReach: 70_000,
    items: [
      {
        service: "Bài Review",
        detail:
          "Bài Review trên group “Đà Lạt đi và trải nghiệm”\nReup trên group “Review Đà Lạt”",
        unitPrice: 3_500_000,
        quantity: 1,
      },
      {
        service: "Bài check-in",
        detail:
          "Bài check-in trên group “Đà Lạt đi và trải nghiệm” và “Review Đà Lạt”",
        unitPrice: 1_000_000,
        quantity: 5,
      },
      {
        service: "Bài Review “Thánh Riviu”",
        detail:
          "Bài review trên group “Thánh Riviu”\nReup trên “Đà Lạt đi và trải nghiệm” và “Review Đà Lạt”",
        unitPrice: 8_500_000,
        quantity: 1,
      },
      {
        service: "Bài giới thiệu trên fanpage",
        detail:
          "Bài giới thiệu trên fanpage “Riviu.vn Đà Lạt”\nCam kết tối thiểu 70.000 lượt tiếp cận",
        unitPrice: 4_500_000,
        quantity: 1,
      },
      {
        service: "Bài tổng hợp",
        detail:
          "Bài tổng hợp trên group “Đà Lạt đi và trải nghiệm”\nTop 1 bài tổng hợp theo chủ đề",
        unitPrice: 2_000_000,
        quantity: 1,
      },
    ],
  },
];

/* ---------- 2. Gói Facebook tháng ---------- */

export type SimplePackage = {
  name: string;
  detail: string;
  price: number | string;
  unit?: string;
};

export type MonthlyPackage = {
  name: string;
  /** Giá TRỌN GÓI cho tất cả hạng mục bên dưới (ô thành tiền gộp trong Cost.pdf) */
  price: number;
  unit: string;
  note: string;
  items: { name: string; detail: string; total: string }[];
};

export const MONTHLY_PACKAGE: MonthlyPackage = {
  name: "Gói Facebook tháng",
  price: 5_000_000,
  unit: "tháng",
  note: "Chỉ áp dụng 1 gói / quán / 30 ngày. Gói bắt đầu tính kể từ ngày đầu tiên đăng bài.",
  items: [
    {
      name: "Bài tổng hợp / Bài lịch trình",
      detail:
        "Đăng 2 bài tổng hợp hoặc lịch trình lên group “Đà Lạt đi và trải nghiệm” + reup 2 bài lên group “Review Đà Lạt” (đăng trong vòng 1 tuần)",
      total: "8 bài / tháng",
    },
    {
      name: "Bài check-in",
      detail:
        "Đăng 3 bài check-in trên group “Đà Lạt đi và trải nghiệm” + reup 3 bài trên group “Review Đà Lạt” (đăng trong vòng 1 tuần)",
      total: "12 bài / tháng",
    },
  ],
};

/* ---------- 3. Gói phủ sóng TikTok ---------- */

export type TiktokPackage = {
  name: string;
  contents: number;
  extra?: string;
  commitment: string;
  /** Số view cam kết — dùng cho thanh đo trực quan */
  commitViews: number;
  price: number;
};

export const TIKTOK_PACKAGES: TiktokPackage[] = [
  {
    name: "Gói Cơ Bản",
    contents: 150,
    commitment: "Cam kết 300.000 view",
    commitViews: 300_000,
    price: 5_000_000,
  },
  {
    name: "Gói Tiêu Chuẩn",
    contents: 200,
    extra: "5 ảnh lướt TikTok riêng của quán",
    commitment: "Cam kết 350.000 view",
    commitViews: 350_000,
    price: 7_000_000,
  },
  {
    name: "Gói Mở Rộng",
    contents: 350,
    extra: "10 ảnh lướt TikTok riêng của quán",
    commitment: "Cam kết 600.000 view",
    commitViews: 600_000,
    price: 10_000_000,
  },
  {
    name: "Gói Tăng Trưởng",
    contents: 600,
    extra: "15 ảnh lướt TikTok riêng của quán",
    commitment: "Cam kết 800.000 view",
    commitViews: 800_000,
    price: 15_000_000,
  },
];

/* ---------- 4. Gói duyệt bài ---------- */

export type ApprovalPackage = {
  name: string;
  detail: string;
  posts: number;
  price1Month: number;
  price3Months: number;
};

export const APPROVAL_PACKAGES: ApprovalPackage[] = [
  {
    name: "Gói duyệt bài (1 group)",
    detail:
      "Duyệt 30 bài trên group “Đà Lạt đi và trải nghiệm” — hình ảnh, nội dung do khách chuẩn bị, dạng check-in",
    posts: 30,
    price1Month: 3_000_000,
    price3Months: 7_500_000,
  },
  {
    name: "Gói duyệt bài (2 group)",
    detail:
      "Duyệt 20 bài trên “Đà Lạt đi và trải nghiệm” + 20 bài trên “Review Đà Lạt”",
    posts: 40,
    price1Month: 3_000_000,
    price3Months: 7_500_000,
  },
  {
    name: "Gói duyệt bài (2 group) mở rộng",
    detail:
      "Duyệt 30 bài trên “Đà Lạt đi và trải nghiệm” + 30 bài trên “Review Đà Lạt”",
    posts: 60,
    price1Month: 3_500_000,
    price3Months: 9_000_000,
  },
];

/* ---------- 5. Gói xây kênh ---------- */

export const CHANNEL_PACKAGES: SimplePackage[] = [
  {
    name: "Xây dựng & phát triển kênh TikTok",
    detail:
      "10 clip + 2 bài hình tổng hợp mỗi tháng; team qua quay dựng 4 lần/tháng",
    price: 6_000_000,
    unit: "tháng",
  },
  {
    name: "Xây dựng & phát triển Fanpage Facebook",
    detail:
      "Phân tích, lên kế hoạch truyền thông; 12 bài viết/tháng do admin Riviu viết (gồm 2 bài chuẩn chạy Ads)",
    price: 3_000_000,
    unit: "tháng",
  },
];

/* ---------- 6. Dịch vụ lẻ ---------- */

export const SINGLE_SERVICES: SimplePackage[] = [
  {
    name: "Chụp hình cơ bản",
    detail: "20 tấm",
    price: 2_000_000,
    unit: "bộ",
  },
  {
    name: "Chụp hình nâng cao (có 1 mẫu)",
    detail: "50 tấm — mô hình cà phê, ăn uống…",
    price: 4_000_000,
    unit: "bộ",
  },
  {
    name: "Chụp hình cao cấp",
    detail: "Mô hình khách sạn, homestay, nhà hàng…",
    price: "Tùy quy mô",
    unit: "bộ",
  },
  {
    name: "Video cơ bản",
    detail: "Thời lượng dưới 60s",
    price: "Tùy quy mô",
    unit: "bộ",
  },
  {
    name: "Video nâng cao (flycam, 1 mẫu)",
    detail: "Thời lượng dưới 120s",
    price: "Tùy quy mô",
    unit: "bộ",
  },
  {
    name: "1 bài review group “Đà Lạt đi và trải nghiệm”",
    detail: "Hình ảnh và nội dung do RIVICO chuẩn bị",
    price: 2_500_000,
    unit: "bài",
  },
  {
    name: "1 bài review “Đà Lạt đi và trải nghiệm” + reup “Review Đà Lạt”",
    detail: "Hình ảnh và nội dung do RIVICO chuẩn bị",
    price: 3_500_000,
    unit: "bài",
  },
  {
    name: "2 bài review group “Đà Lạt đi và trải nghiệm”",
    detail: "Hình ảnh và nội dung do RIVICO chuẩn bị",
    price: 4_000_000,
    unit: "bài",
  },
  {
    name: "1 bài review group “Thánh Riviu”",
    detail: "Hình ảnh và nội dung do RIVICO chuẩn bị",
    price: 5_000_000,
    unit: "bài",
  },
  {
    name: "1 bài review “Thánh Riviu” + “Đà Lạt đi và trải nghiệm”",
    detail: "Hình ảnh và nội dung do RIVICO chuẩn bị",
    price: 7_000_000,
    unit: "bài",
  },
  {
    name: "Reup 1 bài review group “Ghiền Đà Lạt”",
    detail: "Hình ảnh và nội dung do RIVICO chuẩn bị",
    price: 4_500_000,
    unit: "bài",
  },
  {
    name: "1 bài viết Fanpage “Riviu.vn Đà Lạt”",
    detail: "Cam kết tối thiểu 70.000 lượt tiếp cận",
    price: 4_500_000,
    unit: "bài",
  },
  {
    name: "1 bài viết Fanpage “Thánh Riviu”",
    detail: "Cam kết tối thiểu 100.000 lượt tiếp cận",
    price: 5_000_000,
    unit: "bài",
  },
  {
    name: "1 bài viết Fanpage “Địa Điểm Ăn Uống”",
    detail: "Cam kết tối thiểu 100.000 lượt tiếp cận",
    price: 8_000_000,
    unit: "bài",
  },
  {
    name: "1 bài tổng hợp group “Đà Lạt đi và trải nghiệm”",
    detail:
      "Hình món đặc sắc nhất ở vị trí Top 1 bài tổng hợp 15-20 quán theo chủ đề",
    price: 2_000_000,
    unit: "bài",
  },
  {
    name: "1 bài lịch trình group “Review Đà Lạt”",
    detail: "Dạng bài lịch trình có mô hình quán phù hợp",
    price: 2_000_000,
    unit: "bài",
  },
  {
    name: "1 bài tổng hợp group “Thánh Riviu”",
    detail:
      "KH chọn 1 hình ảnh món đặc sắc nhất xuất hiện tại vị trí Top 1 bài tổng hợp 15-20 quán theo chủ đề",
    price: 4_000_000,
    unit: "bài",
  },
  {
    name: "1 bài tổng hợp Fanpage “Riviu.vn Đà Lạt”",
    detail:
      "KH chọn 1 hình ảnh món đặc sắc nhất xuất hiện tại vị trí Top 1 bài tổng hợp 10-20 quán theo chủ đề\nGhim bài viết trên Fanpage “Riviu.vn Đà Lạt” 24 giờ\nCam kết tối thiểu 70.000 lượt tiếp cận",
    price: 4_000_000,
    unit: "bài",
  },
  {
    name: "Chăm sóc Fanpage",
    detail:
      "Content ngắn được admin của Riviu viết để giới thiệu và giữ tương tác cho page\n15 bài / tháng\n1 bộ hình",
    price: 5_000_000,
    unit: "tháng",
  },
  {
    name: "Combo “Đà Lạt +”",
    detail:
      "Đăng ảnh dưới 10 tấm lên page “Đà Lạt +”\nReup lên IG “dalat.jpg”\nĐăng video dưới 60s lên page “Đà Lạt +”\nReup lên TikTok “Đà Lạt +”",
    price: 12_500_000,
    unit: "combo",
  },
  {
    name: "Facebook Ads",
    detail:
      "Tính phí 30% phí dịch vụ\nTối thiểu 100.000đ / ngày\nĐã có bài viết trên các fanpage của Riviu",
    price: "30% phí dịch vụ",
  },
];

/* ---------- 7. TikTok KOL review ---------- */

export type TiktokKol = {
  channel: string;
  followers: string;
  style: string;
  format: string;
  price: number;
};

export const TIKTOK_KOLS: TiktokKol[] = [
  { channel: "Đi và Trải Nghiệm", followers: "281.200", style: "Toplist, review quán ăn, cafe, homestay", format: "Voice Off", price: 2_000_000 },
  { channel: "La Cà Khắp Nơi", followers: "173.000", style: "Toplist, review quán ăn, cafe, homestay", format: "Voice Off", price: 1_500_000 },
  { channel: "Tung Tăng Khắp Nơi", followers: "67.600", style: "Toplist, review quán ăn, cafe, homestay", format: "Voice Off", price: 1_000_000 },
  { channel: "Combo: Châm đi đâu đó + Vivu Cùng Tui", followers: "27.900 + 14.700", style: "Toplist, review quán ăn, cafe, homestay", format: "Chèn nhạc + Text", price: 2_500_000 },
  { channel: "Châm đi đâu đó", followers: "27.900", style: "Review quán cafe, quán ăn, homestay", format: "Chèn nhạc + Text", price: 1_500_000 },
  { channel: "La Cà Phê", followers: "31.100", style: "Review quán cafe, quán ăn, homestay", format: "Chèn nhạc + Text", price: 1_500_000 },
  { channel: "Thảo đi muôn nơi", followers: "12.200", style: "Review quán cafe, quán ăn, homestay", format: "Chèn nhạc + Text", price: 1_300_000 },
  { channel: "Đức Tịnh Lifestyle", followers: "5.213", style: "Review quán cafe, quán ăn, homestay", format: "Voice Off", price: 1_300_000 },
  { channel: "Vy Uyển nè", followers: "9.000", style: "Toplist, review quán ăn, cafe, homestay", format: "Chèn nhạc + Text", price: 1_000_000 },
  { channel: "Vitamin.Dalat", followers: "36.000", style: "Review quán cafe, quán ăn, homestay", format: "Chèn nhạc + Text", price: 800_000 },
  { channel: "ToiuDalat", followers: "50.200", style: "Review quán cafe, quán ăn, homestay", format: "Chèn nhạc + Text", price: 800_000 },
  { channel: "Ngoài Vùng Phủ Sóng", followers: "24.500", style: "Review quán cafe, quán ăn, homestay", format: "Chèn nhạc + Text", price: 800_000 },
  { channel: "Chang đi đâu", followers: "6.731", style: "Review quán cafe, quán ăn, homestay", format: "Chèn nhạc + Text", price: 700_000 },
  { channel: "Đà Lạt Quài Luôn", followers: "9.549", style: "Review quán cafe, quán ăn, homestay", format: "Chèn nhạc + Text", price: 600_000 },
  { channel: "Lạ lạ mà dui", followers: "1.323", style: "Review quán cafe, quán ăn, homestay", format: "Voice Adam", price: 600_000 },
  { channel: "La Cà Chua", followers: "1.052", style: "Review quán cafe, quán ăn, homestay", format: "Voice Off", price: 500_000 },
  { channel: "Pí Ồ", followers: "2.228", style: "Review quán cafe, quán ăn, homestay", format: "Voice Off", price: 500_000 },
];

/* ---------- 8. Phụ thu & quy định ---------- */

export const SURCHARGES: SimplePackage[] = [
  {
    name: "Di chuyển nhiều chi nhánh",
    detail: "Tính theo chi nhánh",
    price: 200_000,
  },
  {
    name: "Khu vực 15km - 20km",
    detail: "Tính theo sản phẩm",
    price: 300_000,
  },
  {
    name: "Khu vực trên 20km - 25km",
    detail: "Tính theo sản phẩm / chi nhánh",
    price: "Liên hệ",
  },
  {
    name: "Cuối tuần",
    detail: "Tính theo sản phẩm / chi nhánh",
    price: "Liên hệ",
  },
  {
    name: "Ngoài giờ làm việc (17h - 22h)",
    detail: "Tính theo sản phẩm / chi nhánh",
    price: "Liên hệ",
  },
  {
    name: "Khu vực trên 25km / tỉnh (ekip 3 người)",
    detail: "Tính theo ngày",
    price: 1_500_000,
  },
];

export const AD_RULES = {
  images: [
    "Thời gian triển khai tối đa 2h từ thời điểm chốt lịch hai bên, không tách lẻ thời gian",
    "Dự thảo hoàn thành sau 3-5 ngày làm việc kể từ thời gian triển khai",
  ],
  videos: [
    "Video được đính kèm logo Riviu cho sản phẩm do Riviu thực hiện",
    "Thời gian quay tối đa 3h từ thời điểm chốt lịch, không tách lẻ thời gian",
    "Dự thảo hoàn thành sau 4-5 ngày làm việc kể từ ngày quay (không tính T7, CN)",
    "Riviu không trả lại nội dung gốc (clip thô) cho đối tác",
  ],
  notes: [
    "Áp dụng cho đối tác hỗ trợ di chuyển, hoặc cộng phí di chuyển theo thực tế",
    "Chi phí ăn uống của sản phẩm triển khai do đối tác hỗ trợ",
  ],
};
