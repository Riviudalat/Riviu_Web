"use client";

import { Plus, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { TopPost } from "../../lib/network-data";
import { ImageField } from "./image-field";

const EMPTY_POST: TopPost = {
  title: "",
  author: "",
  date: "",
  impressions: 0,
  reach: 0,
  engagement: 0,
  image: "",
};

export function InsightsForm({ initial }: { initial: TopPost[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState<TopPost[]>(initial);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{
    kind: "ok" | "error";
    text: string;
  } | null>(null);

  const update = (index: number, patch: Partial<TopPost>) => {
    setPosts((current) =>
      current.map((post, i) => (i === index ? { ...post, ...patch } : post)),
    );
  };

  const addPost = () => {
    setPosts((current) => [...current, { ...EMPTY_POST }]);
  };

  const removePost = (index: number) => {
    const post = posts[index];
    if (post?.title && !window.confirm(`Xóa bài “${post.title}”?`)) return;
    setPosts((current) => current.filter((_, i) => i !== index));
  };

  const save = async (event: FormEvent) => {
    event.preventDefault();
    const ready = posts.filter((post) => post.title.trim() && post.image);
    if (ready.length === 0) {
      setStatus({
        kind: "error",
        text: "Cần ít nhất một bài có tiêu đề và ảnh.",
      });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch("/admin/api/content/bang-gia", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { posts: ready } }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setStatus({
          kind: "error",
          text: json.error ?? "Không lưu được. Thử lại sau.",
        });
        return;
      }
      setPosts(ready);
      setStatus({ kind: "ok", text: `Đã lưu ${ready.length} bài nổi bật` });
      router.refresh();
    } catch {
      setStatus({ kind: "error", text: "Không lưu được. Thử lại sau." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-4">
      {posts.map((post, index) => (
        <article
          key={index}
          className="grid gap-5 rounded-2xl border border-black/10 bg-white p-5 md:grid-cols-[220px_1fr]"
        >
          <div>
            <p className="mb-2 text-xs font-bold tracking-wide text-ink-soft uppercase">
              Ảnh bài {index + 1}
            </p>
            <ImageField
              value={post.image}
              onChange={(image) => update(index, { image })}
              showUrl={false}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <label className="min-w-0 flex-1 text-xs font-bold">
                Tiêu đề
                <input
                  value={post.title}
                  onChange={(event) =>
                    update(index, { title: event.target.value })
                  }
                  placeholder="Tiêu đề bài viết"
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-brand-500"
                />
              </label>
              <button
                type="button"
                aria-label="Xóa bài"
                onClick={() => removePost(index)}
                className="mt-6 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <Trash size={16} />
              </button>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className="text-xs font-bold">
                Tác giả
                <input
                  value={post.author}
                  onChange={(event) =>
                    update(index, { author: event.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-brand-500"
                />
              </label>
              <label className="text-xs font-bold">
                Ngày
                <input
                  value={post.date}
                  onChange={(event) =>
                    update(index, { date: event.target.value })
                  }
                  placeholder="28/06/2023"
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-brand-500"
                />
              </label>
              <label className="text-xs font-bold">
                Lượt hiển thị
                <input
                  type="number"
                  min={0}
                  value={post.impressions || ""}
                  onChange={(event) =>
                    update(index, {
                      impressions: Number(event.target.value) || 0,
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-brand-500"
                />
              </label>
              <label className="text-xs font-bold">
                Người tiếp cận
                <input
                  type="number"
                  min={0}
                  value={post.reach || ""}
                  onChange={(event) =>
                    update(index, { reach: Number(event.target.value) || 0 })
                  }
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-brand-500"
                />
              </label>
              <label className="text-xs font-bold sm:col-span-2">
                Lượt tương tác
                <input
                  type="number"
                  min={0}
                  value={post.engagement || ""}
                  onChange={(event) =>
                    update(index, {
                      engagement: Number(event.target.value) || 0,
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal outline-none focus:border-brand-500"
                />
              </label>
            </div>
          </div>
        </article>
      ))}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={addPost}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:border-brand-500 hover:text-brand-600"
        >
          <Plus size={16} weight="bold" />
          Thêm bài viết
        </button>
        <button
          type="submit"
          disabled={busy}
          className="cursor-pointer rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-60"
        >
          {busy ? "Đang lưu…" : "Lưu bài nổi bật"}
        </button>
        {status ? (
          <p
            className={`text-sm font-semibold ${
              status.kind === "ok" ? "text-emerald-700" : "text-red-600"
            }`}
          >
            {status.text}
          </p>
        ) : null}
      </div>
    </form>
  );
}
