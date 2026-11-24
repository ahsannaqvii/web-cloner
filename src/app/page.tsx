import { Closing } from "@/components/sites/infeniti/Closing";
import { Cursor } from "@/components/sites/infeniti/Cursor";
import { Features } from "@/components/sites/infeniti/Features";
import { Intro } from "@/components/sites/infeniti/Intro";
import { Navbar } from "@/components/sites/infeniti/Navbar";
import { Showcase } from "@/components/sites/infeniti/Showcase";
import { SmoothScroll } from "@/components/sites/infeniti/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <main>
        <Intro />
        <Features />
        <Showcase />
        <Closing />
      </main>
    </>
  );
}
