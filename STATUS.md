# STATUS — Trạng thái dự án Riviu_Web

> **QUY TẮC BẮT BUỘC**: Bất kỳ ai (người hoặc AI agent) sửa code trong repo này đều **PHẢI cập nhật file này trong cùng lần thay đổi**: (1) đổi trạng thái module bị ảnh hưởng ở bảng dưới, (2) thêm một dòng vào Changelog. Đọc file này trước khi bắt đầu làm việc.

Ký hiệu: ⬜ chưa làm · 🚧 đang làm · ✅ hoàn thành

## Landing page (apps/web)

| Module | Trạng thái | Ghi chú |
|---|---|---|
| Design tokens trắng-cam phẳng (globals.css) | ✅ | Không gradient, icon Phosphor |
| Header | ✅ | Trắng, border khi cuộn |
| Hero | ✅ | Công ty truyền thông; đã bỏ dòng badge 6 fanpage / 17 KOL / Insights dưới CTA |
| Marquee | ✅ | Icon Phosphor, 2 dòng ngược chiều |
| Về Riviu + số liệu (stats) | ✅ | 3 trụ cột + 4 số; đã bỏ dòng chú thích dưới số |
| Dịch vụ truyền thông (services) | ✅ | (01)-(05) cùng layout; thẻ (05) không sticky; ảnh từng thẻ sửa được từ Puck |
| Nền tảng Riviu (features) | ✅ | Đã gỡ — Riviu chỉ là công ty truyền thông, không còn section app |
| Cảm nhận (testimonials) | ✅ | Đã gỡ khỏi trang chủ/Puck — quote giả không còn mặc định |
| FAQ | ✅ | Accordion; nội dung công ty truyền thông (không còn câu hỏi kiểu app) |
| Liên hệ (contact) | ✅ | POST `/api/contact` (SĐT bắt buộc) rồi hiện cảm ơn; lỗi thì báo gửi lại |
| Footer | ✅ | Pháp lý RIVICO |
| Chat widget Trợ lý Riviu | ✅ | Markdown in đậm/list; cuộn trong khung (Lenis prevent + min-h-0); log đủ lượt |
| Tracker client (pageview/section/click) | ✅ | Gửi kèm `path` để dashboard biết section thuộc trang nào |
| Render nội dung từ Puck/DB | ✅ | page.tsx fetch /api/content/home, fallback mặc định |
| SEO kỹ thuật | ✅ | metadata/OG/twitter, robots.ts, sitemap.ts, opengraph-image (font Việt), JSON-LD Organization+WebSite+FAQPage; SEO title/desc chỉnh được từ editor |
| Trang /bang-gia (toàn bộ Cost.pdf) | ✅ | Hero + 3 số → outcomes → so sánh 4 combo → tab + slide vuốt từng gói → kênh → 7 Insights → FAQ |
| Hệ sinh thái kênh (landing + /bang-gia) | ✅ | Ảnh/thẻ bọc link Facebook (`url` + field Puck); landing lưới ảnh, /bang-gia compact |
| Bài viết nổi bật (/bang-gia) | ✅ | Đủ 7 ảnh Insights một lần; không lặp trang chủ/chat; sửa ảnh/số tại `/admin/insights` (Page slug `bang-gia`) |
| Hiệu ứng nâng cao | ✅ | Lenis, scroll progress, hero mask/tilt/magnetic, velocity marquee, stack cards, carousel, clip-path, chat pop-in; con trỏ cam thương hiệu + hairline trắng (không mix-blend — hết xanh trên nền cam); prefers-reduced-motion |
| Ảnh thật (Unsplash, self-host) | ✅ | public/photos — hero card, services, phone mock, avatar |
| Section Quy trình hợp tác | ✅ | 4 bước, đường nối animate |
| Dải điểm nhấn nền đen (Impact) | ✅ | Statement + chữ outline velocity marquee |
| Menu mobile + scrollspy | ✅ | Hamburger + active section cam |
| Footer CTA lớn + chữ RIVIU khổng lồ | ✅ | |
| Trang 404 thương hiệu | ✅ | app/not-found.tsx |
| Hệ thống font việt hóa (10 font) | ✅ | lib/fonts.ts, chọn từ editor; mặc định Bricolage Grotesque (tiêu đề) + Be Vietnam Pro (nội dung), 8 font còn lại preload false |
| Section Bảng giá tóm tắt (landing) | ✅ | Tab + slide từng gói; ← → overlay trên thẻ; bảng luôn hiện; không nút Hỏi Riviu |
| Avatar bot logo R | ✅ | favicon.png trong header + bubble widget |

## Admin (apps/web/app/admin)

| Module | Trạng thái | Ghi chú |
|---|---|---|
| Login + guard | ✅ | Cookie httpOnly, guard trong (panel)/layout; form chỉ còn logo + 2 ô nhập |
| Layout sidebar | ✅ | Phosphor icons; badge số form/chat mới |
| Dashboard traffic (Recharts) | ✅ | Realtime, 30 ngày; hover dòng section hiện card “khách đang xem” (trang + anchor + mô tả) |
| Editor kéo-thả (Puck) | ✅ | Full-height; cột phải hiện font/màu; Publish → PUT /api/content/home |
| Bài nổi bật CMS (/admin/insights) | ✅ | Thêm/xóa/sửa bài; upload ảnh (không hiện đường dẫn file) → PUT /api/content/bang-gia |
| Block cơ bản (page builder) | ✅ | Heading, Text, Image, Button, Quote, Video, Spacer, Divider + Columns DropZone lồng nhau |
| Biến thể layout section | ✅ | Hero split/center, Services stack/list/grid, nền, đảo vị trí, paddingY |
| Section Hệ sinh thái kênh trong Puck | ✅ | Sửa kicker/tiêu đề/mô tả/nền + mảng kênh (ảnh bìa upload, tên, loại, follower, tick xanh) |
| Chọn font + SEO từ editor | ✅ | Root fields: font tiêu đề/nội dung + SEO title/desc |
| Lịch sử phiên bản + reset | ✅ | Panel trong editor — cần DB chạy để test |
| Upload ảnh (media) | ✅ | ImageField + proxy /admin/api/media — cần API chạy để test |
| Xem hội thoại AI (/admin/chat) | ✅ | Cả hàng bấm được; câu hỏi đầu + số tin; chi tiết `pre-wrap` đủ thread |
| Form liên hệ (/admin/leads) | ✅ | Tên, SĐT, email, nội dung, thời gian |
| Toast + badge inbox | ✅ | Poll `/api/admin/inbox` ~8s; toast góc phải; đánh dấu đã xem bằng localStorage |
| Kiến thức AI (/admin/knowledge) | ✅ | Thêm/sửa/xóa chủ đề + từ khóa; form mở khi cần, chip từ khóa |
| Cấu hình AI (/admin/settings) | ✅ | Bật/tắt, baseURL, model, API key (che), system prompt, nút test kết nối |
| Xuất & phân tích hội thoại | ✅ | Stats (tổng, % fallback), xuất CSV/JSON, badge nguồn AI/Kiến thức/Fallback |

## API (apps/api)

| Module | Trạng thái | Ghi chú |
|---|---|---|
| Prisma + PostgreSQL schema | ✅ | Prisma 6; SectionEvent `path`; ContactLead (migration 20260814080000) |
| AuthModule (JWT + seed admin) | ✅ | |
| ContentModule | ✅ | Kèm revisions (giữ 20 bản), restore, reset (DELETE) |
| MediaModule (upload ảnh) | ✅ | multer + JWT, serve /api/uploads, volume riviu_uploads trong compose |
| TrackModule | ✅ | ua-parser-js, geoip-lite; section event kèm path |
| AnalyticsModule | ✅ | summary/timeseries/devices/…/sections |
| ChatModule (log hội thoại) | ✅ | /chat/answer + /chat-log; content 16k; sessions trả firstUserMessage; /chat/stats + export |
| ContactModule (form liên hệ) | ✅ | POST /contact public; GET /contact/leads + GET /admin/inbox JWT |
| KnowledgeModule (kiến thức AI) | ✅ | CRUD JWT + seed 9 mục từ Cost.pdf (tự bổ sung mục còn thiếu theo tiêu đề khi khởi động) + buildContext cho AI |
| AiModule (AI thật) | ✅ | AiConfig (baseURL/model/apiKey/systemPrompt) chuẩn OpenAI-compatible, test kết nối, timeout 25s |
| Tích hợp AI thật (assistant-ui + AI SDK) | ⬜ | Tương lai — cần API key model |

## Hạ tầng

| Module | Trạng thái | Ghi chú |
|---|---|---|
| docker-compose.dev.yml (PostgreSQL dev) | ✅ | Postgres 17 local đã chạy (`docker compose -f docker-compose.dev.yml up -d`) |
| Dockerfile web + api | ✅ | turbo prune, Next standalone; web nhận ARG `NEXT_PUBLIC_SITE_URL` lúc build |
| nginx reverse proxy | ✅ | nginx/nginx.conf — / → web, /api → api; ACME webroot sẵn cho Let's Encrypt |
| docker-compose.yml production | ✅ | postgres + api + web + nginx + certbot; nginx container `127.0.0.1:18090`; TLS do host nginx; `SITE_URL` → build-arg web |
| Deploy VPS taskscatt.click | ✅ | Docker trên `192.168.1.40` (`/home/riviu/Riviu_Web`); host nginx proxy `127.0.0.1:18090`; NAT WAN 80/443 → LAN :80/:443 |
| HTTPS Let's Encrypt (taskscatt.click) | ✅ | Host certbot + nginx TLS trên `192.168.1.40:443` (Tailscale giữ `100.74.131.110:443`); HTTP 301 → HTTPS |

> **Dev local:** Docker Desktop + Postgres đã chạy. Tài khoản admin seed từ `apps/api/.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`, file gitignored). `pnpm dev` → web :3000, API :4000.

## Changelog

| Ngày | Ai | Thay đổi | File chính |
|---|---|---|---|
| 2026-08-13 | Agent (Cursor) | Khởi tạo Turborepo, 2 app Next.js + NestJS api, push GitHub | toàn repo |
| 2026-08-13 | Agent (Cursor) | Landing v1 kiểu trolypage (gradient) — đã bị thay | apps/web |
| 2026-08-13 | Agent (Cursor) | Tạo project skill + STATUS.md (Phase 0) | .cursor/skills/riviu-web, STATUS.md |
| 2026-08-13 | Agent (Cursor) | Phase 1: redesign landing kiểu agency — trắng-cam phẳng, Phosphor icons, services + contact + chat widget. Build/lint pass | apps/web |
| 2026-08-13 | Agent (Cursor) | Phase 2 backend: Prisma 6 + PostgreSQL schema, NestJS modules auth/content/track/analytics/chat, prefix /api, CORS, migration 0_init offline | apps/api |
| 2026-08-13 | Agent (Cursor) | Phase 2 admin: /admin login+guard cookie, dashboard Recharts, Puck editor kéo-thả, chat logs; tracker client + landing render từ DB (fallback) | apps/web |
| 2026-08-13 | Agent (Cursor) | Phase 3: Dockerfile web/api (turbo prune, standalone), nginx.conf, docker-compose(.dev).yml, .env.example, README hướng dẫn VPS | repo root |
| 2026-08-13 | Agent (Cursor) | Phát hiện máy dev thiếu WSL → Docker Desktop không khởi động được; đã ghi việc cần làm tay ở trên. Toàn bộ build/lint/check-types pass; smoke test web OK (200/200/307) | STATUS.md |
| 2026-08-13 | Agent (Cursor) | Wow effects + SEO: Lenis smooth scroll, hero mask reveal/tilt/magnetic, velocity marquee, services stack cards sticky, testimonials drag carousel, contact clip-path, chat pop-in; SEO đầy đủ metadata/OG image font Việt/robots/sitemap/JSON-LD. Sửa lỗi import faqDefaults từ client vào server (tách lib/faq-data.ts). Build + 13 check SEO pass | apps/web |
| 2026-08-13 | Agent (Cursor) | Sửa lỗi UI phát hiện qua QA Playwright: số ghost trong stack card dời vào giữa (hết lộ mảnh số cắt dở trên viền card ghim), nút chat bỏ animate opacity (hết trắng nửa chừng khi pop-in), ẩn chấm cam trang trí trên mobile (hết đè kicker) | apps/web/components services.tsx, chat-widget.tsx, hero.tsx |
| 2026-08-13 | Agent (Cursor) | Final polish: ảnh Unsplash thật (12 file), con trỏ tùy chỉnh, section Quy trình + Impact, menu mobile + scrollspy, footer CTA + RIVIU khổng lồ, 404. Page builder: 9 block cơ bản + Columns DropZone, biến thể layout section, categories + viewports, 10 font việt hóa + SEO chỉnh từ editor (root fields), upload ảnh (MediaModule), lịch sử phiên bản PageRevision + restore/reset. Build/lint pass, QA Playwright OK | apps/web, apps/api |
| 2026-08-13 | Agent (Cursor) | Sửa 3 lỗi UI từ ảnh người dùng: con trỏ chuyển white + mix-blend-difference (hết chìm trên nền cam/đen), dấu tiếng Việt chữ outline Impact hết bị cắt (leading 1.3 + padding), số count-up thu nhỏ hết tràn card. Thêm Kiến thức AI: KnowledgeItem model, CRUD, POST /chat/answer khớp từ khóa không dấu, media nhận PDF, trang /admin/knowledge, chat widget hiển thị file đính kèm | apps/web, apps/api |
| 2026-08-13 | Agent (Cursor) | Bảng giá + AI thật: toàn bộ Cost.pdf thành lib/pricing-data.ts + trang /bang-gia (7 nhóm, anchor nav, PDF) + section tóm tắt Puck trên landing + nav Bảng giá; avatar bot logo R; seed 8 mục kiến thức; AiModule cấu hình baseURL/model/apiKey (OpenAI-compatible) + /admin/settings + test kết nối; chat answer ưu tiên AI với ngữ cảnh kiến thức, source từng tin, /admin/chat có stats + xuất CSV/JSON + badge nguồn. Build/lint pass, QA OK | apps/web, apps/api |
| 2026-08-13 | Agent (Cursor) | Fix UI: mask TextReveal cắt dấu tiếng Việt ở hero (nới padding 4 chiều + y 160%) | apps/web/components/effects/text-reveal.tsx |
| 2026-08-13 | Agent (Cursor) | Bật Postgres Docker + migrate 0_init; seed admin từ apps/api/.env; form /admin/login nhận tài khoản không cần dạng email | apps/api, apps/web |
| 2026-08-13 | Agent (Cursor) | Bỏ nút tải PDF ở /bang-gia + section landing, thay bằng minh họa trực quan kiểu agency: 4 thẻ số liệu cam kết (tương tác/tiếp cận/view/KOL), thanh đo CommitMeter trên card combo + TikTok (số cam kết thêm vào pricing-data), thanh follower trong bảng KOL, nút OpenChatButton mở Trợ lý Riviu (widget lắng nghe sự kiện riviu:open-chat). Build/lint/types pass, QA screenshot OK | apps/web |
| 2026-08-13 | Agent (Cursor) | Bóc toàn bộ Cost.pdf (PyMuPDF): tách 6 ảnh bìa fanpage/group + 7 ảnh Facebook Insights vào public/network, OCR số liệu vào lib/network-data.ts. Thêm section "Hệ sinh thái kênh" (6 card kèm ảnh thật, 7,9 triệu follower) và "Hiệu quả thật" (7 case study, 88 triệu lượt hiển thị + dải ảnh Insights) vào /bang-gia; dải số liệu hero dùng số thật; formatCompact làm tròn xuống để không nói quá. Seed thêm 1 mục kiến thức hệ sinh thái cho chatbot; sửa lỗi seed kiến thức chỉ chạy khi bảng rỗng (giờ bổ sung mục còn thiếu theo tiêu đề nên DB cũ vẫn nhận kiến thức mới) | apps/web, apps/api |
| 2026-08-13 | Agent (Cursor) | **Sửa lỗi font nghiêm trọng**: biến `--font-*` của next/font gắn trên `<body>` trong khi `:root` (thẻ html) khai báo `--font-sans`/`--font-body`/`--font-display` tham chiếu tới chúng → biến vô hiệu, toàn site (cả dev lẫn production) chạy font hệ thống chứ không phải Be Vietnam Pro. Chuyển className font lên `<html>` theo đúng tài liệu Next 16. Đồng thời đổi mặc định sang cặp Bricolage Grotesque (tiêu đề) + Be Vietnam Pro (nội dung) | apps/web/app/layout.tsx, globals.css, lib/fonts.ts, puck.config.tsx |
| 2026-08-13 | Agent (Cursor) | Sửa con trỏ (bỏ mix-blend-difference, vòng trắng + hairline tối). Làm lại /bang-gia: 4 thẻ kết quả, bảng so sánh 4 gói, tab dịch vụ, bằng chứng compact (3 bài + Xem thêm). Docker: build-arg SITE_URL, certbot volume, cổng 80/443. Build/lint/types pass | apps/web, docker-compose.yml, nginx |
| 2026-08-13 | Agent (Cursor) | Đưa section Hệ sinh thái kênh lên trang chủ (giữa Dịch vụ và Bảng giá) và đăng ký vào Puck: props background/paddingY/kicker/title/sub + mảng kênh sửa được (ảnh bìa qua ImageField, tên, loại fanpage/group, số follower, tick xanh). Ảnh chuyển sang thẻ img + mediaUrl theo quy ước ảnh CMS | apps/web |
| 2026-08-13 | Agent (Cursor) | Deploy Docker lên máy chủ Ubuntu (`riviudalat`, 192.168.1.40): tarball qua SSH :2222 (không commit vì git identity chưa set). NAT ONT 80/443 → máy chủ. Let's Encrypt taskscatt.click, HTTPS trên LAN IP vì Tailscale chiếm :443. SITE_URL=https://taskscatt.click | docker-compose.yml, nginx, STATUS.md |
| 2026-08-14 | Agent (Cursor) | Con trỏ đổi sang cam thương hiệu (chấm + vòng `brand-500`, hairline trắng trong/ngoài để vẫn rõ trên nền cam và nền đen). Trang /admin/login bỏ tiêu đề "Đăng nhập quản trị" + phụ đề (giữ h1 `sr-only`) | apps/web/components/effects/cursor.tsx, apps/web/app/admin/login/page.tsx |
| 2026-08-14 | Agent (Cursor) | Sửa Gói Facebook tháng theo đúng Cost.pdf: 5.000.000đ/tháng TRỌN GÓI cho cả 2 hạng mục (8 bài tổng hợp/lịch trình + 12 check-in = 20 bài, ô thành tiền gộp) — trước đó hiển thị sai thành 2 giá riêng. Tách nhãn tab "Gói Facebook tháng" / "Gói TikTok"; thẻ GÓI (TikTok, duyệt bài) chuyển sang dải lướt ngang PackageCarousel (snap + thẻ kế lộ một phần + mũi tên + cú đẩy nhẹ khi mở). Bot chat: bỏ hẳn nút "Tải tài liệu đính kèm" (PDF) khỏi widget, seed kiến thức bỏ attachment + sửa giá gói tháng, dẫn về /bang-gia. Đồng bộ mật khẩu admin theo apps/api/.env local | apps/web (pricing-data, pricing-tabs, chat-widget), apps/api/src/knowledge/knowledge.seed.ts |
| 2026-08-14 | Agent (Cursor) | Sửa API dev local crash (P1000): DB dev khởi tạo bằng `riviu_dev_password` nhưng apps/api/.env dùng `riviu123` — ALTER USER về `riviu123` + sync docker-compose.dev.yml; xóa 9 mục kiến thức cũ (còn PDF) để seed mới nạp lại. Login local OK với mật khẩu trong .env | docker-compose.dev.yml, DB dev |
| 2026-08-14 | Agent (Cursor) | Tách 4 nhóm GÓI thành section độc lập trên /bang-gia (Facebook tháng, TikTok, duyệt bài, xây kênh) + carousel ngang. Gỡ mock trang chủ: hero không còn card review giả, stats dùng số kênh/Insights thật, bỏ Testimonials khỏi Puck/trang chủ, sanitize data đã publish. Admin: knowledge không upload PDF; dashboard hover dòng section hiện trang + #anchor + mô tả đoạn khách xem. Tracker/API ghi `path` trên SectionEvent | apps/web, apps/api |
| 2026-08-14 | Agent (Cursor) | Follow-up audit: chat offline bỏ giọng “đang được hoàn thiện”; `data-section` /bang-gia chuyển từ `<main>` xuống hero để không đếm trùng dwell với các section con | apps/web/components/chat-widget.tsx, apps/web/app/bang-gia/page.tsx |
| 2026-08-14 | Agent (Cursor) | Form liên hệ: placeholder Họ và tên / Email, bỏ dòng mở trình email. Chat: tag còn sau mỗi lượt; “Về bảng giá” hiện menu từng bảng Cost.pdf (combo, tháng, TikTok, duyệt bài, xây kênh, lẻ, KOL, phụ thu) thay vì dump một khối | apps/web/components/contact.tsx, chat-widget.tsx, chat-pricing-cards.tsx, lib/chat-pricing.ts |
| 2026-08-14 | Agent (Cursor) | Gỡ app: xóa section Nền tảng/Features, nav Nền tảng, CTA hero trỏ bảng giá. Bỏ 4 dòng chú thích dưới số liệu và cụm Nguồn Insights + badge Bằng chứng công khai. Positioning: công ty truyền thông | apps/web |
| 2026-08-14 | Agent (Cursor) | Bảng chi tiết Cost.pdf: một carousel lướt hết gói (không cột STT); 7 ảnh Insights chỉ trên /bang-gia; thẻ dịch vụ (05) đứng yên; FAQ viết lại; admin sửa ảnh/số (Puck + /admin/insights); chat hiện bảng thu gọn | apps/web |
| 2026-08-14 | Agent (Cursor) | Sửa carousel bảng giá: slide khóa 88% + min-w-0/overflow-hidden (bảng không đè slide kế), bỏ motion y lệch hàng, luôn hiện mũi tên | apps/web/components/package-carousel.tsx |
| 2026-08-14 | Agent (Cursor) | Carousel không còn stretch theo bảng dài nhất — mỗi thẻ cao đúng nội dung (hết khoảng trắng dưới Thành tiền) | apps/web/components/package-carousel.tsx, package-detail-table.tsx |
| 2026-08-14 | Agent (Cursor) | Carousel bảng giá: mỗi lần một bảng đủ cột (100% rộng), bộ đếm 1/N + mũi tên cam — hết cắt nửa bảng kế | apps/web/components/package-carousel.tsx |
| 2026-08-14 | Agent (Cursor) | Hết khoảng trắng dư dưới bảng: chiều cao dải lướt theo đúng slide đang xem, không lấy bảng KOL/lẻ | apps/web/components/package-carousel.tsx |
| 2026-08-14 | Agent (Cursor) | Tách bảng giá: gói Facebook đi cùng, bài đăng đi cùng, TikTok riêng; mỗi nhóm tiêu đề TextReveal + vòng parallax như hero | apps/web/components/package-groups.tsx |
| 2026-08-14 | Agent (Cursor) | Bảng giá kiểu Trolypage: tab Facebook / Bài đăng / TikTok / Khác + lưới thẻ giá lớn; bảng chi tiết chỉ mở khi bấm Xem chi tiết | apps/web/components/pricing-board.tsx |
| 2026-08-14 | Agent (Cursor) | Gỡ badge hero + mô tả kênh + intro bảng giá; subtitle dịch vụ 1 hàng; thẻ giá cùng khung; form liên hệ hiện cảm ơn / gọi lại | apps/web/components |
| 2026-08-14 | Agent (Cursor) | Bảng giá: mỗi gói một slide vuốt ngang (hết lưới 4 cột); Chi tiết không còn vỡ layout | apps/web/components/pricing-board.tsx |
| 2026-08-14 | Agent (Cursor) | Badge Phổ biến góc phải xoay chéo; bảng chi tiết 3 cột (Dịch vụ / Thông tin gạch đầu dòng / Thành tiền), bỏ ĐVT | apps/web/components/package-detail-table.tsx, pricing-board.tsx |
| 2026-08-14 | Agent (Cursor) | Bỏ nút Thu gọn/Chi tiết — bảng giá chi tiết luôn hiện dưới từng slide gói | apps/web/components/pricing-board.tsx |
| 2026-08-14 | Agent (Cursor) | Nav overlay trên thẻ giá; bỏ Hỏi Riviu; link Facebook kênh; lưu form ContactLead + /admin/leads; chat log đủ (chào + bảng text, 16k); toast/badge inbox admin | apps/web, apps/api |
| 2026-08-14 | Agent (Cursor) | Admin Insights: thêm/xóa bài, ẩn path `/network/…`; Knowledge bỏ note PDF, form gọn hơn; gỡ note “Cần API + database” | apps/web/components/admin, leads, chat |
| 2026-08-14 | Agent (Cursor) | Chat: render **in đậm** + danh sách; lăn chuột trong khung hội thoại (data-lenis-prevent, min-h-0) | apps/web/components/chat-widget.tsx, chat-markdown.tsx |
| 2026-08-14 | Agent (Cursor) | Editor Puck full-height: hết cắt cột phải đổi font/màu | apps/web/components/admin/puck-editor.tsx, admin-shell.tsx |
