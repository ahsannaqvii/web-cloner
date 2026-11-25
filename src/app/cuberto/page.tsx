import { Bottom } from "@/components/sites/cuberto/Bottom";
import { Cursor } from "@/components/sites/cuberto/Cursor";
import { Features } from "@/components/sites/cuberto/Features";
import { Middle } from "@/components/sites/cuberto/Middle";
import { Navbar } from "@/components/sites/cuberto/Navbar";
import { Top } from "@/components/sites/cuberto/Top";
import { SmoothScroll } from "@/components/sites/infeniti/SmoothScroll";

export default function CubertoHome() {
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <main>
        <Top />
        <Features />
        <Middle />
        <Bottom />
      </main>
    </>
  );
}
