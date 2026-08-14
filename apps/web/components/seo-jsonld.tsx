import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../lib/site";

type FaqItem = { question: string; answer: string };

export function SeoJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Công ty TNHH RIVICO",
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/riviu-logo.png`,
    email: "contact@riviu.vn",
    telephone: "+842862725439",
    address: {
      "@type": "PostalAddress",
      streetAddress: "372-374 Trần Hưng Đạo, Phường 2, Quận 5",
      addressLocality: "TP. Hồ Chí Minh",
      addressCountry: "VN",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "vi-VN",
  };

  const faqPage =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  const payload = [organization, website, ...(faqPage ? [faqPage] : [])];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
