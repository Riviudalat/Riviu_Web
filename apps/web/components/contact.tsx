"use client";

import {
  CheckCircle,
  EnvelopeSimple,
  MapPin,
  PaperPlaneTilt,
  Phone,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useState, type FormEvent } from "react";
import { API_BASE } from "../lib/api";
import { sectionPad, type SectionPadding } from "../lib/section-utils";
import { Magnetic } from "./effects/magnetic";

export type ContactProps = {
  paddingY?: SectionPadding;
  kicker?: string;
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
};

export const contactDefaults = {
  paddingY: "normal" as SectionPadding,
  kicker: "Liên hệ",
  title: "Sẵn sàng hợp tác cùng Riviu?",
  description:
    "Để lại lời nhắn về nhu cầu truyền thông, booking review hay quảng bá địa điểm — đội ngũ Riviu sẽ phản hồi trong 24 giờ làm việc.",
  email: "contact@riviu.vn",
  phone: "028 62725439",
  address: "372-374 Trần Hưng Đạo, Phường 2, Quận 5, TP. Hồ Chí Minh",
} satisfies Required<ContactProps>;

export function Contact(props: ContactProps) {
  const d = { ...contactDefaults, ...props };
  const reduced = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        message?: string | string[];
      };
      if (!res.ok) {
        const detail = Array.isArray(json.message)
          ? json.message.join(" ")
          : json.message;
        throw new Error(detail ?? "Không gửi được. Thử lại hoặc gọi hotline.");
      }
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không gửi được. Thử lại hoặc gọi hotline.",
      );
    } finally {
      setSending(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSent(false);
    setError("");
  };

  return (
    <section
      id="lien-he"
      data-section="lien-he"
      className={`scroll-mt-24 ${sectionPad(d.paddingY)}`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={
            reduced
              ? undefined
              : { clipPath: "inset(12% 6% 12% 6% round 3rem)", opacity: 0.4 }
          }
          whileInView={
            reduced
              ? undefined
              : { clipPath: "inset(0% 0% 0% 0% round 2rem)", opacity: 1 }
          }
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.85, ease: [0.21, 0.65, 0.36, 1] }}
        >
          <div className="grid gap-10 rounded-[2rem] bg-brand-500 p-8 text-white md:p-14 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-xs font-bold tracking-[0.25em] text-white/75 uppercase">
                {d.kicker}
              </p>
              <h2 className="mt-4 text-3xl leading-tight font-black tracking-tight text-balance md:text-5xl">
                {d.title}
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/90">
                {d.description}
              </p>

              <ul className="mt-9 space-y-4 text-sm font-semibold">
                <li>
                  <a
                    href={`tel:${d.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 transition-opacity hover:opacity-80"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                      <Phone size={18} weight="fill" />
                    </span>
                    {d.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${d.email}`}
                    className="flex items-center gap-3 transition-opacity hover:opacity-80"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                      <EnvelopeSimple size={18} weight="fill" />
                    </span>
                    {d.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <MapPin size={18} weight="fill" />
                  </span>
                  {d.address}
                </li>
              </ul>
            </div>

            {sent ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 text-center text-ink md:p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <CheckCircle size={32} weight="fill" />
                </span>
                <h3 className="mt-5 text-xl font-black tracking-tight">
                  Cảm ơn bạn đã liên hệ
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
                  Riviu đã nhận thông tin. Chúng tôi sẽ liên hệ bạn sớm hoặc gọi
                  điện trong giờ hành chính.
                </p>
                <a
                  href={`tel:${d.phone.replace(/\s/g, "")}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600"
                >
                  <Phone size={16} weight="fill" />
                  Gọi {d.phone}
                </a>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-3 cursor-pointer text-sm font-bold text-ink-soft underline-offset-2 hover:text-brand-600 hover:underline"
                >
                  Gửi tin khác
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white p-6 text-ink md:p-8"
              >
                <label
                  className="block text-sm font-bold"
                  htmlFor="contact-name"
                >
                  Họ và tên
                </label>
                <input
                  id="contact-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="Họ và tên"
                  className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
                />

                <label
                  className="mt-5 block text-sm font-bold"
                  htmlFor="contact-email"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="Email"
                  className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
                />

                <label
                  className="mt-5 block text-sm font-bold"
                  htmlFor="contact-phone"
                >
                  Số điện thoại
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  placeholder="Để Riviu gọi lại"
                  className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
                />

                <label
                  className="mt-5 block text-sm font-bold"
                  htmlFor="contact-message"
                >
                  Nội dung
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  rows={3}
                  placeholder="Nội dung cần trao đổi"
                  className="mt-2 w-full resize-none rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
                />

                {error ? (
                  <p className="mt-4 text-sm font-semibold text-red-600">
                    {error}
                  </p>
                ) : null}

                <Magnetic className="mt-6" strength={0.15}>
                  <button
                    type="submit"
                    data-track="contact-submit"
                    disabled={sending}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-ink py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-brand-600 disabled:opacity-60"
                  >
                    <PaperPlaneTilt size={16} weight="fill" />
                    {sending ? "Đang gửi…" : "Gửi liên hệ"}
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
