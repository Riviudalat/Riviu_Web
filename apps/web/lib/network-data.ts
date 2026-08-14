/**
 * Hệ sinh thái kênh truyền thông và số liệu bài viết nổi bật của Riviu Đà Lạt.
 * Nguồn: Cost.pdf trang 2-3 (ảnh chụp Facebook + Facebook Insights) — ảnh đã
 * tách sẵn vào public/network. Số liệu gõ lại nguyên văn từ ảnh chụp.
 */

export type Channel = {
  name: string;
  type: "fanpage" | "group";
  verified?: boolean;
  /** Người theo dõi (fanpage) hoặc thành viên (group) */
  audience: number;
  role: string;
  image: string;
};

export const CHANNELS: Channel[] = [
  {
    name: "Thánh Riviu - Riviu.vn",
    type: "fanpage",
    verified: true,
    audience: 3_100_000,
    role: "Fanpage chính thức của Thánh Riviu, 2 triệu lượt thích",
    image: "/network/thanh-riviu-page.webp",
  },
  {
    name: "Thánh Riviu",
    type: "group",
    audience: 2_300_000,
    role: "Nhóm công khai lớn nhất hệ sinh thái Riviu",
    image: "/network/thanh-riviu-group.webp",
  },
  {
    name: "Review Đà Lạt",
    type: "group",
    audience: 1_300_000,
    role: "Review Đà Lạt - Tất Tần Tật, nhóm review chủ lực tại Đà Lạt",
    image: "/network/review-dalat-group.webp",
  },
  {
    name: "Đà Lạt Đi Và Trải Nghiệm",
    type: "group",
    audience: 884_800,
    role: "Nhóm trải nghiệm, ăn uống và du lịch Đà Lạt",
    image: "/network/dalat-trai-nghiem-group.webp",
  },
  {
    name: "Riviu.vn Đà Lạt",
    type: "fanpage",
    audience: 239_000,
    role: "Sưu tập các địa điểm ăn uống ở Đà Lạt",
    image: "/network/riviu-dalat-page.webp",
  },
  {
    name: "Đà Lạt Đi Đâu?",
    type: "fanpage",
    audience: 158_000,
    role: "Gợi ý điểm đến, định nghĩa Đà Lạt của riêng bạn",
    image: "/network/dalat-di-dau-page.webp",
  },
];

export type TopPost = {
  title: string;
  author: string;
  date: string;
  impressions: number;
  reach: number;
  engagement: number;
  image: string;
};

export const TOP_POSTS: TopPost[] = [
  {
    title: "Đừng bỏ lỡ 15 địa điểm ăn chơi quên lối về này ở Đà Lạt",
    author: "Đinh Mãi",
    date: "28/06/2023",
    impressions: 27_406_867,
    reach: 7_494_873,
    engagement: 744_961,
    image: "/network/insight-post-1.webp",
  },
  {
    title: "Gợi ý 16 tọa độ du xuân đang hot tại Đà Lạt",
    author: "Sunie Phạm",
    date: "06/02",
    impressions: 21_527_879,
    reach: 6_618_447,
    engagement: 538_444,
    image: "/network/insight-post-2.webp",
  },
  {
    title: "Điểm danh 16 địa điểm khi đến Đà Lạt nhất định bạn phải ghé",
    author: "Sunie Phạm",
    date: "29/02",
    impressions: 18_981_647,
    reach: 5_690_515,
    engagement: 384_468,
    image: "/network/insight-post-3.webp",
  },
  {
    title: "Đừng quên 16 tọa độ ăn chơi lễ 30/4 siêu hot tại Đà Lạt",
    author: "Sunie Phạm",
    date: "22/04",
    impressions: 14_919_494,
    reach: 5_373_756,
    engagement: 256_703,
    image: "/network/insight-post-4.webp",
  },
  {
    title: "10 địa điểm trang trí Noel đẹp nhất Đà Lạt năm 2023",
    author: "Uyên Mỹ",
    date: "08/12/2023",
    impressions: 3_695_001,
    reach: 1_613_008,
    engagement: 141_634,
    image: "/network/insight-post-5.webp",
  },
  {
    title: "Bỏ túi 49 tọa độ ăn chơi phải thử tại Đà Lạt tháng 5",
    author: "Sunie Phạm",
    date: "25/04",
    impressions: 741_726,
    reach: 494_773,
    engagement: 19_920,
    image: "/network/insight-post-6.webp",
  },
  {
    title: "Tháng 5 này, những “con nghiện” Đà Lạt nên đi đâu",
    author: "Sunie Phạm",
    date: "26/04",
    impressions: 683_407,
    reach: 464_220,
    engagement: 27_096,
    image: "/network/insight-post-7.webp",
  },
];

/**
 * Rút gọn số lớn theo cách đọc tiếng Việt: 3.100.000 → "3,1 triệu".
 * Luôn làm tròn xuống để không bao giờ nói quá con số thật.
 */
export function formatCompact(value: number): string {
  if (value >= 1_000_000) {
    const tenths = Math.floor(value / 100_000);
    return `${(tenths / 10).toLocaleString("vi-VN")} triệu`;
  }
  if (value >= 1_000) {
    const tenths = Math.floor(value / 100);
    return `${(tenths / 10).toLocaleString("vi-VN")}K`;
  }
  return value.toLocaleString("vi-VN");
}

export const NETWORK_AUDIENCE = CHANNELS.reduce(
  (sum, channel) => sum + channel.audience,
  0,
);

export const POSTS_IMPRESSIONS = TOP_POSTS.reduce(
  (sum, post) => sum + post.impressions,
  0,
);

export const POSTS_REACH = TOP_POSTS.reduce((sum, post) => sum + post.reach, 0);

export const POSTS_ENGAGEMENT = TOP_POSTS.reduce(
  (sum, post) => sum + post.engagement,
  0,
);

/** Tổng follower các kênh TikTok KOL (đếm mỗi kênh một lần, kể cả trong combo). */
export const KOL_FOLLOWERS = 753_496;
export const KOL_CHANNELS = 17;

/** Đọc mảng bài nổi bật từ Page slug `bang-gia` (CMS). */
export function parseTopPosts(data: unknown): TopPost[] | undefined {
  if (!data || typeof data !== "object") return undefined;
  const raw = (data as { posts?: unknown }).posts;
  if (!Array.isArray(raw) || raw.length === 0) return undefined;

  const posts: TopPost[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const post = item as Partial<TopPost>;
    if (!post.image || !post.title) continue;
    posts.push({
      title: String(post.title),
      author: String(post.author ?? ""),
      date: String(post.date ?? ""),
      impressions: Number(post.impressions) || 0,
      reach: Number(post.reach) || 0,
      engagement: Number(post.engagement) || 0,
      image: String(post.image),
    });
  }
  return posts.length > 0 ? posts : undefined;
}
