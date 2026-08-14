/** URL công khai của website — đặt NEXT_PUBLIC_SITE_URL khi có domain riêng. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://riviu.vn"
).replace(/\/$/, "");

export const SITE_NAME = "Riviu";

export const SITE_TITLE = "Riviu – Ăn khắp nơi, chơi khắp chốn";

export const SITE_DESCRIPTION =
  "Riviu là công ty truyền thông F&B tại Đà Lạt — giúp thương hiệu chạm đúng thực khách qua hệ sinh thái fanpage, group và KOL đang vận hành.";
