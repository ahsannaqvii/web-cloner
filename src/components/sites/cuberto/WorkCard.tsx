"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { SmartLink } from "./ui";
import s from "./Middle.module.css";

/** Project card: cover image, cross-fades to its looping video on hover (pointer devices). */
export function WorkCard({
  href,
  img,
  video,
  caption,
  sm,
}: {
  href: string;
  img: string;
  video: string;
  caption: string;
  sm: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const play = () => {
    const v = ref.current;
    if (!v || !matchMedia("(pointer: fine)").matches) return;
    v.currentTime = 0;
    void v.play().catch(() => {});
  };
  const stop = () => ref.current?.pause();

  return (
    <SmartLink
      href={href}
      className={s.card}
      onPointerEnter={play}
      onPointerLeave={stop}
    >
      <span className={cn(s.preview, sm && s.previewSm)}>
        <span className={cn(s.media, s.mediaImage)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img} alt={caption} loading="lazy" />
        </span>
        <span className={cn(s.media, s.mediaVideo)}>
          <video ref={ref} src={video} muted loop playsInline preload="none" />
        </span>
      </span>
      <span className={s.caption}>{caption}</span>
    </SmartLink>
  );
}
