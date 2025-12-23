// components/sections/HeroSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { SiteConfig, Lang, LocalizedText } from "../../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface HeroSectionProps {
  config: SiteConfig;
  lang: Lang;
}

export function HeroSection({ config, lang }: HeroSectionProps) {
  const isAr = lang === "ar";

  // ✅ KAVUN Brand Palette (Teal)
  const primary = "#1A8597";
  const deep = "#0F5E6B";
  const paper = "#F7FAFB";

  const [canAutoplay, setCanAutoplay] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = async () => {
      try {
        await v.play();
        setCanAutoplay(true);
      } catch {
        setCanAutoplay(false);
      }
    };

    tryPlay();
  }, []);

  const handleMenuClick = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <div className="relative w-full pt-[76px] md:pt-0">
        {/* ===================== MOBILE ===================== */}
        <div className="relative md:hidden h-[calc(100svh-76px)] min-h-[520px] w-full">
          {/* ✅ Fill screen nicely */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/video.mp4"
            playsInline
            muted
            loop
            autoPlay
            preload="metadata"
          />

          {/* ✅ Soft teal wash */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(26,133,151,0.10), rgba(15,94,107,0.26))",
            }}
          />

          {/* ✅ Strong bottom gradient to make CTA pop */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[52%]"
            style={{
              background:
                "linear-gradient(to top, rgba(15,94,107,0.60), rgba(15,94,107,0.28), transparent)",
            }}
          />

          {/* ✅ If autoplay blocked */}
          {!canAutoplay && (
            <div className="absolute top-3 inset-x-0 flex justify-center px-4">
              <div
                className="rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur"
                style={{
                  borderColor: "rgba(15,94,107,0.18)",
                  backgroundColor: "rgba(247,250,251,0.78)",
                  color: deep,
                }}
              >
                {isAr ? "اضغط لتشغيل الفيديو" : "Tap to play video"}
              </div>
            </div>
          )}

          {/* ✅ Mobile CTA (better spacing + safe area) */}
          <div className="absolute inset-x-0 bottom-5 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
            <button
              type="button"
              onClick={handleMenuClick}
              className="group relative inline-flex w-full max-w-[420px] items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-extrabold text-white active:scale-[0.98]"
              style={{
                backgroundColor: primary,
                boxShadow: "0 18px 44px rgba(15,94,107,0.26)",
              }}
            >
              {/* glow */}
              <span
                className="pointer-events-none absolute -inset-1 rounded-full blur-md opacity-45 transition-opacity duration-200 group-hover:opacity-55"
                style={{ backgroundColor: primary }}
              />
              {/* shine */}
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.32),transparent_42%,transparent_58%,rgba(255,255,255,0.14))] opacity-75" />

              <span className="relative">{isAr ? "عرض المنيو" : "View Menu"}</span>

              <span
                className={
                  "relative inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-white/30 " +
                  "transition-transform duration-200 " +
                  (isAr ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5")
                }
                style={{ backgroundColor: "rgba(255,255,255,0.14)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={isAr ? "rotate-180" : ""}
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              {/* pulse */}
              <span
                className="pointer-events-none absolute inset-0 rounded-full animate-[pulse_2.8s_ease-in-out_infinite] opacity-[0.12]"
                style={{ backgroundColor: deep }}
              />
            </button>
          </div>
        </div>

        {/* ===================== DESKTOP ===================== */}
        <div className="relative hidden md:block h-[70vh] lg:h-[88vh] min-h-[680px] w-full">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/video.mp4"
            playsInline
            muted
            loop
            autoPlay
            preload="metadata"
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(26,133,151,0.06), rgba(15,94,107,0.18))",
            }}
          />

          <div className="absolute bottom-7 right-7">
            <button
              type="button"
              onClick={handleMenuClick}
              className="group relative inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-extrabold backdrop-blur-md transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
              style={{
                borderColor: "rgba(255,255,255,0.42)",
                backgroundColor: "rgba(247,250,251,0.18)",
                color: paper,
                boxShadow: "0 22px 55px rgba(15,94,107,0.20)",
              }}
            >
              <span className="relative">{isAr ? "عرض المنيو" : "View Menu"}</span>

              <span
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  backgroundColor: primary,
                  boxShadow: "0 14px 30px rgba(26,133,151,0.28)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    "transition-transform duration-200 " +
                    (isAr ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5")
                  }
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span
                className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-[0.20]"
                style={{ backgroundColor: deep }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
