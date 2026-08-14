"use client";

import {
  ArrowCounterClockwise,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import { Puck, type Data } from "@puckeditor/core";
import "@puckeditor/core/puck.css";
import { useState } from "react";
import {
  buildDefaultPuckData,
  puckConfig,
  sanitizePuckData,
} from "../../puck.config";

export type RevisionRow = { id: string; createdAt: string };

function formatTime(value: string): string {
  return new Date(value).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });
}

export function AdminPuckEditor({
  initialData,
  revisions,
}: {
  initialData: Data | null;
  revisions: RevisionRow[];
}) {
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [selectedRevision, setSelectedRevision] = useState("");

  const flash = (message: string) => {
    setStatus(message);
    window.setTimeout(() => setStatus(null), 5000);
  };

  const handlePublish = async (data: Data) => {
    flash("Đang lưu…");
    try {
      const res = await fetch("/admin/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (res.ok) {
        flash("Đã xuất bản! Trang chủ sẽ cập nhật trong ~30 giây.");
      } else {
        const json = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        flash(json.error ?? "Lưu thất bại — kiểm tra API");
      }
    } catch {
      flash("Lưu thất bại — không kết nối được API");
    }
  };

  const handleRestore = async () => {
    if (!selectedRevision) return;
    if (!window.confirm("Khôi phục phiên bản này? Bản hiện tại sẽ được lưu vào lịch sử.")) {
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/admin/api/content/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedRevision }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      flash(json.error ?? "Khôi phục thất bại");
    } catch {
      flash("Không kết nối được API");
    } finally {
      setBusy(false);
    }
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        "Đưa trang chủ về nội dung mặc định? Bản hiện tại sẽ được lưu vào lịch sử.",
      )
    ) {
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/admin/api/content/reset", { method: "POST" });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      flash(json.error ?? "Reset thất bại");
    } catch {
      flash("Không kết nối được API");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-black/10 bg-white p-3">
        <ClockCounterClockwise size={18} className="ml-1 text-brand-500" />
        <select
          value={selectedRevision}
          onChange={(event) => setSelectedRevision(event.target.value)}
          className="min-w-52 rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-500"
        >
          <option value="">
            {revisions.length > 0
              ? `Lịch sử (${revisions.length} bản)`
              : "Chưa có lịch sử"}
          </option>
          {revisions.map((revision) => (
            <option key={revision.id} value={revision.id}>
              Bản lưu {formatTime(revision.createdAt)}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleRestore}
          disabled={!selectedRevision || busy}
          className="rounded-lg bg-ink px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:opacity-40"
        >
          Khôi phục
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={busy}
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-black/15 px-4 py-2 text-sm font-bold text-ink-soft transition-colors hover:border-red-400 hover:text-red-600 disabled:opacity-40"
        >
          <ArrowCounterClockwise size={14} weight="bold" />
          Về nội dung mặc định
        </button>
      </div>

      <div className="relative h-[calc(100vh-12rem)] overflow-hidden rounded-2xl border border-black/10 bg-white">
        {status ? (
          <div className="absolute top-3 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-2 text-xs font-bold text-white shadow-lg">
            {status}
          </div>
        ) : null}
        <Puck
          config={puckConfig}
          data={sanitizePuckData(initialData) ?? buildDefaultPuckData()}
          onPublish={handlePublish}
          viewports={[
            { width: 375, label: "Mobile" },
            { width: 768, label: "Tablet" },
            { width: 1280, label: "Desktop" },
          ]}
        />
      </div>
    </div>
  );
}
