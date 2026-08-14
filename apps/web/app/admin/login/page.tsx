"use client";

import { SignIn } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/admin/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(data.error ?? "Đăng nhập thất bại");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Có lỗi xảy ra, thử lại sau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-8"
      >
        <Image
          src="/riviu-logo.png"
          alt="Riviu"
          width={250}
          height={128}
          className="mx-auto h-10 w-auto"
        />
        <h1 className="sr-only">Đăng nhập quản trị</h1>

        <label className="mt-8 block text-sm font-bold" htmlFor="email">
          Tài khoản
        </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="username"
          className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
        />

        <label className="mt-4 block text-sm font-bold" htmlFor="password">
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="current-password"
          className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
        />

        {error ? (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
        >
          <SignIn size={16} weight="bold" />
          {loading ? "Đang đăng nhập…" : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
