import type { Metadata } from "next";
import localFont from "next/font/local";
import s from "@/components/sites/cuberto/page.module.css";

// Cuberto's own Suisse Intl files (licensed to Cuberto) — local reference clone only.
const suisse = localFont({
  variable: "--font-suisse",
  display: "swap",
  src: [
    { path: "../../../public/sites/cuberto/fonts/suisseintl-regular.woff2", weight: "400", style: "normal" },
    { path: "../../../public/sites/cuberto/fonts/suisseintl-medium.woff2", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Cuberto | Digital Design & Development Agency",
  description:
    "We design and build digital products, brands and websites for companies ready to move beyond the ordinary.",
  robots: { index: false, follow: false },
};

export default function CubertoLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${suisse.variable} ${s.page}`}>{children}</div>;
}
