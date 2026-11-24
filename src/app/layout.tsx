import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const interDisplay = localFont({
  variable: "--font-inter-display",
  display: "swap",
  src: [
    { path: "../../public/sites/infeniti/fonts/InterDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/sites/infeniti/fonts/InterDisplay-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/sites/infeniti/fonts/InterDisplay-SemiBold.ttf", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Infeniti - Building Software Around Your Business",
  description: "Custom software for businesses that have outgrown off-the-shelf solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={interDisplay.variable}>
      <body>{children}</body>
    </html>
  );
}
