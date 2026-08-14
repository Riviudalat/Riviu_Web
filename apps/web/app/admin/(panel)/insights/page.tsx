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
        Ảnh và số liệu Insights hiện trên trang bảng giá. Upload ảnh mới, sửa
        số, hoặc thêm bài — không cần dán đường dẫn file.
      </p>
      <div className="mt-6">
        <InsightsForm initial={posts} />
      </div>
    </div>
  );
}
