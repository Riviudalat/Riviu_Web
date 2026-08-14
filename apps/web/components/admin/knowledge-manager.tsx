"use client";

import {
  PencilSimple,
  Plus,
  Trash,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { KnowledgeRow } from "../../lib/admin-types";

const EMPTY_FORM = {
  id: "",
  title: "",
  keywords: "",
  content: "",
};

export function KnowledgeManager({ items }: { items: KnowledgeRow[] }) {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editing = Boolean(form.id);

  const set = (field: keyof typeof EMPTY_FORM) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const payload = {
        title: form.title,
        keywords: form.keywords,
        content: form.content,
        // Trợ lý chỉ trả lời bằng nội dung; không gửi PDF/file cho khách.
        attachmentUrl: null,
      };
      const res = await fetch(
        editing ? `/admin/api/knowledge/${form.id}` : "/admin/api/knowledge",
        {
          method: editing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(json.error ?? "Lưu thất bại — kiểm tra API đang chạy");
        return;
      }
      setForm(EMPTY_FORM);
      router.refresh();
    } catch {
      setError("Không kết nối được API");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Xóa mục kiến thức này?")) return;
    await fetch(`/admin/api/knowledge/${id}`, { method: "DELETE" }).catch(
      () => {},
    );
    router.refresh();
  };

  return (
    <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(340px,0.85fr)_minmax(0,1.65fr)]">
      <form
        onSubmit={submit}
        className="h-fit min-w-0 rounded-2xl border border-black/10 bg-white p-5 md:p-6"
      >
        <h2 className="flex items-center gap-2 text-sm font-black">
          <Plus size={16} weight="bold" className="text-brand-500" />
          {editing ? "Sửa mục kiến thức" : "Thêm mục kiến thức"}
        </h2>

        <label className="mt-5 block text-sm font-bold" htmlFor="kb-title">
          Chủ đề
        </label>
        <input
          id="kb-title"
          value={form.title}
          onChange={(event) => set("title")(event.target.value)}
          required
          placeholder="Bảng giá dịch vụ truyền thông"
          className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
        />

        <label className="mt-4 block text-sm font-bold" htmlFor="kb-keywords">
          Từ khóa kích hoạt{" "}
          <span className="font-normal text-ink-soft">
            (phân tách bằng dấu phẩy)
          </span>
        </label>
        <input
          id="kb-keywords"
          value={form.keywords}
          onChange={(event) => set("keywords")(event.target.value)}
          placeholder="bảng giá, giá dịch vụ, chi phí, báo giá"
          className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
        />

        <label className="mt-4 block text-sm font-bold" htmlFor="kb-content">
          Câu trả lời của trợ lý
        </label>
        <textarea
          id="kb-content"
          value={form.content}
          onChange={(event) => set("content")(event.target.value)}
          required
          rows={6}
          placeholder={
            "Nhập câu trả lời chính xác cho chủ đề này. Nếu liên quan bảng giá, hướng khách tới trang /bang-gia."
          }
          className="mt-2 w-full resize-y rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
        />

        <p className="mt-4 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-xs leading-relaxed text-brand-800">
          Trợ lý chỉ trả lời bằng văn bản. Không tải hoặc gửi PDF cho khách;
          nội dung bảng giá dẫn trực tiếp tới <strong>/bang-gia</strong>.
        </p>

        {error ? (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex gap-2">
          <button
            type="submit"
            disabled={busy}
            className="flex-1 rounded-full bg-ink py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
          >
            {editing ? "Cập nhật" : "Thêm kiến thức"}
          </button>
          {editing ? (
            <button
              type="button"
              onClick={() => setForm(EMPTY_FORM)}
              className="rounded-full border border-black/15 px-5 text-sm font-bold text-ink-soft"
            >
              Hủy
            </button>
          ) : null}
        </div>
      </form>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white p-8 text-center text-sm text-ink-soft">
            Chưa có kiến thức nào. Thêm chủ đề đầu tiên (ví dụ: bảng giá, quy
            trình hợp tác, thông tin công ty…) để trợ lý bắt đầu trả lời được.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-black/10 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-black">{item.title}</p>
                  {item.keywords ? (
                    <p className="mt-1 truncate text-xs text-brand-700">
                      {item.keywords}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    aria-label="Sửa"
                    onClick={() =>
                      setForm({
                        id: item.id,
                        title: item.title,
                        keywords: item.keywords,
                        content: item.content,
                      })
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-brand-50 hover:text-brand-600"
                  >
                    <PencilSimple size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Xóa"
                    onClick={() => void remove(item.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
              <p className="mt-2 line-clamp-3 text-sm whitespace-pre-line text-ink-soft">
                {item.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
