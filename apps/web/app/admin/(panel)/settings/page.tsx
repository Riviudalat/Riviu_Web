import { AiSettingsForm } from "../../../../components/admin/ai-settings-form";
import type { AiConfigView } from "../../../../lib/admin-types";
import { adminFetch } from "../../../../lib/server-api";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const config = await adminFetch<AiConfigView>("/ai-config");

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-black">Cấu hình AI</h1>
      <p className="mt-1 max-w-2xl text-sm text-ink-soft">
        Kết nối model AI (chuẩn OpenAI-compatible) để trợ lý trả lời tự nhiên
        dựa trên kho kiến thức. Bot luôn tự động lui về khớp từ khóa khi AI
        tắt hoặc gọi lỗi — không bao giờ chết hội thoại.
      </p>

      <div className="mt-6">
        <AiSettingsForm initial={config} />
      </div>
    </div>
  );
}
