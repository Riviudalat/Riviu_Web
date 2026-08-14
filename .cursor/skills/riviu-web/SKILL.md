---
name: riviu-web
description: Hướng dẫn toàn bộ về dự án Riviu_Web - website giới thiệu công ty Riviu (RIVICO) dạng Turborepo monorepo. Dùng khi chỉnh sửa, thêm tính năng, sửa lỗi hoặc tìm hiểu bất kỳ phần nào trong repo này (landing page, admin dashboard, API NestJS, Docker). Chứa design system bắt buộc, kiến trúc nội dung Puck, quy ước tracking và quy trình cập nhật STATUS.md.
---

# Dự án Riviu_Web

Website giới thiệu công ty Riviu (Công ty TNHH RIVICO) — công ty truyền thông F&B. Web cũ: https://riviu.vn. Không còn section ứng dụng/app.

## Cấu trúc monorepo (Turborepo + pnpm)

| Đường dẫn | Vai trò |
|---|---|
| `apps/web` | Next.js 16 (App Router, Turbopack) — landing page + trang quản trị `/admin`. Port 3000 |
| `apps/api` | NestJS 11 + Prisma + PostgreSQL — content, tracking, analytics, chat log, auth. Port 4000, prefix `/api` |
| `packages/ui` | Component React dùng chung (ít dùng cho landing) |
| `packages/typescript-config`, `packages/eslint-config` | Config dùng chung |

## Design system (BẮT BUỘC tuân theo)

- **Màu phẳng, CẤM gradient** (`bg-gradient-*`, `bg-clip-text` không được dùng). Palette token trong `apps/web/app/globals.css` (Tailwind v4 `@theme`): cam chính `brand-500 #FF6600` (hover `brand-600 #E05A00`), nền cam nhạt `brand-50/#FFF4EC`, `brand-100/#FFE8D6`, đen `ink #121212`, xám `ink-soft #4b4b4b`, nền trắng.
- **Icon: Phosphor** (`@phosphor-icons/react`) — KHÔNG dùng emoji, không dùng bộ icon khác. Quy ước weight: `regular` cho UI nhỏ (nav, bullet, nút), `duotone` cho icon minh họa lớn (dịch vụ, trụ cột), `fill` cho trạng thái active (sao, FAQ mở). Trong server component import từ `@phosphor-icons/react/dist/ssr`; client component import bình thường.
- Font: **Bricolage Grotesque cho tiêu đề (h1-h4) + Be Vietnam Pro cho nội dung**. Biến `--font-*` của next/font BẮT BUỘC gắn trên thẻ `<html>` (không phải `<body>`), vì `globals.css` khai báo `--font-display`/`--font-body` ở `:root` và tham chiếu tới chúng — đặt sai chỗ thì biến vô hiệu và cả site rơi về font hệ thống mà không báo lỗi.
- Animation: thư viện `motion` (`motion/react`). Reveal khi cuộn dùng component `Reveal` (`apps/web/components/reveal.tsx`). Kiểu chữ agency: kicker UPPERCASE nhỏ màu cam + heading rất đậm.
- Nội dung tiếng Việt.

## Kiến trúc nội dung (Puck CMS)

- Landing được ghép từ các section trong `apps/web/components/`: header, hero, marquee, stats, services, channel-network, pricing (tab Facebook / Bài đăng / TikTok + lưới thẻ cùng khung), process, impact, faq, contact (form cảm ơn sau khi gửi), footer, chat-widget. Testimonials mock và section ứng dụng (Features) đã gỡ. 7 ảnh Insights **không** lên landing. Hero không còn dòng badge dưới CTA; hệ sinh thái không còn dòng mô tả dưới tiêu đề.
- Block cơ bản kéo thả tự do trong `apps/web/components/blocks.tsx`: Heading, Text, Image (upload qua `/api/media`), Button, Quote, Video, Spacer, Divider, Columns (DropZone lồng nhau).
- Mỗi section nhận props có default — default là nguồn nội dung khi chưa có dữ liệu DB. Nhiều section có biến thể (`layout`, `background`, `reverse`, `paddingY` — helper trong `lib/section-utils.ts`).
- `apps/web/puck.config.tsx` đăng ký section + block theo categories cho editor kéo-thả Puck (`/admin/editor`). **Sửa/thêm section hoặc block phải cập nhật cả puck.config.tsx** (fields + defaultProps).
- Root fields: chọn font tiêu đề/nội dung (10 font việt hóa trong `lib/fonts.ts`, nạp ở `app/layout.tsx`) + SEO title/description (đọc bởi `generateMetadata` trong `app/page.tsx`).
- Landing (`apps/web/app/page.tsx`) fetch `GET {API}/api/content/home`: có dữ liệu → render bằng Puck `<Render>`; không có/API tắt → composition mặc định.
- Nội dung có lịch sử phiên bản (20 bản, khôi phục/reset trong `/admin/editor`).
- **Trợ lý chat**: `POST /api/chat/answer` ưu tiên AI thật (cấu hình tại `/admin/settings`) với ngữ cảnh kho kiến thức; AI tắt/lỗi thì khớp từ khóa (`/admin/knowledge`). Câu hỏi bảng giá được widget chặn: menu nhóm → `PackageDetailTable` thu gọn từ `lib/package-tables.ts` (`tablesForGroup`). Không nhét 7 ảnh Insights vào chat; link “Xem bài nổi bật” → `/bang-gia#hieu-qua`. Tag bấm nhanh vẫn hiện sau mỗi lượt.
- **Bảng giá**: nguồn duy nhất `apps/web/lib/pricing-data.ts`. UI chính là `pricing-board.tsx`: tab **Facebook / Bài đăng / TikTok / Khác**; mỗi gói một slide vuốt ngang. Gói nổi bật: badge **Phổ biến** góc phải, xoay chéo. Bấm “Chi tiết” mở `PackageDetailTable`: cột **Dịch vụ / Thông tin (gạch đầu dòng) / Thành tiền** — không ĐVT, không STT. Hash `#goi-facebook` `#bai-dang` `#goi-tiktok` `#dich-vu-khac`. **Không đăng file PDF**.
- **Bằng chứng năng lực**: `apps/web/lib/network-data.ts` — 6 kênh + 7 bài Insights (`public/network/insight-post-*.webp`). `top-posts.tsx` **chỉ** trên `/bang-gia`, hiện đủ 7 ngay (không “Xem thêm”). Ảnh/số sửa tại `/admin/insights` → Page slug `bang-gia`; fallback `TOP_POSTS`. ChannelNetwork + Stats sửa được từ Puck (ảnh kênh, audience, value/suffix/label). Ảnh CMS: `<img>` + `mediaUrl()`, không `next/image`. Dùng `formatCompact` (làm tròn xuống).
- Ảnh sửa được từ admin dùng thẻ `<img>` + `mediaUrl()` (không dùng `next/image`) vì domain upload không cố định — xem `components/blocks.tsx`.

## Quy ước tracking (analytics tự xây)

- Mỗi section gắn `data-section="<id>"` (hero, ve-riviu, dich-vu, bang-gia, tat-ca-goi, hieu-qua, quy-trinh, faq, lien-he). **Thêm section mới phải gắn data-section** để tracker đo reach/dwell. Cập nhật `SECTION_LABELS` / `SECTION_BLURBS` trong `lib/admin-types.ts`.
- Nút/CTA quan trọng gắn `data-track="<tên-sự-kiện>"`.
- Tracker client: `apps/web/components/tracker.tsx` (pageview, thời gian, section, click) gửi về `POST /api/track/*`. Không track các trang `/admin`.

## Lệnh chuẩn

```bash
pnpm dev                                          # chạy tất cả app (turbo)
pnpm --filter web dev                             # chỉ landing (3000)
pnpm --filter api dev                             # chỉ API (4000)
docker compose -f docker-compose.dev.yml up -d    # PostgreSQL cho dev
pnpm --filter api exec prisma migrate dev         # tạo/apply migration
pnpm exec turbo run build lint check-types        # kiểm tra toàn repo
docker compose up -d --build                      # production: web+api+postgres+nginx
```

- Env: `apps/api/.env` (DATABASE_URL, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD), `apps/web/.env.local` (NEXT_PUBLIC_API_URL). Mẫu ở `.env.example` từng nơi.
- Đăng nhập admin: `/admin/login`, tài khoản seed từ env của api.

## Quy trình BẮT BUỘC khi thay đổi code

1. **Trước khi làm**: đọc [STATUS.md](../../../STATUS.md) (repo root) để biết trạng thái từng module.
2. **Sau MỌI thay đổi**: cập nhật STATUS.md trong cùng lần làm việc — đổi trạng thái module bị ảnh hưởng (⬜/🚧/✅) và thêm một dòng changelog (ngày, ai, sửa gì, file chính).
3. Không commit khi chưa được yêu cầu. Khi build/lint fail phải sửa xong mới kết thúc.
