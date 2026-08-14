import type { Data } from "@puckeditor/core";
import {
  AdminPuckEditor,
  type RevisionRow,
} from "../../../../components/admin/puck-editor";
import { adminFetch, API_INTERNAL } from "../../../../lib/server-api";

export const dynamic = "force-dynamic";

async function getCurrentContent(): Promise<Data | null> {
  try {
    const res = await fetch(`${API_INTERNAL}/api/content/home`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const page = (await res.json()) as { data?: Data };
    return page.data ?? null;
  } catch {
    return null;
  }
}

export default async function AdminEditorPage() {
  const [data, revisions] = await Promise.all([
    getCurrentContent(),
    adminFetch<RevisionRow[]>("/content/home/revisions"),
  ]);

  return (
    <div className="mx-auto max-w-none">
      <div className="mb-4">
        <h1 className="text-2xl font-black">Chỉnh sửa nội dung</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Kéo thả section và block, sửa nội dung, chọn font, rồi bấm{" "}
          <span className="font-bold">Publish</span> để xuất bản. Sửa hỏng thì
          khôi phục từ lịch sử.
        </p>
      </div>
      <AdminPuckEditor initialData={data} revisions={revisions ?? []} />
    </div>
  );
}
