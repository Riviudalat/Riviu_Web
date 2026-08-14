"use client";

import type { ReactNode } from "react";

/** Nút mở widget Trợ lý Riviu từ bất kỳ đâu (widget lắng nghe sự kiện). */
export function OpenChatButton({
  children,
  className,
  track,
}: {
  children: ReactNode;
  className?: string;
  track?: string;
}) {
  return (
    <button
      type="button"
      data-track={track}
      className={className}
      onClick={() => window.dispatchEvent(new Event("riviu:open-chat"))}
    >
      {children}
    </button>
  );
}
