import type { Config, Data } from "@puckeditor/core";
import type { CSSProperties } from "react";
import { ImageField } from "./components/admin/image-field";
import {
  ButtonBlock,
  buttonBlockDefaults,
  ColumnsBlock,
  columnsBlockDefaults,
  DividerBlock,
  dividerBlockDefaults,
  HeadingBlock,
  headingBlockDefaults,
  ImageBlock,
  imageBlockDefaults,
  QuoteBlock,
  quoteBlockDefaults,
  SpacerBlock,
  spacerBlockDefaults,
  TextBlock,
  textBlockDefaults,
  VideoBlock,
  videoBlockDefaults,
  type ButtonBlockProps,
  type ColumnsBlockProps,
  type DividerBlockProps,
  type HeadingBlockProps,
  type ImageBlockProps,
  type QuoteBlockProps,
  type SpacerBlockProps,
  type TextBlockProps,
  type VideoBlockProps,
} from "./components/blocks";
import {
  ChannelNetwork,
  channelNetworkDefaults,
  type ChannelNetworkProps,
} from "./components/channel-network";
import {
  Contact,
  contactDefaults,
  type ContactProps,
} from "./components/contact";
import { Faq, faqDefaults, type FaqProps } from "./components/faq";
import { Hero, heroDefaults, type HeroProps } from "./components/hero";
import { SECTION_ICON_OPTIONS } from "./components/icons";
import {
  Impact,
  impactDefaults,
  type ImpactProps,
} from "./components/impact";
import {
  Marquee,
  marqueeDefaults,
  type MarqueeProps,
} from "./components/marquee";
import {
  Pricing,
  pricingDefaults,
  type PricingProps,
} from "./components/pricing";
import {
  Process,
  processDefaults,
  type ProcessProps,
} from "./components/process";
import {
  Services,
  servicesDefaults,
  type ServicesProps,
} from "./components/services";
import { Stats, statsDefaults, type StatsProps } from "./components/stats";
import { FONT_OPTIONS, fontVar } from "./lib/fonts";
import { PADDING_OPTIONS } from "./lib/section-utils";

const iconField = {
  type: "select" as const,
  label: "Icon",
  options: SECTION_ICON_OPTIONS,
};

const paddingField = {
  type: "select" as const,
  label: "Độ rộng trên-dưới",
  options: PADDING_OPTIONS,
};

const alignField = {
  type: "radio" as const,
  label: "Căn",
  options: [
    { label: "Trái", value: "left" },
    { label: "Giữa", value: "center" },
  ],
};

type PuckComponents = {
  Hero: Required<HeroProps>;
  Marquee: Required<MarqueeProps>;
  Stats: Required<StatsProps>;
  Services: Required<ServicesProps>;
  ChannelNetwork: Required<ChannelNetworkProps>;
  Pricing: Required<PricingProps>;
  Process: Required<ProcessProps>;
  Impact: Required<ImpactProps>;
  Faq: Required<FaqProps>;
  Contact: Required<ContactProps>;
  HeadingBlock: Required<HeadingBlockProps>;
  TextBlock: Required<TextBlockProps>;
  ImageBlock: Required<ImageBlockProps>;
  ButtonBlock: Required<ButtonBlockProps>;
  QuoteBlock: Required<QuoteBlockProps>;
  VideoBlock: Required<VideoBlockProps>;
  SpacerBlock: Required<SpacerBlockProps>;
  DividerBlock: DividerBlockProps;
  ColumnsBlock: Required<ColumnsBlockProps>;
};

type RootProps = {
  displayFont?: string;
  bodyFont?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export const rootDefaults: Required<RootProps> = {
  displayFont: "bricolage",
  bodyFont: "be-vietnam",
  seoTitle: "",
  seoDescription: "",
};

/**
 * Đăng ký section + block cho Puck editor.
 * Thêm/sửa section trong components/ thì phải cập nhật config này.
 */
export const puckConfig: Config<PuckComponents, RootProps> = {
  categories: {
    sections: {
      title: "Section Riviu",
      components: [
        "Hero",
        "Marquee",
        "Stats",
        "Services",
        "ChannelNetwork",
        "Pricing",
        "Process",
        "Impact",
        "Faq",
        "Contact",
      ],
    },
    basic: {
      title: "Block cơ bản",
      components: [
        "HeadingBlock",
        "TextBlock",
        "ImageBlock",
        "ButtonBlock",
        "QuoteBlock",
        "VideoBlock",
        "SpacerBlock",
        "DividerBlock",
      ],
    },
    layout: {
      title: "Bố cục",
      components: ["ColumnsBlock"],
    },
  },
  root: {
    fields: {
      displayFont: {
        type: "select",
        label: "Font tiêu đề (việt hóa)",
        options: FONT_OPTIONS,
      },
      bodyFont: {
        type: "select",
        label: "Font nội dung (việt hóa)",
        options: FONT_OPTIONS,
      },
      seoTitle: { type: "text", label: "SEO title (trống = mặc định)" },
      seoDescription: {
        type: "textarea",
        label: "SEO description (trống = mặc định)",
      },
    },
    defaultProps: rootDefaults,
    render: ({ children, displayFont, bodyFont }) => (
      <div
        style={
          {
            "--font-display": fontVar(displayFont),
            "--font-body": fontVar(bodyFont),
            fontFamily: "var(--font-body), ui-sans-serif, sans-serif",
          } as CSSProperties
        }
      >
        {children}
      </div>
    ),
  },
  components: {
    Hero: {
      label: "Hero",
      defaultProps: heroDefaults,
      fields: {
        layout: {
          type: "radio",
          label: "Bố cục",
          options: [
            { label: "2 cột + card", value: "split" },
            { label: "Căn giữa", value: "center" },
          ],
        },
        showCard: {
          type: "radio",
          label: "Hiện thẻ số liệu",
          options: [
            { label: "Có", value: "yes" },
            { label: "Không", value: "no" },
          ],
        },
        kicker: { type: "text", label: "Kicker" },
        titleLine: { type: "text", label: "Tiêu đề" },
        titleAccent: { type: "text", label: "Tiêu đề màu cam" },
        description: { type: "textarea", label: "Mô tả" },
        primaryCta: { type: "text", label: "Nút chính" },
        secondaryCta: { type: "text", label: "Nút phụ" },
        badges: {
          type: "array",
          label: "Số liệu nổi bật",
          arrayFields: { text: { type: "text", label: "Nội dung" } },
        },
      },
      render: (props) => <Hero {...props} />,
    },
    Marquee: {
      label: "Dải chủ đề chạy",
      defaultProps: marqueeDefaults,
      fields: {
        topics: {
          type: "array",
          label: "Dòng 1 — chủ đề",
          arrayFields: { label: { type: "text", label: "Tên" } },
        },
        places: {
          type: "array",
          label: "Dòng 2 — địa điểm",
          arrayFields: { label: { type: "text", label: "Tên" } },
        },
      },
      render: (props) => <Marquee {...props} />,
    },
    Stats: {
      label: "Về Riviu + Số liệu",
      defaultProps: statsDefaults,
      fields: {
        background: {
          type: "radio",
          label: "Nền",
          options: [
            { label: "Trắng", value: "white" },
            { label: "Kem", value: "cream" },
          ],
        },
        paddingY: paddingField,
        kicker: { type: "text", label: "Kicker" },
        title: { type: "text", label: "Tiêu đề" },
        sub: { type: "textarea", label: "Mô tả" },
        pillars: {
          type: "array",
          label: "3 trụ cột",
          arrayFields: {
            icon: iconField,
            title: { type: "text", label: "Tiêu đề" },
            text: { type: "textarea", label: "Nội dung" },
          },
        },
        stats: {
          type: "array",
          label: "Số liệu",
          arrayFields: {
            value: { type: "number", label: "Giá trị số (ví dụ 7900000)" },
            suffix: { type: "text", label: "Hậu tố (+, %, triệu)" },
            label: { type: "text", label: "Nhãn hiển thị dưới số" },
            note: { type: "text", label: "Ghi chú (thường để trống)" },
          },
        },
      },
      render: (props) => <Stats {...props} />,
    },
    Services: {
      label: "Dịch vụ truyền thông",
      defaultProps: servicesDefaults,
      fields: {
        layout: {
          type: "radio",
          label: "Bố cục",
          options: [
            { label: "Card xếp chồng", value: "stack" },
            { label: "Danh sách", value: "list" },
            { label: "Lưới 2 cột", value: "grid" },
          ],
        },
        paddingY: paddingField,
        kicker: { type: "text", label: "Kicker" },
        title: { type: "text", label: "Tiêu đề" },
        sub: { type: "textarea", label: "Mô tả" },
        contactEmail: { type: "text", label: "Email liên hệ" },
        items: {
          type: "array",
          label: "Danh sách dịch vụ",
          arrayFields: {
            icon: iconField,
            title: { type: "text", label: "Tên dịch vụ" },
            description: { type: "textarea", label: "Mô tả" },
            bullets: {
              type: "textarea",
              label: "Gạch đầu dòng (mỗi dòng một ý)",
            },
            image: {
              type: "custom",
              label: "Ảnh bên phải thẻ",
              render: ({ value, onChange }) => (
                <ImageField value={value} onChange={onChange} />
              ),
            },
            imageAlt: { type: "text", label: "Alt ảnh" },
          },
        },
      },
      render: (props) => <Services {...props} />,
    },
    ChannelNetwork: {
      label: "Hệ sinh thái kênh",
      defaultProps: channelNetworkDefaults,
      fields: {
        background: {
          type: "radio",
          label: "Nền",
          options: [
            { label: "Trắng", value: "white" },
            { label: "Kem", value: "cream" },
          ],
        },
        paddingY: paddingField,
        layout: {
          type: "radio",
          label: "Kiểu hiển thị",
          options: [
            { label: "Lưới ảnh bìa", value: "grid" },
            { label: "Gọn (logo + số)", value: "compact" },
          ],
        },
        kicker: { type: "text", label: "Kicker" },
        title: { type: "text", label: "Tiêu đề" },
        sub: { type: "textarea", label: "Mô tả" },
        channels: {
          type: "array",
          label: "Danh sách kênh",
          arrayFields: {
            image: {
              type: "custom",
              label: "Ảnh bìa kênh",
              render: ({ value, onChange }) => (
                <ImageField value={value} onChange={onChange} />
              ),
            },
            name: { type: "text", label: "Tên kênh" },
            type: {
              type: "radio",
              label: "Loại",
              options: [
                { label: "Fanpage", value: "fanpage" },
                { label: "Group", value: "group" },
              ],
            },
            audience: {
              type: "number",
              label: "Số follower / thành viên (số nguyên)",
            },
            verified: {
              type: "radio",
              label: "Tick xanh",
              options: [
                { label: "Không", value: "no" },
                { label: "Có", value: "yes" },
              ],
            },
            role: { type: "textarea", label: "Mô tả ngắn" },
            url: { type: "text", label: "Link Facebook" },
          },
        },
      },
      render: (props) => <ChannelNetwork {...props} />,
    },
    Pricing: {
      label: "Bảng giá (tab + thẻ)",
      defaultProps: pricingDefaults,
      fields: {
        paddingY: paddingField,
        kicker: { type: "text", label: "Kicker" },
        title: { type: "text", label: "Tiêu đề" },
        sub: { type: "textarea", label: "Mô tả" },
      },
      render: (props) => <Pricing {...props} />,
    },
    Process: {
      label: "Quy trình hợp tác",
      defaultProps: processDefaults,
      fields: {
        paddingY: paddingField,
        kicker: { type: "text", label: "Kicker" },
        title: { type: "text", label: "Tiêu đề" },
        sub: { type: "textarea", label: "Mô tả" },
        steps: {
          type: "array",
          label: "Các bước",
          arrayFields: {
            icon: iconField,
            title: { type: "text", label: "Tên bước" },
            text: { type: "textarea", label: "Mô tả" },
          },
        },
      },
      render: (props) => <Process {...props} />,
    },
    Impact: {
      label: "Dải điểm nhấn (nền đen)",
      defaultProps: impactDefaults,
      fields: {
        paddingY: paddingField,
        kicker: { type: "text", label: "Kicker" },
        statement: { type: "textarea", label: "Câu statement" },
        accent: { type: "text", label: "Phần nhấn màu cam" },
        sub: { type: "textarea", label: "Mô tả phụ" },
        marqueeItems: {
          type: "array",
          label: "Chữ chạy",
          arrayFields: { text: { type: "text", label: "Nội dung" } },
        },
      },
      render: (props) => <Impact {...props} />,
    },
    Faq: {
      label: "Câu hỏi thường gặp",
      defaultProps: faqDefaults,
      fields: {
        paddingY: paddingField,
        kicker: { type: "text", label: "Kicker" },
        title: { type: "text", label: "Tiêu đề" },
        sub: { type: "textarea", label: "Mô tả" },
        items: {
          type: "array",
          label: "Câu hỏi",
          arrayFields: {
            question: { type: "text", label: "Câu hỏi" },
            answer: { type: "textarea", label: "Trả lời" },
          },
        },
      },
      render: (props) => <Faq {...props} />,
    },
    Contact: {
      label: "Liên hệ",
      defaultProps: contactDefaults,
      fields: {
        paddingY: paddingField,
        kicker: { type: "text", label: "Kicker" },
        title: { type: "text", label: "Tiêu đề" },
        description: { type: "textarea", label: "Mô tả" },
        email: { type: "text", label: "Email" },
        phone: { type: "text", label: "Điện thoại" },
        address: { type: "text", label: "Địa chỉ" },
      },
      render: (props) => <Contact {...props} />,
    },

    /* ---------- Block cơ bản ---------- */
    HeadingBlock: {
      label: "Tiêu đề",
      defaultProps: headingBlockDefaults,
      fields: {
        text: { type: "text", label: "Nội dung" },
        level: {
          type: "radio",
          label: "Cỡ",
          options: [
            { label: "Lớn", value: "h2" },
            { label: "Vừa", value: "h3" },
            { label: "Nhỏ", value: "h4" },
          ],
        },
        align: alignField,
        color: {
          type: "radio",
          label: "Màu",
          options: [
            { label: "Đen", value: "ink" },
            { label: "Cam", value: "brand" },
            { label: "Trắng", value: "white" },
          ],
        },
      },
      render: (props) => <HeadingBlock {...props} />,
    },
    TextBlock: {
      label: "Đoạn văn",
      defaultProps: textBlockDefaults,
      fields: {
        text: { type: "textarea", label: "Nội dung (giữ xuống dòng)" },
        align: alignField,
        size: {
          type: "radio",
          label: "Cỡ chữ",
          options: [
            { label: "Nhỏ", value: "sm" },
            { label: "Vừa", value: "base" },
            { label: "Lớn", value: "lg" },
          ],
        },
        color: {
          type: "radio",
          label: "Màu",
          options: [
            { label: "Đen", value: "ink" },
            { label: "Xám", value: "soft" },
            { label: "Trắng", value: "white" },
          ],
        },
      },
      render: (props) => <TextBlock {...props} />,
    },
    ImageBlock: {
      label: "Ảnh",
      defaultProps: imageBlockDefaults,
      fields: {
        src: {
          type: "custom",
          label: "Ảnh",
          render: ({ value, onChange }) => (
            <ImageField value={value} onChange={onChange} />
          ),
        },
        alt: { type: "text", label: "Mô tả ảnh (alt — tốt cho SEO)" },
        aspect: {
          type: "select",
          label: "Tỉ lệ",
          options: [
            { label: "16:9", value: "video" },
            { label: "Rộng 21:9", value: "wide" },
            { label: "Vuông", value: "square" },
            { label: "Tự nhiên", value: "auto" },
          ],
        },
        rounded: {
          type: "radio",
          label: "Bo góc",
          options: [
            { label: "Có", value: "yes" },
            { label: "Không", value: "no" },
          ],
        },
        caption: { type: "text", label: "Chú thích (tùy chọn)" },
      },
      render: (props) => <ImageBlock {...props} />,
    },
    ButtonBlock: {
      label: "Nút bấm",
      defaultProps: buttonBlockDefaults,
      fields: {
        label: { type: "text", label: "Nhãn" },
        href: { type: "text", label: "Liên kết (URL hoặc #section)" },
        style: {
          type: "radio",
          label: "Kiểu",
          options: [
            { label: "Cam", value: "primary" },
            { label: "Viền", value: "outline" },
            { label: "Đen", value: "dark" },
          ],
        },
        align: alignField,
      },
      render: (props) => <ButtonBlock {...props} />,
    },
    QuoteBlock: {
      label: "Trích dẫn",
      defaultProps: quoteBlockDefaults,
      fields: {
        quote: { type: "textarea", label: "Câu trích dẫn" },
        author: { type: "text", label: "Tác giả" },
      },
      render: (props) => <QuoteBlock {...props} />,
    },
    VideoBlock: {
      label: "Video YouTube",
      defaultProps: videoBlockDefaults,
      fields: {
        url: { type: "text", label: "Link YouTube" },
        caption: { type: "text", label: "Chú thích (tùy chọn)" },
      },
      render: (props) => <VideoBlock {...props} />,
    },
    SpacerBlock: {
      label: "Khoảng cách",
      defaultProps: spacerBlockDefaults,
      fields: {
        size: {
          type: "radio",
          label: "Chiều cao",
          options: [
            { label: "S", value: "s" },
            { label: "M", value: "m" },
            { label: "L", value: "l" },
            { label: "XL", value: "xl" },
          ],
        },
      },
      render: (props) => <SpacerBlock {...props} />,
    },
    DividerBlock: {
      label: "Đường kẻ",
      defaultProps: dividerBlockDefaults,
      fields: {},
      render: () => <DividerBlock />,
    },
    ColumnsBlock: {
      label: "Cột (kéo block vào trong)",
      defaultProps: columnsBlockDefaults,
      fields: {
        columns: {
          type: "radio",
          label: "Số cột",
          options: [
            { label: "2 cột", value: "2" },
            { label: "3 cột", value: "3" },
          ],
        },
        gap: {
          type: "radio",
          label: "Khoảng cách cột",
          options: [
            { label: "Hẹp", value: "s" },
            { label: "Vừa", value: "m" },
            { label: "Rộng", value: "l" },
          ],
        },
      },
      render: (props) => <ColumnsBlock {...props} />,
    },
  },
};

const DEFAULT_SECTION_ORDER = [
  { type: "Hero", props: heroDefaults },
  { type: "Marquee", props: marqueeDefaults },
  { type: "Stats", props: statsDefaults },
  { type: "Services", props: servicesDefaults },
  { type: "ChannelNetwork", props: channelNetworkDefaults },
  { type: "Pricing", props: pricingDefaults },
  { type: "Process", props: processDefaults },
  { type: "Impact", props: impactDefaults },
  { type: "Faq", props: faqDefaults },
  { type: "Contact", props: contactDefaults },
];

/** Data mặc định cho Puck khi DB chưa có nội dung. */
export function buildDefaultPuckData(): Data {
  return {
    root: { props: { ...rootDefaults } },
    content: DEFAULT_SECTION_ORDER.map((section, index) => ({
      type: section.type,
      props: {
        id: `${section.type}-default-${index}`,
        ...section.props,
      },
    })),
  } as Data;
}

const REGISTERED_TYPES = new Set(Object.keys(puckConfig.components ?? {}));

/** Bỏ block không còn đăng ký (Testimonials, Features/app) để editor/trang chủ không vỡ. */
export function sanitizePuckData(data: Data | null): Data | null {
  if (!data) return null;
  const content = Array.isArray(data.content)
    ? data.content.filter((block) => REGISTERED_TYPES.has(block.type))
    : [];
  return { ...data, content };
}
