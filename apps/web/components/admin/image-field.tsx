"use client";

import { Image as ImageIcon, UploadSimple } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { mediaUrl } from "../../lib/api";

/** Field ảnh tùy chỉnh cho Puck: dán URL hoặc upload lên API (JWT qua cookie proxy). */
export function ImageField({
  value,
  onChange,
  showUrl = true,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
  /** Ẩn ô đường dẫn kỹ thuật (dùng trên /admin/insights). */
  showUrl?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/admin/api/media", {
        method: "POST",
        body: form,
      });
      const json = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok || !json.url) {
        setError(json.error ?? "Không tải được ảnh. Thử lại sau.");
        return;
      }
      onChange(json.url);
    } catch {
      setError("Không kết nối được API");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element -- preview trong editor
        <img
          src={mediaUrl(value)}
          alt="Xem trước"
          style={{
            width: "100%",
            height: showUrl ? 120 : 160,
            objectFit: "cover",
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 80,
            borderRadius: 8,
            border: "1px dashed rgba(0,0,0,0.2)",
            color: "#4b4b4b",
          }}
        >
          <ImageIcon size={22} />
        </div>
      )}

      {showUrl ? (
        <input
          type="text"
          value={value ?? ""}
          placeholder="Dán URL ảnh hoặc upload bên dưới"
          onChange={(event) => onChange(event.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid rgba(0,0,0,0.15)",
            fontSize: 13,
          }}
        />
      ) : null}

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          padding: "8px 10px",
          borderRadius: 6,
          border: "none",
          background: "#ff6600",
          color: "#fff",
          fontWeight: 700,
          fontSize: 13,
          cursor: uploading ? "wait" : "pointer",
          opacity: uploading ? 0.6 : 1,
        }}
      >
        <UploadSimple size={16} weight="bold" />
        {uploading ? "Đang tải lên…" : "Upload ảnh (tối đa 5MB)"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void upload(file);
          event.target.value = "";
        }}
      />

      {error ? (
        <p style={{ color: "#dc2626", fontSize: 12, margin: 0 }}>{error}</p>
      ) : null}
    </div>
  );
}
