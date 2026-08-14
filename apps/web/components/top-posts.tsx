import { Eye, HandsClapping, UsersThree } from "@phosphor-icons/react/dist/ssr";
import {
  formatCompact,
  TOP_POSTS,
  type TopPost,
} from "../lib/network-data";
import { mediaUrl } from "../lib/api";
import { Reveal } from "./reveal";

export function TopPosts({ posts }: { posts?: TopPost[] }) {
  const list = posts && posts.length > 0 ? posts : TOP_POSTS;
  const totals = [
    {
      label: "lượt hiển thị",
      value: list.reduce((sum, post) => sum + post.impressions, 0),
    },
    {
      label: "người tiếp cận",
      value: list.reduce((sum, post) => sum + post.reach, 0),
    },
    {
      label: "lượt tương tác",
      value: list.reduce((sum, post) => sum + post.engagement, 0),
    },
  ];

  return (
    <section
      id="hieu-qua"
      data-section="hieu-qua"
      className="scroll-mt-24 bg-brand-50 py-12 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase">
            Các bài viết nổi bật
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-tight text-balance md:text-4xl">
            Số liệu Facebook Insights từ bài đã chạy
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Ảnh chụp báo cáo Insights từ các bài đã chạy.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {totals.map((total) => (
              <div
                key={total.label}
                className="rounded-2xl bg-ink px-5 py-6 text-white"
              >
                <p className="text-3xl font-black tracking-tight md:text-4xl">
                  {formatCompact(total.value)}
                </p>
                <p className="mt-1 text-xs font-bold tracking-wider text-white/70 uppercase">
                  {total.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((post, index) => (
            <Reveal key={`${post.image}-${index}`} delay={index * 0.04}>
              <article className="overflow-hidden rounded-2xl border border-black/10 bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element -- ảnh CMS/Insights, domain không cố định */}
                <img
                  src={mediaUrl(post.image)}
                  alt={post.title}
                  className="aspect-[16/11] w-full object-cover object-top"
                />
                <div className="p-4">
                  <h3 className="line-clamp-2 text-sm leading-snug font-bold">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-ink-soft">
                    {post.author} · {post.date}
                  </p>
                  <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-black/5 pt-3">
                    <div>
                      <dt className="flex items-center gap-1 text-[10px] text-ink-soft">
                        <Eye size={12} className="text-brand-500" />
                        Hiển thị
                      </dt>
                      <dd className="text-xs font-black">
                        {formatCompact(post.impressions)}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1 text-[10px] text-ink-soft">
                        <UsersThree size={12} className="text-brand-500" />
                        Tiếp cận
                      </dt>
                      <dd className="text-xs font-black">
                        {formatCompact(post.reach)}
                      </dd>
                    </div>
                    <div>
                      <dt className="flex items-center gap-1 text-[10px] text-ink-soft">
                        <HandsClapping
                          size={12}
                          weight="fill"
                          className="text-brand-500"
                        />
                        Tương tác
                      </dt>
                      <dd className="text-xs font-black">
                        {formatCompact(post.engagement)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
