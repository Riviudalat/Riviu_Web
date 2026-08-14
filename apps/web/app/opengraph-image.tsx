import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Riviu – Ăn khắp nơi, chơi khắp chốn";

export default async function OpengraphImage() {
  const [black, bold] = await Promise.all([
    readFile(join(process.cwd(), "assets/BeVietnamPro-Black.ttf")),
    readFile(join(process.cwd(), "assets/BeVietnamPro-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#ff6600",
          color: "#ffffff",
          padding: "72px 84px",
          fontFamily: "BeVietnam",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: 10,
            textTransform: "uppercase",
            opacity: 0.92,
          }}
        >
          riviu.vn
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 900,
            marginTop: 28,
            lineHeight: 1.02,
          }}
        >
          Ăn khắp nơi,
        </div>
        <div
          style={{
            fontSize: 104,
            fontWeight: 900,
            lineHeight: 1.02,
            color: "#121212",
          }}
        >
          chơi khắp chốn.
        </div>
        <div style={{ fontSize: 34, marginTop: 36, opacity: 0.95 }}>
          Nền tảng review ẩm thực và công ty truyền thông F&amp;B
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "BeVietnam", data: black, weight: 900 },
        { name: "BeVietnam", data: bold, weight: 700 },
      ],
    },
  );
}
