import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 pt-14 md:px-6 md:pt-16">
        <a
          href="mailto:contact@riviu.vn?subject=%5BRiviu%5D%20H%E1%BB%A3p%20t%C3%A1c%20truy%E1%BB%81n%20th%C3%B4ng"
          data-track="footer-cta"
          className="group flex items-start justify-between gap-6 border-b border-white/10 pb-10 transition-colors hover:text-brand-300 md:pb-14"
        >
          <span className="max-w-2xl text-2xl leading-tight font-black tracking-tight text-balance md:text-4xl">
            Cùng kể câu chuyện thương hiệu trên hệ sinh thái gần 8 triệu người
            theo dõi và thành viên.
          </span>
          <ArrowUpRight
            size={40}
            weight="bold"
            className="mt-1 shrink-0 text-brand-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </a>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Image
              src="/riviu-logo.png"
              alt="Riviu"
              width={250}
              height={128}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Mạng xã hội chia sẻ trải nghiệm ăn uống, du lịch và đời sống —
              đồng thời là đối tác truyền thông của các thương hiệu F&amp;B.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold tracking-wider text-white/40 uppercase">
              Riviu
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="#ve-riviu"
                  className="text-white/80 transition-colors hover:text-brand-300"
                >
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a
                  href="#dich-vu"
                  className="text-white/80 transition-colors hover:text-brand-300"
                >
                  Dịch vụ truyền thông
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-white/80 transition-colors hover:text-brand-300"
                >
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a
                  href="https://riviu.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition-colors hover:text-brand-300"
                >
                  riviu.vn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-bold tracking-wider text-white/40 uppercase">
              Liên hệ
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>372-374 Trần Hưng Đạo, Phường 2, Quận 5, TP.HCM</li>
              <li>
                <a
                  href="tel:02862725439"
                  className="transition-colors hover:text-brand-300"
                >
                  028 62725439
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@riviu.vn"
                  className="transition-colors hover:text-brand-300"
                >
                  contact@riviu.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-white/45">
            © {new Date().getFullYear()} Công Ty TNHH RIVICO · Địa chỉ:
            372-374 Trần Hưng Đạo, Phường 2, Quận 5, TP. Hồ Chí Minh · Mã số
            thuế: 0316141166 · Giấy phép thiết lập MXH số 528/GP-BTTTT, ký
            ngày 17/11/2020, cấp bởi Bộ Thông tin và Truyền thông · Người chịu
            trách nhiệm nội dung: Phạm Gia Quốc Thống.
          </p>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none -mb-[4vw] text-center text-[19vw] leading-[0.78] font-black tracking-tight text-white/[0.04] select-none"
      >
        RIVIU
      </div>
    </footer>
  );
}
