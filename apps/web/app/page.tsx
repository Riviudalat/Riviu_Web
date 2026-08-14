import type { Data } from "@puckeditor/core";
import type { Metadata } from "next";
import { PageClient } from "../components/page-client";
import { SeoJsonLd } from "../components/seo-jsonld";
import { DEFAULT_FAQ_ITEMS } from "../lib/faq-data";
import { API_INTERNAL } from "../lib/server-api";

async function getContent(): Promise<Data | null> {
  try {
    const res = await fetch(`${API_INTERNAL}/api/content/home`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) return null;
    const page = (await res.json()) as { data?: Data };
    return page.data ?? null;
  } catch {
    // API chưa chạy — dùng nội dung mặc định
    return null;
  }
}

/** SEO title/description chỉnh từ Puck editor (root fields). */
export async function generateMetadata(): Promise<Metadata> {
  const data = await getContent();
  const root = (
    data as {
      root?: { props?: { seoTitle?: string; seoDescription?: string } };
    } | null
  )?.root?.props;

  const title = root?.seoTitle?.trim() || undefined;
  const description = root?.seoDescription?.trim() || undefined;
  if (!title && !description) return {};

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    },
    twitter: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
    },
  };
}

type FaqItem = { question: string; answer: string };

/** Lấy FAQ đúng như đang hiển thị (Puck data nếu có, không thì defaults) cho JSON-LD. */
function extractFaqs(data: Data | null): FaqItem[] {
  const content = (
    data as {
      content?: { type?: string; props?: { items?: FaqItem[] } }[];
    } | null
  )?.content;
  const faqBlock = content?.find((block) => block?.type === "Faq");
  const items = faqBlock?.props?.items?.filter(
    (item) => item?.question && item?.answer,
  );
  return items && items.length > 0 ? items : DEFAULT_FAQ_ITEMS;
}

export default async function Home() {
  const data = await getContent();
  return (
    <>
      <SeoJsonLd faqs={extractFaqs(data)} />
      <PageClient data={data} />
    </>
  );
}
