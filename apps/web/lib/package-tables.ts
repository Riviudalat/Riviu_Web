import {
  APPROVAL_PACKAGES,
  CHANNEL_PACKAGES,
  FACEBOOK_COMBOS,
  formatVnd,
  MONTHLY_PACKAGE,
  SINGLE_SERVICES,
  SURCHARGES,
  TIKTOK_KOLS,
  TIKTOK_PACKAGES,
  type ComboPackage,
} from "./pricing-data";

export type DetailRow = {
  service: string;
  detail: string;
  unit: string;
  unitPrice: string;
  quantity: string;
  total: string;
};

export type DetailTableModel = {
  id: string;
  title: string;
  highlight?: boolean;
  note?: string;
  rows: DetailRow[];
  totalBefore?: string;
  discount?: string;
  totalAfter?: string;
};

function money(value: number | string | undefined): string {
  if (value === undefined) return "—";
  return typeof value === "number" ? formatVnd(value) : value;
}

function comboToTable(combo: ComboPackage): DetailTableModel {
  return {
    id: `combo-${combo.name.toLowerCase().replace(/\s+/g, "-")}`,
    title: `Bảng giá ${combo.name}`,
    highlight: combo.highlight,
    note: combo.commitment,
    rows: combo.items.map((item) => {
      const hasLine =
        typeof item.unitPrice === "number" && typeof item.quantity === "number";
      return {
        service: item.service,
        detail: item.detail,
        unit: item.unit ?? (hasLine ? "Bài viết" : "—"),
        unitPrice: money(item.unitPrice),
        quantity: item.quantity != null ? String(item.quantity) : "—",
        total: hasLine ? formatVnd(item.unitPrice! * item.quantity!) : "—",
      };
    }),
    totalBefore: formatVnd(combo.totalBefore),
    discount: formatVnd(combo.discount),
    totalAfter: formatVnd(combo.totalAfter),
  };
}

export function tablesForGroup(
  group:
    | "facebook-combo"
    | "facebook-month"
    | "tiktok"
    | "approval"
    | "channel"
    | "single"
    | "kol"
    | "surcharge",
): DetailTableModel[] {
  if (group === "facebook-combo") return FACEBOOK_COMBOS.map(comboToTable);
  if (group === "facebook-month") {
    return [
      {
        id: "facebook-month",
        title: "Bảng giá Gói Facebook tháng",
        note: MONTHLY_PACKAGE.note,
        rows: MONTHLY_PACKAGE.items.map((item) => ({
          service: item.name,
          detail: item.detail,
          unit: "Tháng",
          unitPrice: "—",
          quantity: item.total,
          total: "Trọn gói",
        })),
        totalAfter: `${formatVnd(MONTHLY_PACKAGE.price)}/${MONTHLY_PACKAGE.unit}`,
      },
    ];
  }
  if (group === "tiktok") {
    return TIKTOK_PACKAGES.map((pkg) => ({
      id: `tiktok-${pkg.name}`,
      title: `Bảng giá ${pkg.name}`,
      note: pkg.commitment,
      rows: [
        {
          service: "Nội dung TikTok",
          detail: pkg.extra
            ? `${pkg.contents} nội dung + ${pkg.extra}`
            : `${pkg.contents} nội dung (AI, lồng ghép tự nhiên)`,
          unit: "Tháng",
          unitPrice: formatVnd(pkg.price),
          quantity: "1",
          total: formatVnd(pkg.price),
        },
      ],
      totalAfter: `${formatVnd(pkg.price)}/tháng`,
    }));
  }
  if (group === "approval") {
    return APPROVAL_PACKAGES.map((pkg) => ({
      id: `approval-${pkg.posts}`,
      title: `Bảng giá ${pkg.name}`,
      note: pkg.detail,
      rows: [
        {
          service: `${pkg.posts} bài / tháng`,
          detail: pkg.detail,
          unit: "Tháng",
          unitPrice: formatVnd(pkg.price1Month),
          quantity: "1",
          total: formatVnd(pkg.price1Month),
        },
        {
          service: `${pkg.posts} bài / 3 tháng`,
          detail: pkg.detail,
          unit: "3 tháng",
          unitPrice: formatVnd(pkg.price3Months),
          quantity: "1",
          total: formatVnd(pkg.price3Months),
        },
      ],
    }));
  }
  if (group === "channel") {
    return CHANNEL_PACKAGES.map((pkg) => ({
      id: `channel-${pkg.name}`,
      title: `Bảng giá ${pkg.name}`,
      rows: [
        {
          service: pkg.name,
          detail: pkg.detail,
          unit: pkg.unit ?? "Tháng",
          unitPrice: money(pkg.price),
          quantity: "1",
          total: money(pkg.price),
        },
      ],
      totalAfter:
        typeof pkg.price === "number"
          ? `${formatVnd(pkg.price)}/${pkg.unit ?? "tháng"}`
          : pkg.price,
    }));
  }
  if (group === "single") {
    return [
      {
        id: "single",
        title: "Bảng giá dịch vụ lẻ",
        rows: SINGLE_SERVICES.map((item) => ({
          service: item.name,
          detail: item.detail,
          unit: item.unit ?? "—",
          unitPrice: money(item.price),
          quantity: "1",
          total: money(item.price),
        })),
      },
    ];
  }
  if (group === "kol") {
    return [
      {
        id: "kol",
        title: "Bảng giá KOL TikTok",
        rows: TIKTOK_KOLS.map((kol) => ({
          service: kol.channel,
          detail: `${kol.followers} follower · ${kol.style} · ${kol.format}`,
          unit: "Video",
          unitPrice: formatVnd(kol.price),
          quantity: "1",
          total: formatVnd(kol.price),
        })),
      },
    ];
  }
  return [
    {
      id: "surcharge",
      title: "Bảng giá phụ thu",
      rows: SURCHARGES.map((item) => ({
        service: item.name,
        detail: item.detail,
        unit: "—",
        unitPrice: money(item.price),
        quantity: "1",
        total: money(item.price),
      })),
    },
  ];
}

export type PackageGroup = {
  id: string;
  kicker: string;
  title: string;
  titleAccent: string;
  sub: string;
  tables: DetailTableModel[];
};

/** Facebook / bài đăng / TikTok tách riêng — không trộn một dải. */
export function packageGroups(): PackageGroup[] {
  return [
    {
      id: "goi-facebook",
      kicker: "Facebook",
      title: "Các gói combo",
      titleAccent: "đi cùng nhau.",
      sub: "Bốn gói Facebook — review, check-in, fanpage. Lướt trong nhóm này thôi.",
      tables: tablesForGroup("facebook-combo"),
    },
    {
      id: "bai-dang",
      kicker: "Bài đăng",
      title: "Hiện diện đều",
      titleAccent: "theo tháng.",
      sub: "Gói Facebook tháng 20 bài và các gói duyệt bài — cùng nhóm bài đăng.",
      tables: [
        ...tablesForGroup("facebook-month"),
        ...tablesForGroup("approval"),
      ],
    },
    {
      id: "goi-tiktok",
      kicker: "TikTok",
      title: "Phủ sóng ngắn",
      titleAccent: "riêng biệt.",
      sub: "Bốn mức TikTok theo view — không gộp với bảng Facebook.",
      tables: tablesForGroup("tiktok"),
    },
    {
      id: "goi-xay-kenh",
      kicker: "Xây kênh",
      title: "Kênh riêng",
      titleAccent: "cho quán.",
      sub: "Xây TikTok hoặc Fanpage — hai bảng, lướt trong nhóm này.",
      tables: tablesForGroup("channel"),
    },
    {
      id: "dich-vu-khac",
      kicker: "Bổ sung",
      title: "Lẻ, KOL",
      titleAccent: "và phụ thu.",
      sub: "Mua từng hạng mục, booking KOL TikTok, hoặc phụ thu ngoài gói.",
      tables: [
        ...tablesForGroup("single"),
        ...tablesForGroup("kol"),
        ...tablesForGroup("surcharge"),
      ],
    },
  ];
}

export function allPackageTables(): DetailTableModel[] {
  return packageGroups().flatMap((group) => group.tables);
}
