import { InsightsForm } from "../../../../components/admin/insights-form";
import {
  parseTopPosts,
  TOP_POSTS,
  type TopPost,
} from "../../../../lib/network-data";
import { adminFetch } from "../../../../lib/server-api";

export const dynamic = "force-dynamic";

export default async function AdminInsightsPage() {
  const page = await adminFetch<{ data?: unknown }>("/content/bang-gia");
  const posts: TopPost[] = parseTopPosts(page?.data) ?? TOP_POSTS;

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-black">Bài viết nổi bật</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-soft">
        Bảy ảnh Facebook Insights trên trang /bang-gia. Đổi ảnh và số liệu tại
        đây — trang chủ và chat không lặp lại lưới này.
      </p>
      <div className="mt-6">
        <InsightsForm initial={posts} />
      </div>
    </div>
  );
}
