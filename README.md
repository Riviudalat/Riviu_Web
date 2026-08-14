# Riviu Web

Website giới thiệu công ty **Riviu** (Công ty TNHH RIVICO) — nền tảng review ẩm thực & đời sống kiêm công ty truyền thông. Monorepo Turborepo.

> Quy tắc làm việc: đọc [STATUS.md](STATUS.md) trước khi sửa code, và cập nhật nó sau mỗi thay đổi. Agent AI xem thêm skill trong `.cursor/skills/riviu-web/`.

## Cấu trúc

| Thư mục | Nội dung |
|---|---|
| `apps/web` | Next.js 16 — landing page + trang quản trị `/admin` (port 3000) |
| `apps/api` | NestJS 11 + Prisma + PostgreSQL — content, tracking, analytics, chat log, auth (port 4000, prefix `/api`) |
| `packages/*` | Config TypeScript/ESLint và UI dùng chung |
| `nginx/` | Cấu hình reverse proxy cho production |

## Chạy dev

```bash
pnpm install

# 1. PostgreSQL (cần Docker Desktop đang chạy)
docker compose -f docker-compose.dev.yml up -d

# 2. Tạo bảng + tài khoản admin (lần đầu)
pnpm --filter api exec prisma migrate dev

# 3. Chạy app
pnpm dev                    # tất cả, hoặc:
pnpm --filter web dev       # chỉ landing  http://localhost:3000
pnpm --filter api dev       # chỉ API      http://localhost:4000/api/health
```

- Env mẫu: `apps/api/.env.example`, `apps/web/.env.example` (dev đã có sẵn `.env`/`.env.local`).
- Đăng nhập quản trị: http://localhost:3000/admin/login — tài khoản theo `ADMIN_EMAIL`/`ADMIN_PASSWORD` trong `apps/api/.env`.

## Trang quản trị `/admin`

- **Dashboard** — traffic realtime, khách/lượt xem 30 ngày, thiết bị, trình duyệt, quốc gia, nguồn truy cập và **xếp hạng section được quan tâm nhất** (đo bằng thời gian xem + click từng section).
- **Chỉnh sửa nội dung** — editor kéo-thả [Puck](https://puckeditor.com): sắp xếp section, sửa chữ, thêm/xóa, bấm Publish là trang chủ cập nhật.
- **Hội thoại AI** — xem lại toàn bộ tin nhắn khách gửi qua chat widget.

## Kiểm tra chất lượng

```bash
pnpm exec turbo run build lint check-types
```

## Production (Docker + nginx)

```bash
cp .env.example .env        # POSTGRES_PASSWORD, JWT_SECRET, ADMIN_*, SITE_URL
docker compose up -d --build
# → http://localhost (nginx: "/" vào web, "/api" vào NestJS)
# SITE_URL được nhúng vào Next lúc build (canonical/sitemap/OG) qua build-arg.
```

## Deploy VPS (Ubuntu)

1. Cài Docker: `curl -fsSL https://get.docker.com | sh`
2. Clone repo và tạo env:

```bash
git clone https://github.com/Riviudalat/Riviu_Web.git && cd Riviu_Web
cp .env.example .env && nano .env   # đặt mật khẩu mạnh
```

3. Chạy: `docker compose up -d --build`
4. Trỏ DNS domain (bản ghi A) về IP của VPS — web chạy ở port 80.
5. Khi có domain, thêm HTTPS bằng certbot (cấp chứng chỉ Let's Encrypt rồi cập nhật `nginx/nginx.conf` listen 443 + đường dẫn chứng chỉ).

Cập nhật phiên bản mới trên VPS:

```bash
git pull && docker compose up -d --build
```

## Kế hoạch AI chat

Chat widget hiện trả lời placeholder và lưu toàn bộ hội thoại vào DB. Khi tích hợp AI thật: dùng [assistant-ui](https://github.com/assistant-ui/assistant-ui) + [Vercel AI SDK](https://github.com/vercel/ai), thêm endpoint stream trong `apps/api` (cần API key của nhà cung cấp model).
