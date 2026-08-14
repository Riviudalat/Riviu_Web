import {
  Camera,
  ChartLineUp,
  MegaphoneSimple,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./reveal";

const OUTCOMES = [
  {
    icon: MegaphoneSimple,
    title: "Tiếp cận đúng tệp khách Đà Lạt",
    text: "Bài của quán xuất hiện trên 6 fanpage và group Riviu đang vận hành — gần 8 triệu người theo dõi và thành viên, tập trung ăn uống - du lịch.",
  },
  {
    icon: Camera,
    title: "Nội dung do Riviu sản xuất trọn gói",
    text: "Chụp, viết, đăng và reup trên hệ sinh thái. Bạn không cần tự làm content hay thuê ekip riêng.",
  },
  {
    icon: SealCheck,
    title: "Cam kết số đo được",
    text: "Mỗi gói ghi rõ số tương tác và lượt tiếp cận tối thiểu. Không đạt thì biết ngay, không phải đoán.",
  },
  {
    icon: ChartLineUp,
    title: "Báo cáo minh bạch sau chiến dịch",
    text: "Số liệu lấy từ Facebook Insights của bài thật — cùng kiểu dữ liệu bạn thấy ở các case study bên dưới.",
  },
];

/** Trả lời trực tiếp: khách hàng nhận được gì khi mua gói. */
export function PricingOutcomes() {
  return (
    <section
      id="ban-nhan-duoc-gi"
      data-section="ban-nhan-duoc-gi"
      className="scroll-mt-24 py-12 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.25em] text-brand-600 uppercase">
            Bạn nhận được gì
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-black tracking-tight text-balance md:text-4xl">
            Mua gói không phải mua bài — mua chỗ đứng trước khách Đà Lạt
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {OUTCOMES.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <article className="h-full rounded-3xl border border-black/10 bg-white p-6 transition-colors duration-300 hover:border-brand-500">
                <item.icon
                  size={32}
                  weight="duotone"
                  className="text-brand-500"
                />
                <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
