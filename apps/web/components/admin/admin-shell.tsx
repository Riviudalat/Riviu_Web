"use client";

import Image from "next/image";
import { AdminInboxProvider } from "./admin-inbox";
import { AdminNav } from "./nav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminInboxProvider>
      <div className="min-h-screen bg-neutral-50">
        <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-black/10 bg-white p-5">
          <a href="/admin" className="mb-8 flex items-center px-2">
            <Image
              src="/riviu-logo.png"
              alt="Riviu"
              width={250}
              height={128}
              className="h-8 w-auto"
            />
            <span className="ml-2 rounded-md bg-brand-50 px-1.5 py-0.5 text-[10px] font-black tracking-wider text-brand-700 uppercase">
              Admin
            </span>
          </a>
          <AdminNav />
        </aside>
        <div className="ml-60 min-h-screen p-6 md:p-8">{children}</div>
      </div>
    </AdminInboxProvider>
  );
}
