import {
  ArrowRight,
  ChatCircleDots,
  Eye,
  TiktokLogo,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { ChannelNetwork } from "../../components/channel-network";
import { ChatWidget } from "../../components/chat-widget";
import { Faq } from "../../components/faq";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { OpenChatButton } from "../../components/open-chat-button";
import { PricingBoard } from "../../components/pricing-board";
import { PricingCompare } from "../../components/pricing-compare";
import { PricingOutcomes } from "../../components/pricing-outcomes";
import { Reveal } from "../../components/reveal";
import { TopPosts } from "../../components/top-posts";
import { Tracker } from "../../components/tracker";
import {
  formatCompact,
  KOL_CHANNELS,
  KOL_FOLLOWERS,
  NETWORK_AUDIENCE,
  parseTopPosts,
  POSTS_IMPRESSIONS,
  type TopPost,
} from "../../lib/network-data";
import { PRICING_NOTE } from "../../lib/pricing-data";
import { API_INTERNAL } from "../../lib/server-api";

export const metadata: Metadata = {
  title: "Bảng giá dịch vụ truyền thông",
  description:
    "Bảng giá đầy đủ dịch vụ truyền thông Riviu Đà Lạt: gói combo Facebook từ 7.5 triệu, gói phủ sóng TikTok từ 5 triệu, duyệt bài, xây kênh, dịch vụ lẻ và KOL TikTok review.",
  alternates: { canonical: "/bang-gia" },
};

const COMMIT_STATS = [
  {
    icon: UsersThree,
    value: `${formatCompact(NETWORK_AUDIENCE)}+`,
    label: "người theo dõi & thành viên trên 6 fanpage, group của Riviu",
  },
  {
    icon: Eye,
    value: formatCompact(POSTS_IMPRESSIONS),
    label: "lượt hiển thị từ 7 bài viết nổi bật đã chạy",
  },
  {
    icon: TiktokLogo,
    value: `${KOL_CHANNELS} kênh KOL`,
    label: `${KOL_FOLLOWERS.toLocaleString("vi-VN")} follower TikTok tại Đà Lạt`,
  },
];

const PRICING_FAQ = [
  {
    question: "Các tab Facebook, Bài đăng, TikTok khác nhau thế nào?",
    answer:
      "Chọn tab Facebook, Bài đăng hoặc TikTok. Mỗi gói là một thẻ (giá lớn + cam kết). Bấm “Xem chi tiết” để mở bảng đơn giá × số lượng × thành tiền.",
  },
  {
    question: "Đọc cột Đơn giá, SL, Thành tiền như thế nào?",
    answer:
      "Đơn giá là giá một hạng mục. SL là số bài hoặc số tháng. Thành tiền = đơn giá × SL (trừ hạng mục tính theo % như Facebook Ads, để “—”). Cuối bảng combo có Tổng cộng, Giảm giá và Thành tiền sau ưu đãi.",
  },
  {
    question: "Nên chọn combo Facebook, gói tháng hay TikTok?",
    answer:
      "Combo Facebook (từ 7,5 triệu) phù hợp quán muốn bài review + check-in có cam kết tương tác. Facebook tháng (5 triệu, 20 bài) để duy trì hiện diện đều. TikTok là bảng riêng theo mức view. Gói 3 combo thường được chọn khi cần thêm fanpage và Ads.",
  },
  {
    question: "Có thể mua lẻ một bài thay vì combo không?",
    answer:
      "Được. Mở tab Khác để chọn đúng một bài review, check-in, fanpage hoặc gói chụp/video. Combo thường rẻ hơn khi cộng từng mục. Mỗi gói áp dụng 1 quán / 30 ngày.",
  },
  {
    question: "Triển khai mất bao lâu?",
    answer:
      "Chụp hình tối đa 2 giờ, video tối đa 3 giờ từ lúc chốt lịch. Dự thảo hình 3–5 ngày làm việc, video 4–5 ngày (không tính T7, CN).",
  },
];

async function getInsightPosts(): Promise<TopPost[] | undefined> {
  try {
    const res = await fetch(`${API_INTERNAL}/api/content/bang-gia`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return undefined;
    const page = (await res.json()) as { data?: unknown };
    return parseTopPosts(page.data);
  } catch {
    return undefined;
  }
}

export default async function BangGiaPage() {
  const posts = await getInsightPosts();

  return (
    <>
      <Header />
      <main>
        <section
          data-section="bang-gia-page"
          className="relative overflow-hidden bg-brand-50 pt-28 pb-16 md:pt-36 md:pb-20"
        >
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <Reveal>
              <p className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase">
                Bảng giá 2026
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-balance md:text-6xl">
                Chọn gói theo kết quả bạn muốn — không phải theo danh sách dịch
                vụ.
              </h1>
              <p className="mt-4 max-w-xl text-base text-ink-soft md:text-lg">
                Combo Facebook từ 7,5 triệu. Nội dung Riviu sản xuất, đăng trên
                hệ sinh thái group/fanpage Đà Lạt, cam kết số đo được.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="#combo"
                  data-track="pricing-hero-compare"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600"
                >
                  So sánh 4 gói
                  <ArrowRight size={16} weight="bold" />
                </Link>
                <OpenChatButton
                  track="pricing-hero-ask-ai"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-bold transition-colors hover:border-brand-500 hover:text-brand-600"
                >
                  <ChatCircleDots size={16} weight="bold" />
                  Hỏi trợ lý Riviu
                </OpenChatButton>
              </div>
              <p className="mt-5 max-w-xl text-xs leading-relaxed text-ink-soft">
                {PRICING_NOTE}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {COMMIT_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-black/5 bg-white px-5 py-5"
                  >
                    <stat.icon
                      size={28}
                      weight="duotone"
                      className="text-brand-500"
                    />
                    <p className="mt-3 text-xl font-black tracking-tight md:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <PricingOutcomes />
        <PricingCompare />
        <PricingBoard />
        <ChannelNetwork layout="compact" paddingY="compact" />
        <TopPosts posts={posts} />
        <Faq
          paddingY="compact"
          kicker="FAQ giá"
          title="Câu hỏi trước khi chốt gói"
          sub="Chưa rõ gói nào? Hỏi trợ lý Riviu hoặc để lại thông tin — tư vấn miễn phí."
          items={PRICING_FAQ}
        />

        <div className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-24">
          <Reveal>
            <div className="flex flex-col items-center gap-5 rounded-[2rem] bg-brand-500 px-6 py-12 text-center text-white md:py-16">
              <h2 className="max-w-xl text-2xl font-black tracking-tight text-balance md:text-4xl">
                Chưa chắc nên chọn gói nào? Để Riviu tư vấn miễn phí.
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/#lien-he"
                  data-track="pricing-bottom-contact"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-600 transition-transform duration-300 hover:scale-105 active:scale-[0.98]"
                >
                  Liên hệ tư vấn
                </Link>
                <OpenChatButton
                  track="pricing-bottom-ask-ai"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:border-white active:scale-[0.98]"
                >
                  <ChatCircleDots size={16} weight="bold" />
                  Hỏi trợ lý Riviu
                </OpenChatButton>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
      <ChatWidget />
      <Tracker />
    </>
  );
}
