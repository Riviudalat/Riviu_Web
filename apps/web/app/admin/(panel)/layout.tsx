import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "../../../components/admin/admin-shell";
import { getAdminToken } from "../../../lib/server-api";

export const metadata: Metadata = {
  title: "Quản trị Riviu",
  robots: { index: false, follow: false },
};

export default async function AdminPanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const token = await getAdminToken();
  if (!token) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
