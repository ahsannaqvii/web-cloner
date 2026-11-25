import type { Metadata } from "next";
import { Cursor } from "@/components/sites/cuberto/Cursor";
import { Footer, Outro } from "@/components/sites/cuberto/Footer";
import { Navbar } from "@/components/sites/cuberto/Navbar";
import { Projects } from "@/components/sites/cuberto/projects/Projects";
import { SmoothScroll } from "@/components/sites/infeniti/SmoothScroll";

export const metadata: Metadata = {
  title: "Our projects | Cuberto",
  description: "We help bring ideas to life and create digital products that work.",
};

export default function CubertoProjects() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <main>
        <Projects />
        <Outro />
        <Footer />
      </main>
    </>
  );
}
