"use client";

import { ChatCircleDots, PaperPlaneRight, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { API_BASE } from "../lib/api";
import {
  pricingTableLabel,
  resolvePricingIntent,
  type PricingTableId,
} from "../lib/chat-pricing";
import { ChatPricingMenu, ChatPricingTable } from "./chat-pricing-cards";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  pricing?: "menu" | PricingTableId;
};

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Xin chào! Mình là Trợ lý Riviu. Bạn muốn tìm hiểu dịch vụ truyền thông hay bảng giá?"
};

const PLACEHOLDER_REPLY =
  "Cảm ơn bạn đã nhắn tin! Mình chưa kết nối được máy chủ lúc này. Bạn có thể liên hệ email contact@riviu.vn hoặc hotline 028 62725439 (giờ hành chính) để được đội ngũ Riviu hỗ trợ trực tiếp nhé.";

const FIRST_TAGS = [
  "Riviu là gì?",
  "Về bảng giá",
  "Cách hợp tác booking review?",
];

const AFTER_TAGS = [
  "Về bảng giá",
  "Gói combo Facebook",
  "Gói Facebook tháng",
  "Gói TikTok",
  "Gói duyệt bài",
  "Gói xây kênh",
  "Dịch vụ lẻ",
  "KOL TikTok",
];

function getChatSessionId(): string {
  const key = "riviu-chat-session";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

function logMessage(role: "user" | "assistant", content: string) {
  try {
    void fetch(`${API_BASE}/api/chat-log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: getChatSessionId(),
        role,
        content,
      }),
    }).catch(() => {});
  } catch {
    // API chưa chạy — bỏ qua, widget vẫn hoạt động
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, open]);

  // Cho phép nút ở nơi khác (vd. trang bảng giá) mở widget
  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("riviu:open-chat", openChat);
    return () => window.removeEventListener("riviu:open-chat", openChat);
  }, []);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || typing) return;

    setMessages((prev) => [...prev, { role: "user", content }]);
    setInput("");

    const pricing = resolvePricingIntent(content);
    if (pricing) {
      const reply =
        pricing === "menu"
          ? "Riviu tách từng bảng giá riêng. Chọn một nhóm bên dưới — không gộp hết vào một tin."
          : `Bảng ${pricingTableLabel(pricing)}:`;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, pricing },
      ]);
      logMessage("user", content);
      logMessage("assistant", reply);
      return;
    }

    setTyping(true);

    try {
      // Bot trả lời từ kho kiến thức admin nhập (API tự lưu hội thoại)
      const res = await fetch(`${API_BASE}/api/chat/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: getChatSessionId(),
          message: content,
        }),
      });
      if (!res.ok) throw new Error("api-error");
      const json = (await res.json()) as { reply?: string };
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: json.reply ?? PLACEHOLDER_REPLY },
      ]);
      setTyping(false);
    } catch {
      // API chưa chạy — trả lời placeholder và log fire-and-forget
      logMessage("user", content);
      window.setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: PLACEHOLDER_REPLY },
        ]);
        logMessage("assistant", PLACEHOLDER_REPLY);
        setTyping(false);
      }, 600);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Đóng trò chuyện" : "Mở trò chuyện với Trợ lý Riviu"}
        data-track="chat-toggle"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 300, damping: 18 }}
        className="fixed right-5 bottom-5 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-brand-500 text-white shadow-lg transition-colors duration-300 hover:bg-brand-600 md:right-8 md:bottom-8"
      >
        {!open ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-25"
          />
        ) : null}
        <span className="relative">
          {open ? (
            <X size={24} weight="bold" />
          ) : (
            <ChatCircleDots size={26} weight="fill" />
          )}
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.21, 0.65, 0.36, 1] }}
            className="fixed right-5 bottom-22 z-50 flex h-[520px] w-[360px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl md:right-8 md:bottom-26"
          >
            <div className="flex items-center gap-3 bg-brand-500 px-5 py-4 text-white">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white">
                <Image
                  src="/favicon.png"
                  alt="Riviu"
                  width={36}
                  height={36}
                  className="h-6 w-6 object-contain"
                />
              </span>
              <div>
                <p className="text-sm font-black">Trợ lý Riviu</p>
                <p className="text-xs text-white/80">
                  Hỏi về dịch vụ, bảng giá, hợp tác…
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-neutral-50 p-4"
            >
              {messages.map((message, index) =>
                message.role === "user" ? (
                  <div
                    key={index}
                    className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-brand-500 px-4 py-2.5 text-sm leading-relaxed text-white"
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                ) : (
                  <div key={index} className="flex items-end gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white">
                      <Image
                        src="/favicon.png"
                        alt="Riviu"
                        width={24}
                        height={24}
                        className="h-4 w-4 object-contain"
                      />
                    </span>
                    <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-black/5 bg-white px-4 py-2.5 text-sm leading-relaxed text-ink">
                      <p className="whitespace-pre-line">{message.content}</p>
                      {message.pricing === "menu" ? (
                        <ChatPricingMenu onPick={(prompt) => void send(prompt)} />
                      ) : null}
                      {message.pricing && message.pricing !== "menu" ? (
                        <ChatPricingTable id={message.pricing} />
                      ) : null}
                    </div>
                  </div>
                ),
              )}
              {typing ? (
                <div className="flex items-end gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-white">
                    <Image
                      src="/favicon.png"
                      alt="Riviu"
                      width={24}
                      height={24}
                      className="h-4 w-4 object-contain"
                    />
                  </span>
                  <div className="w-fit rounded-2xl rounded-bl-md border border-black/5 bg-white px-4 py-2.5 text-sm text-ink-soft">
                    Đang nhập…
                  </div>
                </div>
              ) : null}

              {!typing ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {(messages.length === 1 ? FIRST_TAGS : AFTER_TAGS).map(
                    (tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => void send(tag)}
                        className="cursor-pointer rounded-full border border-brand-500/40 bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-50"
                      >
                        {tag}
                      </button>
                    ),
                  )}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                void send(input);
              }}
              className="flex items-center gap-2 border-t border-black/10 bg-white p-3"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Nhập tin nhắn…"
                className="flex-1 rounded-full border border-black/15 px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-500"
              />
              <button
                type="submit"
                aria-label="Gửi tin nhắn"
                data-track="chat-send"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-600 disabled:opacity-50"
                disabled={!input.trim() || typing}
              >
                <PaperPlaneRight size={16} weight="fill" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
