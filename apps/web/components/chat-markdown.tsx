import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+?\*\*|__[^_]+?__)/g);
  return tokens.map((token, index) => {
    const wrapped =
      (token.startsWith("**") && token.endsWith("**") && token.length > 4) ||
      (token.startsWith("__") && token.endsWith("__") && token.length > 4);
    if (wrapped) {
      return <strong key={index}>{token.slice(2, -2)}</strong>;
    }
    return token;
  });
}

/** Render markdown nhẹ từ AI: in đậm + danh sách, không inject HTML. */
export function ChatMarkdown({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushList = () => {
    if (bullets.length === 0) return;
    const items = bullets;
    bullets = [];
    blocks.push(
      <ul
        key={`ul-${blocks.length}`}
        className="my-1.5 list-disc space-y-0.5 pl-4"
      >
        {items.map((item, index) => (
          <li key={index}>{inline(item)}</li>
        ))}
      </ul>,
    );
  };

  lines.forEach((line, index) => {
    const bullet = line.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
    if (bullet) {
      bullets.push(bullet[1] ?? "");
      return;
    }
    flushList();
    if (line.trim() === "") {
      blocks.push(<div key={`sp-${index}`} className="h-2" />);
      return;
    }
    blocks.push(
      <p key={`p-${index}`} className={index === 0 ? undefined : "mt-1"}>
        {inline(line)}
      </p>,
    );
  });
  flushList();

  return <div className={`break-words ${className}`}>{blocks}</div>;
}
