"use client";

import {
  ArrowSquareOut,
  Brain,
  ChatsCircle,
  Gear,
  Images,
  PenNib,
  SignOut,
  SquaresFour,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: SquaresFour, exact: true },
  { href: "/admin/editor", label: "Chỉnh sửa nội dung", icon: PenNib },
  { href: "/admin/insights", label: "Bài nổi bật", icon: Images },
  { href: "/admin/knowledge", label: "Kiến thức AI", icon: Brain },
  { href: "/admin/chat", label: "Hội thoại AI", icon: ChatsCircle },
  { href: "/admin/settings", label: "Cấu hình AI", icon: Gear },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

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
            {link.label}
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
