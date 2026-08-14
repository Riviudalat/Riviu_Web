"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { id: "ve-riviu", label: "Về Riviu" },
  { id: "dich-vu", label: "Dịch vụ" },
  { id: "quy-trinh", label: "Quy trình" },
  { id: "faq", label: "FAQ" },
];

export function Header() {
  const pathname = usePathname();
  const onPricingPage = pathname === "/bang-gia";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: đánh dấu section đang xem
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId((entry.target as HTMLElement).id);
          }
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );

    // chờ nội dung (Puck hoặc mặc định) render xong
    const timer = window.setTimeout(() => {
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) observer.observe(el);
      }
    }, 600);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "border-b border-black/10 shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-[72px] md:px-6">
        <a href="#top" className="flex shrink-0 items-center">
          <Image
            src="/riviu-logo.png"
            alt="Riviu"
            width={250}
            height={128}
            className="h-9 w-auto md:h-10"
            priority
          />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active = !onPricingPage && activeId === link.id;
            return (
              <a
                key={link.id}
                href={`/#${link.id}`}
                className={`relative text-sm font-semibold transition-colors ${
                  active
                    ? "text-brand-600"
                    : "text-ink-soft hover:text-brand-600"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-500 transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
          <Link
            href="/bang-gia"
            className={`relative text-sm font-semibold transition-colors ${
              onPricingPage
                ? "text-brand-600"
                : "text-ink-soft hover:text-brand-600"
            }`}
          >
            Bảng giá
            <span
              className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-500 transition-opacity ${
                onPricingPage ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#lien-he"
            data-track="header-contact"
            className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-brand-600 active:scale-[0.98]"
          >
            Liên hệ
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/10 md:hidden"
          >
            {menuOpen ? (
              <X size={20} weight="bold" />
            ) : (
              <List size={20} weight="bold" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.21, 0.65, 0.36, 1] }}
            className="overflow-hidden border-t border-black/5 bg-white md:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                    !onPricingPage && activeId === link.id
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink hover:bg-neutral-50"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/bang-gia"
                onClick={() => setMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                  onPricingPage
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink hover:bg-neutral-50"
                }`}
              >
                Bảng giá
              </Link>
              <Link
                href="/#lien-he"
                onClick={() => setMenuOpen(false)}
                data-track="header-contact-mobile"
                className="mt-2 block rounded-full bg-brand-500 px-4 py-3 text-center text-base font-bold text-white"
              >
                Liên hệ hợp tác
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
