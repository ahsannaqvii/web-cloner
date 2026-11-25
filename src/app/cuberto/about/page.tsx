import type { Metadata } from "next";
import { About } from "@/components/sites/cuberto/about/About";
import { Cursor } from "@/components/sites/cuberto/Cursor";
import { Navbar } from "@/components/sites/cuberto/Navbar";
import { SmoothScroll } from "@/components/sites/infeniti/SmoothScroll";

export const metadata: Metadata = {
  title: "Company | Cuberto",
  description:
    "Cuberto is a tight-knit team of experts building websites, mobile apps and brands. Awwwards Agency of the Year.",
};

export default function CubertoAbout() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <main>
        <About />
      </main>
    </>
  );
}
