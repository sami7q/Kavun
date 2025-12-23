// components/SiteFooter.tsx
import Image from "next/image";
import { Lang, LocalizedText, SiteConfig } from "../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface SiteFooterProps {
  config: SiteConfig;
  lang: Lang;
}

export function SiteFooter({ config, lang }: SiteFooterProps) {
  const isAr = lang === "ar";

  // ✅ Brand Palette (exact)
  const BRAND = {
    primary: "#E81B24",
    deep: "#AD1E1F",
    soft: "#E45E63",
    rose: "#E8A39F",
    gold: "#D99328",
    caramel: "#DFA65D",
    cream: "#EDD0A4",
    paper: "#F8F7F8",
    cocoa: "#651810",
    black: "#110F11",
  } as const;

  const accent = config.primaryColor ?? BRAND.primary;

  // ✅ Location (UPDATED) — your new link
  const mapsLink = "https://maps.app.goo.gl/vGopZmA9kq4bQ6bn8";

  // ✅ Coords
  const MAP_LAT = 33.3655546;
  const MAP_LNG = 44.4080991;

  // ✅ iframe embed MUST use coords
  const mapsEmbedSrc = `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=17&output=embed`;

  // ✅ Social links
  const phoneRaw = "+9647733885500";
  const phoneDisplay = "+964 773 388 5500";
  const whatsappLink = `https://wa.me/${phoneRaw.replace("+", "")}`;

  const instagramLink = "https://www.instagram.com/fried.chicken.iq/?hl=ar";
  const facebookLink = "https://www.facebook.com/fried.chicken.iq?locale=ar_AR";

  return (
    <footer
      id="contact"
      className="mt-10 border-t pt-10 md:pt-12"
      style={{
        borderColor: "rgba(101,24,16,0.10)",
        backgroundImage: `linear-gradient(to bottom, ${BRAND.paper}, rgba(237,208,164,0.35))`,
        color: BRAND.cocoa,
      }}
    >
      <div
        className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-9 md:gap-10"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* TOP GRID */}
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          {/* Column 1 – Brand */}
          <div className={isAr ? "text-right" : "text-left"}>
            <div
              className={
                "mb-3 flex items-center gap-2 " +
                (isAr ? "flex-row-reverse" : "flex-row")
              }
            >
              <div
                className="relative h-10 w-10 overflow-hidden rounded-full bg-white shadow-md ring-1"
                style={{
                  borderColor: "rgba(101,24,16,0.12)",
                  boxShadow: "0 10px 24px rgba(17,15,17,0.10)",
                }}
              >
                <Image
                  src="/logo/logo.png"
                  alt={t(config.brandName, lang)}
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-wide">
                  {t(config.brandName, lang)}
                </span>
                <span className="text-xs" style={{ color: "rgba(101,24,16,0.70)" }}>
                  {lang === "en"
                    ? "Crispy. Hot. Always ready."
                    : "مقرمش. حار. جاهز دائمًا."}
                </span>
              </div>
            </div>

            <p className="mb-3 text-sm" style={{ color: "rgba(101,24,16,0.75)" }}>
              {t(config.footer.about, lang)}
            </p>

            {/* Opening hours */}
            {config.footer.openings?.length ? (
              <>
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "rgba(101,24,16,0.55)" }}
                >
                  {t(config.footer.openingTitle, lang)}
                </p>
                <div className="space-y-1 text-xs" style={{ color: "rgba(101,24,16,0.78)" }}>
                  {config.footer.openings.map((row, i) => (
                    <p key={i}>
                      {t(row.label, lang)} · {t(row.time, lang)}
                    </p>
                  ))}
                </div>
              </>
            ) : null}

            {/* small badge */}
            <div
              className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-extrabold"
              style={{
                borderColor: "rgba(101,24,16,0.12)",
                backgroundColor: "rgba(255,255,255,0.70)",
                color: BRAND.cocoa,
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.gold }} />
              {lang === "en" ? "Fresh daily" : "طازج يوميًا"}
            </div>
          </div>

          {/* Column 2 – Contact */}
          <div className={isAr ? "text-right" : "text-left"}>
            <p className="mb-2 text-sm font-extrabold" style={{ color: BRAND.cocoa }}>
              {lang === "en" ? "Contact" : "التواصل"}
            </p>

            <ul className="space-y-2 text-sm" style={{ color: "rgba(101,24,16,0.78)" }}>
              <li>
                {/* ✅ FIX: isolate phone direction + keep order nice in RTL */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={
                    "inline-flex items-center gap-2 rounded-full border px-3 py-2 transition hover:-translate-y-[1px] " +
                    (isAr ? "flex-row-reverse" : "flex-row")
                  }
                  style={{
                    borderColor: "rgba(101,24,16,0.12)",
                    backgroundColor: "rgba(255,255,255,0.70)",
                    color: accent,
                    boxShadow: "0 12px 28px rgba(17,15,17,0.08)",
                  }}
                >
                  <span className="font-extrabold">WhatsApp</span>

                  {/* ✅ Phone MUST be LTR + isolated (prevents +964 from flipping) */}
                  <span
                    dir="ltr"
                    className="text-[12px] tabular-nums whitespace-nowrap [unicode-bidi:isolate]"
                    style={{ color: "rgba(101,24,16,0.70)" }}
                  >
                    {phoneDisplay}
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:underline"
                  style={{ color: accent }}
                >
                  Instagram: @fried.chicken.iq
                </a>
              </li>

              <li>
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:underline"
                  style={{ color: accent }}
                >
                  Facebook: fried.chicken.iq
                </a>
              </li>

              <li>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:underline"
                  style={{ color: accent }}
                >
                  {lang === "en" ? "Open Location" : "افتح الموقع"}
                </a>
              </li>
            </ul>

            <p className="mt-4 text-xs" style={{ color: "rgba(101,24,16,0.55)" }}>
              {lang === "en"
                ? "For orders & inquiries, contact us on WhatsApp."
                : "للطلب والاستفسار، تواصل معنا على واتساب."}
            </p>
          </div>

          {/* Column 3 – Social icons */}
          <div className={isAr ? "text-right" : "text-left"}>
            <p className="mb-2 text-sm font-extrabold" style={{ color: BRAND.cocoa }}>
              {lang === "en" ? "Follow us" : "تابعنا"}
            </p>

            <ul
              className={
                "mt-3 flex items-center gap-2 " +
                (isAr ? "justify-end" : "justify-start")
              }
            >
              {/* WhatsApp */}
              <li>
                <a
                  href={whatsappLink}
                  aria-label="WhatsApp"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white transition hover:-translate-y-0.5"
                  style={{
                    borderColor: "rgba(101,24,16,0.12)",
                    color: BRAND.cocoa,
                    boxShadow: "0 10px 24px rgba(17,15,17,0.10)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 3a9 9 0 0 0-7.8 13.37L3 21l4.1-1.1A9 9 0 1 0 12 3z" />
                    <path d="M9.5 9.2c.2-.4.3-.6.6-.6h.4c.2 0 .3 0 .4.3l.4 1c.1.3.1.4 0 .5l-.3.4a.4.4 0 0 0 0 .4 4.7 4.7 0 0 0 2.2 2.2.4.4 0 0 0 .4 0l.4-.3c.1-.1.3-.1.5 0l1 .4c.3.1.3.2.3.4v.4c0 .3-.2.6-.6.8-.4.3-.9.3-1.5.2a5.7 5.7 0 0 1-3.1-1.6 5.6 5.6 0 0 1-1.4-3.3c0-.5 0-.9.3-1.3z" />
                  </svg>
                </a>
              </li>

              {/* Instagram */}
              <li>
                <a
                  href={instagramLink}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white transition hover:-translate-y-0.5"
                  style={{
                    borderColor: "rgba(101,24,16,0.12)",
                    color: BRAND.cocoa,
                    boxShadow: "0 10px 24px rgba(17,15,17,0.10)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17" cy="7" r="1.1" fill="currentColor" />
                  </svg>
                </a>
              </li>

              {/* Facebook */}
              <li>
                <a
                  href={facebookLink}
                  aria-label="Facebook"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white transition hover:-translate-y-0.5"
                  style={{
                    borderColor: "rgba(101,24,16,0.12)",
                    color: BRAND.cocoa,
                    boxShadow: "0 10px 24px rgba(17,15,17,0.10)",
                  }}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="h-5 w-5">
                    <path d="M13.5 21v-6h2.4l.4-3.5h-2.8V9.2c0-.9.3-1.4 1.5-1.4H16V4.7c-.3 0-1-.1-1.8-.1-2.4 0-3.9 1.4-3.9 4v2H8v3.5h2.3V21h3.2z" />
                  </svg>
                </a>
              </li>
            </ul>

            {/* accent strip */}
            <div className="mt-4">
              <div
                className="h-[3px] w-28 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #E81B24, #D99328, #DFA65D)",
                  opacity: 0.85,
                }}
              />
              <p className="mt-2 text-[11px] font-semibold" style={{ color: "rgba(101,24,16,0.55)" }}>
                {lang === "en" ? "Best taste — fast service" : "أفضل طعم — خدمة سريعة"}
              </p>
            </div>
          </div>
        </div>

        {/* MAP BLOCK */}
        <div className="space-y-3" dir={isAr ? "rtl" : "ltr"}>
          <p
            className={
              "text-xs font-semibold uppercase tracking-[0.18em] " +
              (isAr ? "text-right" : "text-left")
            }
            style={{ color: accent }}
          >
            {lang === "en" ? "Find us on the map" : "موقعنا على الخريطة"}
          </p>

          <div
            className="relative overflow-hidden rounded-2xl border bg-white"
            style={{
              borderColor: "rgba(101,24,16,0.12)",
              boxShadow: "0 18px 45px rgba(17,15,17,0.10)",
            }}
          >
            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer noopener"
              className={
                "absolute z-10 top-3 rounded-full border px-3 py-2 text-[12px] font-extrabold shadow-lg backdrop-blur " +
                (isAr ? "left-3" : "right-3")
              }
              style={{
                borderColor: "rgba(101,24,16,0.12)",
                backgroundColor: "rgba(255,255,255,0.85)",
                color: accent,
              }}
            >
              {lang === "en" ? "Open in Google Maps" : "افتح على Google Maps"}
            </a>

            <iframe
              title="Fried Chicken location"
              src={mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 md:h-80"
            />
          </div>

          <div
            className={
              "flex items-center gap-2 text-[11px] " +
              (isAr ? "justify-end" : "justify-start")
            }
            style={{ color: "rgba(101,24,16,0.55)" }}
          >
            <span>
              {lang === "en"
                ? "Open the pinned location in Google Maps."
                : "افتح الموقع المثبت على Google Maps."}
            </span>

            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold hover:underline"
              style={{ color: accent }}
            >
              {lang === "en" ? "Open in Google Maps" : "افتح على Google Maps"}
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        className="border-t py-3 text-center text-[11px]"
        style={{
          borderColor: "rgba(101,24,16,0.10)",
          backgroundColor: "rgba(248,247,248,0.70)",
          color: "rgba(101,24,16,0.62)",
        }}
      >
        © {new Date().getFullYear()} {t(config.brandName, lang)}.{" "}
        {lang === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
      </div>
    </footer>
  );
}
