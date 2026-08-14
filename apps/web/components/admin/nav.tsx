"use client";

import {
  ArrowSquareOut,
  Brain,
  ChatsCircle,
  EnvelopeSimple,
  Gear,
  Images,
  PenNib,
  SignOut,
  SquaresFour,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAdminInbox } from "./admin-inbox";

const links = [
  { href: "/admin", label: "Dashboard", icon: SquaresFour, exact: true },
  { href: "/admin/editor", label: "Chỉnh sửa nội dung", icon: PenNib },
  { href: "/admin/insights", label: "Bài nổi bật", icon: Images },
  { href: "/admin/knowledge", label: "Kiến thức AI", icon: Brain },
  { href: "/admin/leads", label: "Liên hệ", icon: EnvelopeSimple, badge: "leads" as const },
  { href: "/admin/chat", label: "Hội thoại AI", icon: ChatsCircle, badge: "chats" as const },
  { href: "/admin/settings", label: "Cấu hình AI", icon: Gear },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { leadBadge, chatBadge } = useAdminInbox();

  const logout = async () => {
    await fetch("/admin/api/logout", { method: "POST" }).catch(() => {});
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <nav className="flex flex-1 flex-col gap-1">
      {links.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href);
        const badge =
          link.badge === "leads"
            ? leadBadge
            : link.badge === "chats"
              ? chatBadge
              : 0;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
              active
                ? "bg-brand-50 text-brand-700"
                : "text-ink-soft hover:bg-neutral-100"
            }`}
          >
            <link.icon size={20} weight={active ? "fill" : "regular"} />
            <span className="flex-1">{link.label}</span>
            {badge > 0 ? (
              <span className="rounded-full bg-brand-500 px-1.5 py-0.5 text-[10px] font-black text-white">
                {badge > 99 ? "99+" : badge}
              </span>
            ) : null}
          </Link>
        );
      })}

      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink-soft transition-colors hover:bg-neutral-100"
      >
        <ArrowSquareOut size={20} />
        Xem trang web
      </a>

      <button
        type="button"
        onClick={logout}
        className="mt-auto flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-ink-soft transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <SignOut size={20} />
        Đăng xuất
      </button>
    </nav>
  );
}
