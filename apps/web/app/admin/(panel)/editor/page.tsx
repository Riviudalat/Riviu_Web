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
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 border-b border-black/10 bg-white px-5 py-3">
        <h1 className="text-lg font-black">Chỉnh sửa nội dung</h1>
        <p className="mt-0.5 text-xs text-ink-soft">
          Cột phải: đổi font và màu. Chọn một khối để sửa chữ của khối đó;
          bấm vùng trống để đổi font cả trang. Xong thì{" "}
          <span className="font-bold">Publish</span>.
        </p>
      </div>
      <div className="min-h-0 flex-1">
        <AdminPuckEditor initialData={data} revisions={revisions ?? []} />
      </div>
    </div>
  );
}
