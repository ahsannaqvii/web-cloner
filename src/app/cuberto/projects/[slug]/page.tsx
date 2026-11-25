import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/sites/cuberto/cases/CaseStudy";
import { cases, getCase } from "@/components/sites/cuberto/cases/content";
import { Cursor } from "@/components/sites/cuberto/Cursor";
import { Navbar } from "@/components/sites/cuberto/Navbar";
import { SmoothScroll } from "@/components/sites/infeniti/SmoothScroll";

type Props = { params: Promise<{ slug: string }> };

/** Only the 22 cloned case studies exist; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCase((await params).slug);
  return c ? { title: c.metaTitle, description: c.metaDescription } : {};
}

export default async function CubertoCase({ params }: Props) {
  const c = getCase((await params).slug);
  if (!c) notFound();
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <main>
        <CaseStudy c={c} />
      </main>
    </>
  );
}
