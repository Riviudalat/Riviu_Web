import { KnowledgeManager } from "../../../../components/admin/knowledge-manager";
import type { KnowledgeRow } from "../../../../lib/admin-types";
import { adminFetch } from "../../../../lib/server-api";

export const dynamic = "force-dynamic";

export default async function AdminKnowledgePage() {
  const items = await adminFetch<KnowledgeRow[]>("/knowledge");

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-black">Kiến thức cho Trợ lý AI</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-soft">
        Nhập thông tin công ty, bảng giá, chính sách và từ khóa kích hoạt.
        Khách hỏi trúng từ khóa là trợ lý trả lời bằng nội dung này. Bot không
        gửi file; thông tin chi tiết dẫn khách về trang web.
      </p>

      <div className="mt-6">
        <KnowledgeManager items={items ?? []} />
      </div>
    </div>
  );
}
