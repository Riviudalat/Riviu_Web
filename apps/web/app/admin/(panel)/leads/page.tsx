import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import type { ContactLeadRow } from "../../../../lib/admin-types";
import { adminFetch } from "../../../../lib/server-api";

export const dynamic = "force-dynamic";

function formatTime(value: string): string {
  return new Date(value).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default async function AdminLeadsPage() {
  const leads = await adminFetch<ContactLeadRow[]>("/contact/leads");

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-black">Form liên hệ</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Khách gửi từ trang chủ. Gọi lại theo số điện thoại — đây là kênh chính
        để chốt hợp tác.
      </p>

      {!leads || leads.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-black/10 bg-white p-10 text-center">
          <EnvelopeSimple
            size={40}
            weight="duotone"
            className="mx-auto text-brand-500"
          />
          <p className="mt-3 text-sm font-semibold text-ink-soft">
            Chưa có form nào. Khi khách gửi liên hệ, dữ liệu sẽ hiện ở đây.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {leads.map((lead) => (
            <article
              key={lead.id}
              className="rounded-2xl border border-black/10 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black">{lead.name}</h2>
                  <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-semibold">
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center gap-1.5 text-brand-700 hover:underline"
                    >
                      <Phone size={14} weight="fill" />
                      {lead.phone}
                    </a>
                    <a
                      href={`mailto:${lead.email}`}
                      className="inline-flex items-center gap-1.5 text-ink-soft hover:text-brand-600"
                    >
                      <EnvelopeSimple size={14} weight="fill" />
                      {lead.email}
                    </a>
                  </p>
                </div>
                <time className="text-xs font-semibold text-ink-soft">
                  {formatTime(lead.createdAt)}
                </time>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                {lead.message}
              </p>
            </article>
          ))}
        </div>
      )}

    </div>
  );
}
