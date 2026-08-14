import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CHAT_SOURCE_LABELS,
  type ChatSessionDetail,
} from "../../../../../lib/admin-types";
import { adminFetch } from "../../../../../lib/server-api";

export const dynamic = "force-dynamic";

export default async function AdminChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await adminFetch<ChatSessionDetail>(`/chat/sessions/${id}`);
  if (!session) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/chat"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-brand-600"
      >
        <ArrowLeft size={16} weight="bold" />
        Tất cả hội thoại
      </Link>

      <h1 className="mt-3 text-2xl font-black">Hội thoại</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Bắt đầu lúc{" "}
        {new Date(session.createdAt).toLocaleString("vi-VN")} ·{" "}
        {session.messages.length} tin nhắn
      </p>

      <div className="mt-6 space-y-3 rounded-2xl border border-black/10 bg-white p-6">
        {session.messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-full rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              message.role === "user"
                ? "ml-auto w-fit max-w-[90%] rounded-br-md bg-brand-500 text-white"
                : "rounded-bl-md border border-black/5 bg-neutral-50 text-ink"
            }`}
          >
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
            <p
              className={`mt-1 flex items-center gap-1.5 text-[10px] ${
                message.role === "user" ? "text-white/70" : "text-ink-soft"
              }`}
            >
              {message.role === "user" ? "Khách" : "Trợ lý"} ·{" "}
              {new Date(message.createdAt).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
              {message.role === "assistant" && message.source ? (
                <span
                  className={`rounded-full px-2 py-0.5 font-black uppercase ${
                    message.source === "ai"
                      ? "bg-brand-50 text-brand-700"
                      : message.source === "knowledge"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {CHAT_SOURCE_LABELS[message.source] ?? message.source}
                </span>
              ) : null}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
