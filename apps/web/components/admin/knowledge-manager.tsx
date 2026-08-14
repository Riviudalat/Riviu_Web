"use client";

import { PencilSimple, Plus, Trash, X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import type { KnowledgeRow } from "../../lib/admin-types";

const EMPTY_FORM = {
  id: "",
  title: "",
  keywords: "",
  content: "",
};

export function KnowledgeManager({ items }: { items: KnowledgeRow[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editing = Boolean(form.id);

  const set = (field: keyof typeof EMPTY_FORM) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const startCreate = () => {
    setForm(EMPTY_FORM);
    setError(null);
    setOpen(true);
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const startEdit = (item: KnowledgeRow) => {
    setForm({
      id: item.id,
      title: item.title,
      keywords: item.keywords,
      content: item.content,
    });
    setError(null);
    setOpen(true);
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const closeForm = () => {
    setForm(EMPTY_FORM);
    setError(null);
    setOpen(false);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const payload = {
        title: form.title,
        keywords: form.keywords,
        content: form.content,
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
        setError(json.error ?? "Không lưu được. Thử lại sau.");
        return;
      }
      closeForm();
      router.refresh();
    } catch {
      setError("Không lưu được. Thử lại sau.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Xóa mục kiến thức này?")) return;
    await fetch(`/admin/api/knowledge/${id}`, { method: "DELETE" }).catch(
      () => {},
    );
    if (form.id === id) closeForm();
    router.refresh();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">
          {items.length} chủ đề · khách hỏi trúng từ khóa thì trợ lý trả lời nội
          dung này
        </p>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600"
        >
          <Plus size={16} weight="bold" />
          Thêm kiến thức
        </button>
      </div>

      {open ? (
        <form
          ref={formRef}
          onSubmit={submit}
          className="rounded-2xl border border-black/10 bg-white p-5 md:p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-black">
              {editing ? "Sửa mục kiến thức" : "Thêm mục kiến thức"}
            </h2>
            <button
              type="button"
              aria-label="Đóng"
              onClick={closeForm}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-ink-soft hover:bg-neutral-100"
            >
              <X size={16} weight="bold" />
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-bold" htmlFor="kb-title">
              Chủ đề
              <input
                id="kb-title"
                value={form.title}
                onChange={(event) => set("title")(event.target.value)}
                required
                placeholder="Ví dụ: Bảng giá, quy trình hợp tác"
                className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-brand-500"
              />
            </label>
            <label className="block text-sm font-bold" htmlFor="kb-keywords">
              Từ khóa kích hoạt
              <input
                id="kb-keywords"
                value={form.keywords}
                onChange={(event) => set("keywords")(event.target.value)}
                placeholder="bảng giá, giá dịch vụ, chi phí"
                className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-brand-500"
              />
              <span className="mt-1 block text-xs font-normal text-ink-soft">
                Phân tách bằng dấu phẩy
              </span>
            </label>
          </div>

          <label className="mt-4 block text-sm font-bold" htmlFor="kb-content">
            Câu trả lời
            <textarea
              id="kb-content"
              value={form.content}
              onChange={(event) => set("content")(event.target.value)}
              required
              rows={7}
              placeholder="Câu trả lời trợ lý sẽ gửi khi khách hỏi đúng chủ đề này."
              className="mt-2 w-full resize-y rounded-lg border border-black/15 px-4 py-3 text-sm font-normal outline-none transition-colors focus:border-brand-500"
            />
          </label>

          {error ? (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </p>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={busy}
              className="cursor-pointer rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
            >
              {editing ? "Cập nhật" : "Lưu kiến thức"}
            </button>
            <button
              type="button"
              onClick={closeForm}
              className="cursor-pointer rounded-full border border-black/15 px-5 py-3 text-sm font-bold text-ink-soft"
            >
              Hủy
            </button>
          </div>
        </form>
      ) : null}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-black/10 bg-white p-10 text-center text-sm text-ink-soft">
          Chưa có kiến thức. Bấm “Thêm kiến thức” để trợ lý bắt đầu trả lời được.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-black/10 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-black">{item.title}</p>
                  {item.keywords ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.keywords
                        .split(",")
                        .map((word) => word.trim())
                        .filter(Boolean)
                        .map((word) => (
                          <span
                            key={word}
                            className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand-700"
                          >
                            {word}
                          </span>
                        ))}
                    </div>
                  ) : null}
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    aria-label="Sửa"
                    onClick={() => startEdit(item)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-brand-50 hover:text-brand-600"
                  >
                    <PencilSimple size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Xóa"
                    onClick={() => void remove(item.id)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed whitespace-pre-line text-ink-soft">
                {item.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
