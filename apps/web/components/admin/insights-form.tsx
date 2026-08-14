"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { TopPost } from "../../lib/network-data";
import { ImageField } from "./image-field";

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

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch("/admin/api/content/bang-gia", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { posts } }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        setStatus({
          kind: "error",
          text: json.error ?? "Lưu thất bại — kiểm tra API đang chạy",
        });
        return;
      }
      setStatus({ kind: "ok", text: "Đã lưu bài nổi bật" });
      router.refresh();
    } catch {
      setStatus({ kind: "error", text: "Không kết nối được API" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-4">
      {posts.map((post, index) => (
        <article
          key={`${post.image}-${index}`}
          className="grid gap-4 rounded-2xl border border-black/10 bg-white p-4 md:grid-cols-[200px_1fr]"
        >
          <ImageField
            value={post.image}
            onChange={(image) => update(index, { image })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="sm:col-span-2 text-xs font-bold">
              Tiêu đề
              <input
                value={post.title}
                onChange={(event) => update(index, { title: event.target.value })}
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal"
              />
            </label>
            <label className="text-xs font-bold">
              Tác giả
              <input
                value={post.author}
                onChange={(event) =>
                  update(index, { author: event.target.value })
                }
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal"
              />
            </label>
            <label className="text-xs font-bold">
              Ngày
              <input
                value={post.date}
                onChange={(event) => update(index, { date: event.target.value })}
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal"
              />
            </label>
            <label className="text-xs font-bold">
              Lượt hiển thị
              <input
                type="number"
                min={0}
                value={post.impressions}
                onChange={(event) =>
                  update(index, { impressions: Number(event.target.value) || 0 })
                }
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal"
              />
            </label>
            <label className="text-xs font-bold">
              Người tiếp cận
              <input
                type="number"
                min={0}
                value={post.reach}
                onChange={(event) =>
                  update(index, { reach: Number(event.target.value) || 0 })
                }
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal"
              />
            </label>
            <label className="text-xs font-bold sm:col-span-2">
              Lượt tương tác
              <input
                type="number"
                min={0}
                value={post.engagement}
                onChange={(event) =>
                  update(index, { engagement: Number(event.target.value) || 0 })
                }
                className="mt-1 w-full rounded-lg border border-black/15 px-3 py-2 text-sm font-normal"
              />
            </label>
          </div>
        </article>
      ))}

      <div className="flex flex-wrap items-center gap-3">
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
