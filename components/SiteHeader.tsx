// components/SiteHeader.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Lang, LocalizedText, SiteConfig } from "../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface SiteHeaderProps {
  config: SiteConfig;
  lang: Lang;
  onChangeLang: (lang: Lang) => void;
}

export function SiteHeader({ config, lang, onChangeLang }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAr = lang === "ar";

  // ✅ Brand Palette (RED)
  const BRAND = {
    primary: "#E81B24",
    deep: "#AD1E1F",
    gold: "#D99328",
    paper: "#F8F7F8",
    black: "#110F11",
  } as const;

  const accent = BRAND.primary;

  // ✅ Removed: offers + popular
  const navLinks: { id: string; label: LocalizedText }[] = [
    { id: "hero", label: { en: "Home", ar: "الرئيسية" } },
    { id: "qr", label: { en: "Gallery", ar: "صور" } },
    { id: "menu", label: { en: "Menu", ar: "المنيو" } },
    { id: "contact", label: { en: "Contact", ar: "تواصل" } },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerCardStyle = useMemo(() => {
    return {
      backgroundColor: scrolled
        ? "rgba(248,247,248,0.92)"
        : "rgba(248,247,248,0.72)",
      borderColor: scrolled ? "rgba(232,27,36,0.35)" : "rgba(232,27,36,0.22)",
      boxShadow: scrolled
        ? "0 18px 48px rgba(17,15,17,0.16)"
        : "0 14px 40px rgba(17,15,17,0.12)",
    } as const;
  }, [scrolled]);

  const handleChangeLang = (nextLang: Lang) => {
    if (nextLang !== lang) onChangeLang(nextLang);
  };

  const handleNavClick = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24">
        <div
          className="absolute -left-20 -top-16 h-56 w-56 rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: BRAND.primary }}
        />
        <div
          className="absolute right-[-90px] -top-16 h-64 w-64 rounded-full blur-3xl opacity-18"
          style={{ backgroundColor: BRAND.deep }}
        />
        <div
          className="absolute inset-x-0 top-0 h-24"
          style={{
            background:
              "linear-gradient(to bottom, rgba(232,27,36,0.10), transparent)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-3 pt-3 sm:px-4 sm:pt-4 lg:px-6">
        <div
          className="relative rounded-[999px] border backdrop-blur-md"
          style={headerCardStyle}
        >
          <div className="flex items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3 md:px-5">
            {/* Logo + Brand */}
            <div className="flex min-w-0 items-center gap-2">
              <div
                className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white shadow-sm ring-1 sm:h-10 sm:w-10 md:h-11 md:w-11"
                style={{ borderColor: "rgba(232,27,36,0.18)" }}
              >
                <Image
                  src="/logo/logo.png"
                  alt={t(config.brandName, lang)}
                  fill
                  sizes="44px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className={(isAr ? "text-right" : "text-left") + " min-w-0"}>
                <span
                  className="block truncate text-[14px] font-extrabold tracking-wide sm:text-base md:text-lg"
                  style={{ color: BRAND.black }}
                >
                  {t(config.brandName, lang)}
                </span>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-6 text-sm font-extrabold md:flex">
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`group relative transition-colors ${
                    isAr ? "text-[15px]" : ""
                  }`}
                  style={{ color: "rgba(17,15,17,0.72)" }}
                  onMouseEnter={(e) => ((e.currentTarget.style.color = accent))}
                  onMouseLeave={(e) =>
                    ((e.currentTarget.style.color = "rgba(17,15,17,0.72)"))
                  }
                >
                  <span className={isAr ? "font-extrabold" : ""}>
                    {t(item.label, lang)}
                  </span>
                  <span
                    className="pointer-events-none absolute inset-x-0 -bottom-1 mx-auto h-0.5 w-0 rounded-full transition-all duration-200 group-hover:w-full"
                    style={{ backgroundColor: accent }}
                  />
                </a>
              ))}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-2">
              {/* Lang */}
              <div
                className="relative inline-flex items-center overflow-hidden rounded-full border px-1 py-0.5 text-[11px] font-extrabold shadow-sm sm:px-1.5 sm:text-xs"
                dir="ltr"
                style={{
                  borderColor: "rgba(232,27,36,0.22)",
                  backgroundColor: "rgba(248,247,248,0.88)",
                }}
              >
                <span
                  className={`absolute inset-y-0.5 h-[calc(100%-4px)] w-1/2 rounded-full transition-all duration-200 ${
                    lang === "en" ? "left-0" : "left-1/2"
                  }`}
                  style={{
                    backgroundColor: BRAND.primary,
                    boxShadow: "0 10px 22px rgba(232,27,36,0.24)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleChangeLang("en")}
                  className={`relative z-10 px-2.5 py-1 transition-colors sm:px-3 sm:py-1.5 ${
                    lang === "en"
                      ? "text-white"
                      : "text-[#110F11] hover:text-[#E81B24]"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => handleChangeLang("ar")}
                  className={`relative z-10 px-2.5 py-1 transition-colors sm:px-3 sm:py-1.5 ${
                    lang === "ar"
                      ? "text-white"
                      : "text-[#110F11] hover:text-[#E81B24]"
                  }`}
                >
                  ع
                </button>
              </div>

              {/* Mobile menu */}
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border shadow-sm md:hidden"
                aria-label={lang === "en" ? "Toggle menu" : "فتح/إغلاق القائمة"}
                aria-expanded={isMenuOpen}
                onClick={toggleMenu}
                style={{
                  borderColor: "rgba(232,27,36,0.22)",
                  backgroundColor: "rgba(248,247,248,0.92)",
                  color: BRAND.black,
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span
                    className={`h-[2px] w-4 origin-center rounded-full transition-transform ${
                      isMenuOpen ? "translate-y-[3px] rotate-45" : ""
                    }`}
                    style={{ backgroundColor: BRAND.black }}
                  />
                  <span
                    className={`h-[2px] w-4 origin-center rounded-full transition-opacity ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                    style={{ backgroundColor: BRAND.black }}
                  />
                  <span
                    className={`h-[2px] w-4 origin-center rounded-full transition-transform ${
                      isMenuOpen ? "-translate-y-[3px] -rotate-45" : ""
                    }`}
                    style={{ backgroundColor: BRAND.black }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm md:hidden"
          onClick={toggleMenu}
        >
          <div
            className="absolute inset-x-3 top-[76px] sm:inset-x-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="origin-top rounded-3xl border p-3 shadow-2xl backdrop-blur-xl animate-[fadeDown_0.18s_ease-out]"
              style={{
                borderColor: "rgba(232,27,36,0.20)",
                backgroundColor: "rgba(248,247,248,0.98)",
              }}
            >
              <div
                className="mb-2 rounded-2xl px-4 py-3"
                style={{
                  background: `linear-gradient(90deg, rgba(232,27,36,0.12), rgba(217,147,40,0.10))`,
                  border: "1px solid rgba(232,27,36,0.16)",
                }}
              >
                <div
                  className={
                    "text-[13px] font-extrabold " +
                    (isAr ? "text-right" : "text-left")
                  }
                  style={{ color: BRAND.black }}
                >
                  {lang === "en" ? "Navigate" : "التنقل"}
                </div>
              </div>

              <nav className="flex max-h-[62vh] flex-col gap-1 overflow-y-auto text-[15px] font-extrabold">
                {navLinks.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleNavClick}
                    className="flex items-center justify-between rounded-2xl px-4 py-3"
                    style={{
                      direction: isAr ? "rtl" : "ltr",
                      color: BRAND.black,
                      border: "1px solid rgba(232,27,36,0.12)",
                      backgroundColor: "rgba(255,255,255,0.80)",
                    }}
                  >
                    <span>{t(item.label, lang)}</span>
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: BRAND.primary, opacity: 0.55 }}
                    />
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
