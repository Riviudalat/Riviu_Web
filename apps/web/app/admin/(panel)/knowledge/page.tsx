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
        Chủ đề, từ khóa và câu trả lời. Khách hỏi trúng từ khóa thì trợ lý dùng
        đúng nội dung bạn nhập.
      </p>

      <div className="mt-6">
        <KnowledgeManager items={items ?? []} />
      </div>
    </div>
  );
}
