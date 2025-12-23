// lib/kavun.menu.ts
export type Lang = "en" | "ar";
export type LocalizedText = { en: string; ar: string };

export type MenuItem = {
  id: string;
  name: LocalizedText;
  description?: LocalizedText;
  priceHalf?: number; // استخدمته للإسبريسو 55-70
  priceFull: number;
  image?: string;
};

export type MenuCategoryId = "hot" | "cold" | "refreshers";

export type MenuCategory = {
  id: MenuCategoryId;
  label: LocalizedText;
  items: MenuItem[];
};

export const KAVUN_BRAND = {
  primary: "#1A8597",
  deep: "#0F5E6B",
  soft: "#2A9CB0",
  light: "#7CCAD6",
  paper: "#F7FAFB",
  text: "#0F172A",
  muted: "#6B7280",
  border: "#E5EEF1",
};

export const kavunMenu: MenuCategory[] = [
  {
    id: "hot",
    label: { en: "Hot Drinks", ar: "مشروبات ساخنة" },
    items: [
      {
        id: "espresso",
        name: { en: "Espresso", ar: "إسبريسو" },
        priceHalf: 55,
        priceFull: 70,
      },
      { id: "americano", name: { en: "Americano", ar: "أمريكانو" }, priceFull: 65 },
      { id: "macchiato", name: { en: "Macchiato", ar: "مكياتو" }, priceFull: 60 },
      { id: "cortado", name: { en: "Cortado", ar: "كورتادو" }, priceFull: 65 },
      { id: "cappuccino", name: { en: "Cappuccino", ar: "كابتشينو" }, priceFull: 80 },
      { id: "flat-white", name: { en: "Flat white", ar: "فلات وايت" }, priceFull: 75 },
      { id: "latte", name: { en: "Latte", ar: "لاتيه" }, priceFull: 85 },
      {
        id: "salted-caramel-latte",
        name: { en: "Salted caramel latte", ar: "لاتيه كراميل مملّح" },
        priceFull: 95,
      },
      { id: "dark-mocha", name: { en: "Dark mocha", ar: "موكا غامقة" }, priceFull: 95 },
      { id: "white-mocha", name: { en: "White mocha", ar: "موكا بيضاء" }, priceFull: 95 },
      { id: "spanish-latte", name: { en: "Spanish Latte", ar: "سبانش لاتيه" }, priceFull: 95 },
      { id: "honey-latte", name: { en: "Honey Latte", ar: "لاتيه عسل" }, priceFull: 95 },
      { id: "pistachio-latte", name: { en: "Pistachio Latte", ar: "لاتيه فستق" }, priceFull: 140 },
      { id: "kardamom", name: { en: "Kardamom", ar: "هيل" }, priceFull: 95 },
      { id: "hot-chocolate", name: { en: "Hot chocolate", ar: "شوكولاتة ساخنة" }, priceFull: 90 },
      { id: "matcha", name: { en: "Matcha", ar: "ماتشا" }, priceFull: 120 },
    ],
  },
  {
    id: "cold",
    label: { en: "Cold Drinks", ar: "مشروبات باردة" },
    items: [
      { id: "iced-americano", name: { en: "Iced Americano", ar: "أمريكانو مثلّج" }, priceFull: 70 },
      { id: "iced-latte", name: { en: "Iced Latte", ar: "لاتيه مثلّج" }, priceFull: 90 },
      { id: "iced-spanish-latte", name: { en: "Iced spanish latte", ar: "سبانش لاتيه مثلّج" }, priceFull: 95 },
      { id: "iced-pistachio-latte", name: { en: "Iced pistachio latte", ar: "لاتيه فستق مثلّج" }, priceFull: 140 },
      {
        id: "iced-shaken-mocha",
        name: { en: "Iced shaken white/dark mocha", ar: "موكا شيكن أبيض/غامق مثلّج" },
        priceFull: 95,
      },
      { id: "hibiscus", name: { en: "Hibiscus", ar: "كركديه" }, priceFull: 90 },
      { id: "iced-matcha", name: { en: "Iced matcha", ar: "ماتشا مثلّجة" }, priceFull: 120 },
    ],
  },
  {
    id: "refreshers",
    label: { en: "Refreshers", ar: "منعشات وعصائر" },
    items: [
      { id: "orange-juice", name: { en: "Orange juice", ar: "عصير برتقال" }, priceFull: 60 },
      { id: "mango-juice", name: { en: "Mango juice", ar: "عصير مانجو" }, priceFull: 75 },
      { id: "spanish-latte-cold", name: { en: "Spanish latte", ar: "سبانش لاتيه" }, priceFull: 120 },
      { id: "mojito", name: { en: "Mojito", ar: "موهيتو" }, priceFull: 100 },
      { id: "cold-brew", name: { en: "Cold brew", ar: "كولد برو" }, priceFull: 100 },
      { id: "water", name: { en: "Water", ar: "ماء" }, priceFull: 15 },
      { id: "sparkling-water", name: { en: "Sparkling water", ar: "ماء غازي" }, priceFull: 45 },
    ],
  },
];
