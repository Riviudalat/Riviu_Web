import {
  ChartLineUp,
  Compass,
  DeviceMobile,
  FilmSlate,
  Handshake,
  MagnifyingGlass,
  MapTrifold,
  MegaphoneSimple,
  PencilLine,
  RocketLaunch,
  ShieldCheck,
  Star,
  Storefront,
  Users,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
}>;

/**
 * Icon minh họa dùng được trong Puck (chọn bằng key chuỗi).
 * Thêm section mới cần icon thì bổ sung key tại đây.
 */
export const SECTION_ICONS = {
  megaphone: MegaphoneSimple,
  storefront: Storefront,
  chart: ChartLineUp,
  film: FilmSlate,
  community: UsersThree,
  users: Users,
  shield: ShieldCheck,
  map: MapTrifold,
  search: MagnifyingGlass,
  star: Star,
  pencil: PencilLine,
  mobile: DeviceMobile,
  handshake: Handshake,
  compass: Compass,
  rocket: RocketLaunch,
} satisfies Record<string, IconComponent>;

export type SectionIconKey = keyof typeof SECTION_ICONS;

export const SECTION_ICON_OPTIONS = (
  Object.keys(SECTION_ICONS) as SectionIconKey[]
).map((key) => ({ label: key, value: key }));

export function SectionIcon({
  name,
  size = 40,
  weight = "duotone",
  className = "text-brand-500",
}: {
  name: SectionIconKey;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
}) {
  const Icon = SECTION_ICONS[name] ?? SECTION_ICONS.star;
  return <Icon size={size} weight={weight} className={className} />;
}
