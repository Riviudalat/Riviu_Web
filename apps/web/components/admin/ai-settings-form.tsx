"use client";

import { PlugsConnected } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { AiConfigView } from "../../lib/admin-types";

export function AiSettingsForm({ initial }: { initial: AiConfigView | null }) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(initial?.enabled ?? false);
  const [baseUrl, setBaseUrl] = useState(initial?.baseUrl ?? "");
  const [model, setModel] = useState(initial?.model ?? "");
  const [apiKey, setApiKey] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(
    initial?.systemPrompt ?? "",
  );
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{
    kind: "ok" | "error";
    text: string;
  } | null>(null);

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch("/admin/api/ai-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enabled,
          baseUrl,
          model,
          systemPrompt,
          ...(apiKey ? { apiKey } : {}),
        }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setStatus({
          kind: "error",
          text: json.error ?? "Lưu thất bại — kiểm tra API đang chạy",
        });
        return;
      }
      setApiKey("");
      setStatus({ kind: "ok", text: "Đã lưu cấu hình" });
      router.refresh();
    } catch {
      setStatus({ kind: "error", text: "Không kết nối được API" });
    } finally {
      setBusy(false);
    }
  };

  const test = async () => {
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch("/admin/api/ai-config/test", { method: "POST" });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reply?: string;
        error?: string;
      };
      setStatus(
        json.ok
          ? { kind: "ok", text: `Kết nối OK — model trả lời: "${json.reply}"` }
          : { kind: "error", text: json.error ?? "Kết nối thất bại" },
      );
    } catch {
      setStatus({ kind: "error", text: "Không kết nối được API" });
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500";

  return (
    <form
      onSubmit={save}
      className="max-w-2xl rounded-2xl border border-black/10 bg-white p-6 md:p-8"
    >
      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-black/5 bg-neutral-50 p-4">
        <span>
          <span className="flex items-center gap-2 font-black">
            Bật trả lời bằng AI
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] tracking-wider uppercase ${
                enabled
                  ? "bg-green-100 text-green-700"
                  : "bg-neutral-200 text-ink-soft"
              }`}
            >
              {enabled ? "Đang bật" : "Đang tắt"}
            </span>
          </span>
          <span className="mt-0.5 block text-sm text-ink-soft">
            Tắt thì bot dùng khớp từ khóa từ kho kiến thức như bình thường.
          </span>
        </span>
        <span className="relative inline-flex shrink-0">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(event) => setEnabled(event.target.checked)}
            className="peer sr-only"
          />
          <span className="h-7 w-12 rounded-full bg-black/15 transition-colors peer-checked:bg-brand-500 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500" />
          <span className="absolute top-1 left-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5" />
        </span>
      </label>

      <label className="mt-6 block text-sm font-bold" htmlFor="ai-base-url">
        Base URL{" "}
        <span className="font-normal text-ink-soft">
          (chuẩn OpenAI-compatible)
        </span>
      </label>
      <input
        id="ai-base-url"
        value={baseUrl}
        onChange={(event) => setBaseUrl(event.target.value)}
        placeholder="https://api.openai.com/v1"
        className={inputClass}
      />
      <p className="mt-1.5 text-xs text-ink-soft">
        Dùng được với OpenAI, Groq, OpenRouter, Gemini (bản OpenAI-compat),
        Ollama nội bộ…
      </p>

      <label className="mt-5 block text-sm font-bold" htmlFor="ai-model">
        Model
      </label>
      <input
        id="ai-model"
        value={model}
        onChange={(event) => setModel(event.target.value)}
        placeholder="gpt-4o-mini"
        className={inputClass}
      />

      <label className="mt-5 block text-sm font-bold" htmlFor="ai-key">
        API key{" "}
        {initial?.apiKeySet ? (
          <span className="font-normal text-green-600">
            (đã lưu — nhập mới để thay)
          </span>
        ) : (
          <span className="font-normal text-ink-soft">(chưa có)</span>
        )}
      </label>
      <input
        id="ai-key"
        type="password"
        value={apiKey}
        onChange={(event) => setApiKey(event.target.value)}
        placeholder={initial?.apiKeySet ? "••••••••••••" : "sk-…"}
        autoComplete="off"
        className={inputClass}
      />

      <label className="mt-5 block text-sm font-bold" htmlFor="ai-prompt">
        System prompt{" "}
        <span className="font-normal text-ink-soft">
          (trống = dùng persona Trợ lý Riviu mặc định)
        </span>
      </label>
      <textarea
        id="ai-prompt"
        value={systemPrompt}
        onChange={(event) => setSystemPrompt(event.target.value)}
        rows={4}
        placeholder="Bạn là Trợ lý Riviu…"
        className={`${inputClass} resize-y`}
      />

      {status ? (
        <p
          className={`mt-5 rounded-lg px-4 py-3 text-sm font-semibold ${
            status.kind === "ok"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {status.text}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
        >
          Lưu cấu hình
        </button>
        <button
          type="button"
          onClick={() => void test()}
          disabled={busy}
          className="flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-bold text-ink-soft transition-colors hover:border-brand-500 hover:text-brand-600 disabled:opacity-50"
        >
          <PlugsConnected size={16} weight="bold" />
          Kiểm tra kết nối
        </button>
      </div>
    </form>
  );
}
