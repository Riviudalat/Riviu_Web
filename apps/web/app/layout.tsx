import type { Metadata } from "next";
import {
  Archivo,
  Baloo_2,
  Be_Vietnam_Pro,
  Bricolage_Grotesque,
  Inter,
  Lexend,
  Manrope,
  Montserrat,
  Nunito,
  Playfair_Display,
} from "next/font/google";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "../lib/site";
import "./globals.css";

/* Font nội dung mặc định — preload */
const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam",
  display: "swap",
});

/* Font tiêu đề mặc định — preload */
const bricolage = Bricolage_Grotesque({
  subsets: ["vietnamese", "latin"],
  variable: "--font-bricolage",
  display: "swap",
});

/* Các font tùy chọn cho editor — chỉ tải khi được dùng (preload: false) */
const inter = Inter({
  subsets: ["vietnamese", "latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});
const lexend = Lexend({
  subsets: ["vietnamese", "latin"],
  variable: "--font-lexend",
  display: "swap",
  preload: false,
});
const manrope = Manrope({
  subsets: ["vietnamese", "latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: false,
});
const montserrat = Montserrat({
  subsets: ["vietnamese", "latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
});
const archivo = Archivo({
  subsets: ["vietnamese", "latin"],
  variable: "--font-archivo",
  display: "swap",
  preload: false,
});
const nunito = Nunito({
  subsets: ["vietnamese", "latin"],
  variable: "--font-nunito",
  display: "swap",
  preload: false,
});
const baloo = Baloo_2({
  subsets: ["vietnamese", "latin"],
  variable: "--font-baloo",
  display: "swap",
  preload: false,
});
const playfair = Playfair_Display({
  subsets: ["vietnamese", "latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

const fontVariables = [
  beVietnam.variable,
  bricolage.variable,
  inter.variable,
  lexend.variable,
  manrope.variable,
  montserrat.variable,
  archivo.variable,
  nunito.variable,
  baloo.variable,
  playfair.variable,
].join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Riviu",
    "review ẩm thực",
    "địa điểm ăn uống",
    "quán ngon",
    "food review Việt Nam",
    "truyền thông F&B",
    "booking review",
    "food blogger",
    "RIVICO",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Biến font phải nằm trên <html> để các khai báo :root trong globals.css
  // (--font-sans, --font-body, --font-display) tham chiếu được.
  return (
    <html lang="vi" className={fontVariables}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
