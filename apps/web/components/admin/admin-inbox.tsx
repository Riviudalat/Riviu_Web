"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChatsCircle, EnvelopeSimple, X } from "@phosphor-icons/react";
import type { AdminInbox } from "../../lib/admin-types";

const SEEN_LEADS = "riviu-admin-seen-leads";
const SEEN_CHATS = "riviu-admin-seen-chats";

type ToastItem = {
  id: string;
  href: string;
  title: string;
  body: string;
  kind: "lead" | "chat";
};

type InboxValue = {
  leadBadge: number;
  chatBadge: number;
};

const InboxContext = createContext<InboxValue>({ leadBadge: 0, chatBadge: 0 });

export function useAdminInbox() {
  return useContext(InboxContext);
}

function ensureSeen(key: string): string {
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const now = new Date().toISOString();
  localStorage.setItem(key, now);
  return now;
}

function clip(value: string, max = 72): string {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

export function AdminInboxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [leadBadge, setLeadBadge] = useState(0);
  const [chatBadge, setChatBadge] = useState(0);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const primed = useRef(false);
  const lastLeadId = useRef<string | null>(null);
  const lastChatKey = useRef<string | null>(null);

  useEffect(() => {
    if (pathname.startsWith("/admin/leads")) {
      localStorage.setItem(SEEN_LEADS, new Date().toISOString());
      setLeadBadge(0);
    }
    if (pathname.startsWith("/admin/chat")) {
      localStorage.setItem(SEEN_CHATS, new Date().toISOString());
      setChatBadge(0);
    }
  }, [pathname]);

  useEffect(() => {
    let cancelled = false;

    const poll = async () => {
      try {
        const sinceLeads = ensureSeen(SEEN_LEADS);
        const sinceChats = ensureSeen(SEEN_CHATS);
        const qs = new URLSearchParams({ sinceLeads, sinceChats });
        const res = await fetch(`/admin/api/inbox?${qs}`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as AdminInbox;
        if (cancelled) return;

        if (!pathname.startsWith("/admin/leads")) {
          setLeadBadge(data.leads);
        }
        if (!pathname.startsWith("/admin/chat")) {
          setChatBadge(data.chats);
        }

        const leadKey = data.latestLead?.id ?? null;
        const chatKey = data.latestChat
          ? `${data.latestChat.id}:${data.latestChat.createdAt}`
          : null;

        if (!primed.current) {
          primed.current = true;
          lastLeadId.current = leadKey;
          lastChatKey.current = chatKey;
          return;
        }

        if (document.hidden) {
          lastLeadId.current = leadKey;
          lastChatKey.current = chatKey;
          return;
        }

        if (leadKey && leadKey !== lastLeadId.current && data.latestLead) {
          lastLeadId.current = leadKey;
          const toast: ToastItem = {
            id: `lead-${leadKey}`,
            href: "/admin/leads",
            kind: "lead",
            title: "Form mới",
            body: `${data.latestLead.name}, ${data.latestLead.phone}`,
          };
          setToasts((prev) => [toast, ...prev.filter((row) => row.id !== toast.id)].slice(0, 4));
        }

        if (chatKey && chatKey !== lastChatKey.current && data.latestChat) {
          lastChatKey.current = chatKey;
          const toast: ToastItem = {
            id: `chat-${chatKey}`,
            href: `/admin/chat/${data.latestChat.id}`,
            kind: "chat",
            title: "Chat mới",
            body: clip(data.latestChat.preview) || "Khách vừa nhắn",
          };
          setToasts((prev) => [toast, ...prev.filter((row) => row.id !== toast.id)].slice(0, 4));
        }
      } catch {
        // API tắt — bỏ qua
      }
    };

    void poll();
    const timer = window.setInterval(() => void poll(), 8000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [pathname]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((row) => row.id !== id));
  }, []);

  return (
    <InboxContext.Provider value={{ leadBadge, chatBadge }}>
      {children}
      <AdminToasts toasts={toasts} onDismiss={dismiss} />
    </InboxContext.Provider>
  );
}

function AdminToasts({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  const router = useRouter();

  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) =>
      window.setTimeout(() => onDismiss(toast.id), 8000),
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [toasts, onDismiss]);

  return (
    <div className="pointer-events-none fixed top-6 right-6 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="pointer-events-auto relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg"
          >
            <button
              type="button"
              onClick={() => {
                router.push(toast.href);
                onDismiss(toast.id);
              }}
              className="flex w-full cursor-pointer items-start gap-3 px-4 py-3 text-left"
            >
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                {toast.kind === "lead" ? (
                  <EnvelopeSimple size={16} weight="fill" />
                ) : (
                  <ChatsCircle size={16} weight="fill" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-black tracking-wide text-brand-700 uppercase">
                  {toast.title}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-ink">
                  {toast.body}
                </span>
              </span>
            </button>
            <button
              type="button"
              aria-label="Đóng"
              onClick={() => onDismiss(toast.id)}
              className="absolute top-2 right-2 cursor-pointer rounded-full p-1 text-ink-soft hover:bg-neutral-100 hover:text-ink"
            >
              <X size={12} weight="bold" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
