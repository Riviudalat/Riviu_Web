import {
  ChatsCircle,
  DownloadSimple,
  Robot,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ChatSessionRow, ChatStats } from "../../../../lib/admin-types";
import { adminFetch } from "../../../../lib/server-api";

export const dynamic = "force-dynamic";

function clip(value: string, max = 140): string {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function formatTime(value: string): string {
  return new Date(value).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function StatCard({
  label,
  value,
  note,
  warning,
}: {
  label: string;
  value: string;
  note?: string;
  warning?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-white p-5 ${
        warning ? "border-amber-300 bg-amber-50" : "border-black/10"
      }`}
    >
      <p className="text-xs font-bold tracking-wide text-ink-soft uppercase">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black">{value}</p>
      {note ? <p className="mt-1 text-xs text-ink-soft">{note}</p> : null}
    </div>
  );
}

export default async function AdminChatListPage() {
  const [sessions, stats] = await Promise.all([
    adminFetch<ChatSessionRow[]>("/chat/sessions"),
    adminFetch<ChatStats>("/chat/stats"),
  ]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black">Hội thoại Trợ lý Riviu</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Xem lại toàn bộ tin nhắn, xuất dữ liệu để phân tích và bổ sung
            kiến thức cho những câu bot chưa trả lời được.
          </p>
        </div>
        <div className="flex gap-2">
          <a
            href="/admin/api/chat-export?format=csv"
            className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-brand-600"
          >
            <DownloadSimple size={14} weight="bold" />
            Xuất CSV
          </a>
          <a
            href="/admin/api/chat-export?format=json"
            className="flex items-center gap-1.5 rounded-full border border-black/15 px-4 py-2.5 text-xs font-bold text-ink-soft transition-colors hover:border-brand-500 hover:text-brand-600"
          >
            <DownloadSimple size={14} weight="bold" />
            Xuất JSON
          </a>
        </div>
      </div>

      {stats ? (
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Tổng phiên" value={String(stats.sessions)} />
          <StatCard label="Tổng tin nhắn" value={String(stats.messages)} />
          <StatCard
            label="Bot đã trả lời"
            value={String(stats.ai + stats.knowledge)}
            note={`AI: ${stats.ai} · Kiến thức: ${stats.knowledge}`}
          />
          <StatCard
            label="Chưa trả lời được"
            value={`${stats.fallback} (${stats.fallbackRate}%)`}
            note="Bổ sung kiến thức cho các câu này"
            warning={stats.fallback > 0}
          />
        </div>
      ) : null}

      {!sessions || sessions.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-black/10 bg-white p-10 text-center">
          <ChatsCircle
            size={40}
            weight="duotone"
            className="mx-auto text-brand-500"
          />
          <p className="mt-3 text-sm font-semibold text-ink-soft">
            Chưa có hội thoại nào. Khi khách nhắn qua widget, dữ liệu sẽ hiện
            ở đây.
          </p>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-black/10 bg-neutral-50 px-5 py-3 text-xs text-ink-soft uppercase">
            <p>Câu hỏi đầu của khách</p>
            <p className="text-right">Số tin</p>
            <p className="text-right">Thời gian</p>
          </div>
          <ul>
            {sessions.map((session) => (
              <li key={session.id} className="border-b border-black/5 last:border-0">
                <Link
                  href={`/admin/chat/${session.id}`}
                  className="grid grid-cols-[1fr_auto_auto] items-start gap-4 px-5 py-3 text-sm transition-colors hover:bg-brand-50/50"
                >
                  <span className="min-w-0">
                    <span className="block font-semibold text-ink">
                      {clip(
                        session.firstUserMessage ||
                          session.lastMessage ||
                          "(trống)",
                      )}
                    </span>
                    {session.lastMessage &&
                    session.lastMessage !== session.firstUserMessage ? (
                      <span className="mt-1 block text-xs text-ink-soft">
                        Gần nhất: {clip(session.lastMessage)}
                      </span>
                    ) : null}
                  </span>
                  <span className="pt-0.5 text-right font-semibold">
                    {session.messageCount}
                  </span>
                  <span className="pt-0.5 text-right text-ink-soft">
                    {formatTime(session.lastMessageAt)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex items-start gap-2 rounded-2xl border border-black/10 bg-white p-5 text-sm text-ink-soft">
        <Robot size={18} className="mt-0.5 shrink-0 text-brand-500" />
        <p>
          Mẹo cải thiện bot: xuất CSV, lọc cột <b>source = fallback</b> để xem
          khách hỏi gì mà bot chưa trả lời được, rồi thêm mục tương ứng trong{" "}
          <Link
            href="/admin/knowledge"
            className="font-bold text-brand-600 hover:underline"
          >
            Kiến thức AI
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
