import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <Image
        src="/riviu-logo.png"
        alt="Riviu"
        width={250}
        height={128}
        className="h-10 w-auto"
      />
      <p className="mt-10 text-[7rem] leading-none font-black text-brand-500 md:text-[10rem]">
        404
      </p>
      <h1 className="mt-4 text-2xl font-black md:text-3xl">
        Trang này chưa có món gì cả
      </h1>
      <p className="mt-3 max-w-md text-ink-soft">
        Đường dẫn không tồn tại hoặc đã bị dời đi. Quay về trang chủ để tiếp
        tục khám phá nhé.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-brand-600"
      >
        <ArrowLeft size={16} weight="bold" />
        Về trang chủ
      </Link>
    </div>
  );
}
