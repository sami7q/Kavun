// components/sections/HeroSection.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { SiteConfig, Lang, LocalizedText } from "../../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface HeroSectionProps {
  config: SiteConfig;
  lang: Lang;
}

const HERO_BANNERS = ["/hero-bg.svg", "/hero-bg2.svg"] as const;

export function HeroSection({ config, lang }: HeroSectionProps) {
  const isAr = lang === "ar";

  // ✅ Brand palette (exact)
  const primary = "#E81B24";
  const deep = "#AD1E1F";
  const paper = "#F8F7F8";

  const [activeIndex, setActiveIndex] = useState(0);

  // auto rotate every 4 seconds
  useEffect(() => {
    if (HERO_BANNERS.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % HERO_BANNERS.length);
    }, 4000);
    return () => window.clearInterval(id);
  }, []);

  const banners = useMemo(() => [...HERO_BANNERS], []);

  const handleMenuClick = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection)
      menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <div className="relative w-full pt-[76px] md:pt-0">
        {/* MOBILE (full banner, no crop) */}
        <div className="relative md:hidden h-[calc(100svh-76px)] min-h-[520px] w-full">
          {/* Crossfade banners */}
          {banners.map((src, i) => (
            <div
              key={src}
              className={
                "absolute inset-0 transition-opacity duration-700 ease-out " +
                (i === activeIndex ? "opacity-100" : "opacity-0")
              }
            >
              <Image
                src={src}
                alt={t(config.brandName, lang)}
                fill
                priority={i === 0}
                unoptimized
                className="object-contain"
                sizes="100vw"
              />
            </div>
          ))}

          {/* overlay using brand cocoa */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(101,24,16,0.10), rgba(101,24,16,0.16))",
            }}
          />

          {/* ✅ Mobile CTA */}
          <div className="absolute inset-x-0 bottom-5 flex justify-center px-4">
            <button
              type="button"
              onClick={handleMenuClick}
              className="group relative inline-flex w-full max-w-[380px] items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-extrabold text-white active:scale-[0.98]"
              style={{
                backgroundColor: primary,
                boxShadow: "0 18px 44px rgba(17,15,17,0.22)",
              }}
            >
              {/* glow */}
              <span
                className="pointer-events-none absolute -inset-1 rounded-full blur-md opacity-45 transition-opacity duration-200 group-hover:opacity-50"
                style={{ backgroundColor: primary }}
              />
              {/* shine */}
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.34),transparent_42%,transparent_58%,rgba(255,255,255,0.16))] opacity-75" />

              <span className="relative">
                {isAr ? "عرض المنيو" : "View Menu"}
              </span>

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

              {/* pulse (deep red) - softer */}
              <span
                className="pointer-events-none absolute inset-0 rounded-full animate-[pulse_2.6s_ease-in-out_infinite] opacity-[0.14]"
                style={{ backgroundColor: deep }}
              />
            </button>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="relative hidden md:block h-[70vh] lg:h-[88vh] min-h-[680px] w-full">
          {/* Crossfade banners */}
          {banners.map((src, i) => (
            <div
              key={src}
              className={
                "absolute inset-0 transition-opacity duration-700 ease-out " +
                (i === activeIndex ? "opacity-100" : "opacity-0")
              }
            >
              <Image
                src={src}
                alt={t(config.brandName, lang)}
                fill
                priority={i === 0}
                unoptimized
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(101,24,16,0.10), rgba(101,24,16,0.18))",
            }}
          />

          <div className="absolute bottom-7 right-7">
            <button
              type="button"
              onClick={handleMenuClick}
              className="group relative inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-extrabold backdrop-blur-md transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
              style={{
                borderColor: "rgba(255,255,255,0.40)",
                backgroundColor: "rgba(248,247,248,0.18)",
                color: paper,
                boxShadow: "0 22px 55px rgba(17,15,17,0.22)",
              }}
            >
              <span className="relative">
                {isAr ? "عرض المنيو" : "View Menu"}
              </span>

              <span
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  backgroundColor: primary,
                  boxShadow: "0 14px 30px rgba(232,27,36,0.32)",
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
                    (isAr
                      ? "rotate-180 group-hover:-translate-x-0.5"
                      : "group-hover:translate-x-0.5")
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

              {/* hover glow - softer */}
              <span
                className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-[0.22]"
                style={{ backgroundColor: deep }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
