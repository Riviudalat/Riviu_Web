import { FacebookLogo, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { mediaUrl } from "../lib/api";
import { CHANNELS, formatCompact } from "../lib/network-data";
import { sectionPad, type SectionPadding } from "../lib/section-utils";
import { Reveal } from "./reveal";

export type ChannelNetworkProps = {
  background?: "white" | "cream";
  paddingY?: SectionPadding;
  /** grid = card ảnh bìa (landing); compact = dải logo + số (trang giá) */
  layout?: "grid" | "compact";
  kicker?: string;
  title?: string;
  sub?: string;
  channels?: {
    name: string;
    type: "fanpage" | "group";
    verified: "yes" | "no";
    /** Người theo dõi / thành viên — dùng cho số hiển thị và thanh so sánh */
    audience: number;
    role: string;
    image: string;
  }[];
};

export const channelNetworkDefaults = {
  background: "white" as const,
  paddingY: "normal" as SectionPadding,
  layout: "grid" as const,
  kicker: "Hệ sinh thái kênh",
  title: "Bài viết của quán bạn xuất hiện ở đâu?",
  sub: "",
  channels: CHANNELS.map((channel) => ({
    name: channel.name,
    type: channel.type,
    verified: channel.verified ? ("yes" as const) : ("no" as const),
    audience: channel.audience,
    role: channel.role,
    image: channel.image,
  })),
} satisfies Required<ChannelNetworkProps>;

/** Hệ sinh thái kênh Facebook — "mua gói thì bài xuất hiện ở đâu". */
export function ChannelNetwork(props: ChannelNetworkProps) {
  const d = { ...channelNetworkDefaults, ...props };
  const biggest = Math.max(...d.channels.map((channel) => channel.audience), 1);
  const compact = d.layout === "compact";

  return (
    <section
      id="he-sinh-thai"
      data-section="he-sinh-thai"
      className={`scroll-mt-24 ${d.background === "cream" ? "bg-brand-50" : "bg-white"} ${sectionPad(d.paddingY)}`}
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase">
            {d.kicker}
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-tight text-balance md:text-4xl">
            {d.title}
          </h2>
        </Reveal>

        {compact ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {d.channels.map((channel, index) => (
              <Reveal key={`${channel.name}-${index}`} delay={index * 0.04}>
                <article className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 py-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10">
                    <FacebookLogo
                      size={18}
                      weight="fill"
                      className="text-[#1877F2]"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <h3 className="truncate text-sm font-black">
                        {channel.name}
                      </h3>
                      {channel.verified === "yes" ? (
                        <SealCheck
                          size={14}
                          weight="fill"
                          className="shrink-0 text-[#1877F2]"
                          aria-label="Đã xác minh"
                        />
                      ) : null}
                    </div>
                    <p className="text-[11px] text-ink-soft">
                      {channel.type === "group" ? "Group" : "Fanpage"}
                    </p>
                  </div>
                  <p className="shrink-0 text-right">
                    <span className="block text-base font-black text-brand-500">
                      {formatCompact(channel.audience)}
                    </span>
                    <span className="text-[10px] font-bold text-ink-soft">
                      {channel.type === "group" ? "thành viên" : "theo dõi"}
                    </span>
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.channels.map((channel, index) => (
            <Reveal key={`${channel.name}-${index}`} delay={index * 0.06}>
              <article className="group h-full overflow-hidden rounded-3xl border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-500">
                <div className="relative aspect-[16/7] overflow-hidden bg-neutral-100">
                  {channel.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element -- ảnh sửa được từ CMS, domain không cố định */
                    <img
                      src={mediaUrl(channel.image)}
                      alt={`Ảnh bìa ${channel.name}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                  <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-black tracking-wider uppercase">
                    <FacebookLogo
                      size={12}
                      weight="fill"
                      className="text-[#1877F2]"
                    />
                    {channel.type === "group" ? "Group" : "Fanpage"}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-black">{channel.name}</h3>
                    {channel.verified === "yes" ? (
                      <SealCheck
                        size={15}
                        weight="fill"
                        className="shrink-0 text-[#1877F2]"
                        aria-label="Đã xác minh"
                      />
                    ) : null}
                  </div>

                  <p className="mt-3 text-2xl font-black tracking-tight text-brand-500">
                    {formatCompact(channel.audience)}
                  </p>
                  <p className="text-xs font-bold text-ink-soft">
                    {channel.type === "group" ? "thành viên" : "người theo dõi"}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-50">
                    <div
                      className="h-full rounded-full bg-brand-500"
                      style={{
                        width: `${Math.max(6, Math.round((channel.audience / biggest) * 100))}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-ink-soft">
                    {channel.role}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
