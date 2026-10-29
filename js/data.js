/* =========================================================
   All shop content lives here. Edit this file only.
   ========================================================= */

const STORE = {
  name: "Mahadev Prasad Rajesh Kumar Seth Jewellers",
  nameHindi: "महादेव प्रसाद राजेश कुमार सेठ ज्वेलर्स",
  short: "MPRK Seth Jewellers",
  tagline: "Pure gold. Honest weight. Trusted for generations.",
  // PLACEHOLDERS: replace with the shop's real details before launch
  phone: "+91 90000 00000",
  whatsapp: "919000000000",          // country code + number, no + or spaces
  email: "info@sethjewellers.in",
  address: "Main Bazaar Road, Your Town, Bihar 800001",
  hours: "Mon–Sat 10:30 AM – 8:30 PM · Sunday 11 AM – 6 PM",
  mapQuery: "Main Bazaar Road, Bihar",  // used for the Google Maps embed
  since: "1985",                     // year founded (placeholder)
  instagram: "#",
  facebook: "#",
};

/* Today's rates, ₹ per gram. Update every morning. */
const RATES = {
  updated: "29 Oct 2026, 10:30 AM",
  gold24: 7850,
  gold22: 7195,
  gold18: 5890,
  silver: 98,
};

const GST = 0.03; // 3% GST on jewellery (making charges included)

const CATEGORIES = [
  { id: "necklace", name: "Necklaces", img: "images/n6.jpg" },
  { id: "bridal",   name: "Bridal Sets", img: "images/s1.jpg" },
  { id: "earrings", name: "Jhumkas & Earrings", img: "images/e1.jpg" },
  { id: "bangles",  name: "Bangles & Kangan", img: "images/b2.jpg" },
  { id: "rings",    name: "Rings", img: "images/r1.jpg" },
  { id: "chains",   name: "Chains & Pendants", img: "images/c2.jpg" },
];

/* purity: "24K" | "22K" | "18K" | "silver"
   weight: grams · making: % of metal value · stone: fixed ₹ for stones (optional) */
const PRODUCTS = [
  { id: 1,  name: "Rani Haar Temple Necklace", cat: "necklace", img: "images/n6.jpg", purity: "22K", weight: 42.5, making: 12, stone: 18000, tag: "Bestseller" },
  { id: 2,  name: "Kundan Choker Set",          cat: "necklace", img: "images/n5.jpg", purity: "22K", weight: 38.2, making: 14, stone: 22000, tag: "New" },
  { id: 3,  name: "Filigree Bib Necklace",      cat: "necklace", img: "images/n2.jpg", purity: "22K", weight: 31.0, making: 11 },
  { id: 4,  name: "Mangalsutra Bead Chain",     cat: "necklace", img: "images/n1.jpg", purity: "22K", weight: 12.4, making: 10 },
  { id: 5,  name: "Royal Bridal Necklace Set",  cat: "bridal",   img: "images/s1.jpg", purity: "22K", weight: 56.0, making: 13, tag: "Bridal" },
  { id: 6,  name: "Jaali Collar Set",           cat: "bridal",   img: "images/s2.jpg", purity: "22K", weight: 34.8, making: 12 },
  { id: 7,  name: "Antique Jhumka Pair",        cat: "earrings", img: "images/e1.jpg", purity: "22K", weight: 14.6, making: 15, tag: "Bestseller" },
  { id: 8,  name: "Meenakari Floral Studs",     cat: "earrings", img: "images/e4.jpg", purity: "22K", weight: 6.2,  making: 16 },
  { id: 9,  name: "Rose-Gold Sunburst Drops",   cat: "earrings", img: "images/e3.jpg", purity: "18K", weight: 3.8,  making: 14 },
  { id: 10, name: "Teardrop Gold Studs",        cat: "earrings", img: "images/e2.jpg", purity: "22K", weight: 5.1,  making: 12, tag: "New" },
  { id: 11, name: "Ruby Kada Pair",             cat: "bangles",  img: "images/b2.jpg", purity: "22K", weight: 36.0, making: 13, stone: 6500 },
  { id: 12, name: "Everyday Bangle Stack (6)",  cat: "bangles",  img: "images/b1.jpg", purity: "22K", weight: 48.0, making: 9,  tag: "Bestseller" },
  { id: 13, name: "Stone-Set Bridal Kangan",    cat: "bangles",  img: "images/b5.jpg", purity: "22K", weight: 40.5, making: 15, stone: 12000 },
  { id: 14, name: "Woven Gold Cuff",            cat: "bangles",  img: "images/b3.jpg", purity: "22K", weight: 18.2, making: 12 },
  { id: 15, name: "Navratna Cocktail Ring",     cat: "rings",    img: "images/r1.jpg", purity: "22K", weight: 9.4,  making: 14, stone: 7500, tag: "New" },
  { id: 16, name: "Polki Flower Ring",          cat: "rings",    img: "images/r2.jpg", purity: "22K", weight: 7.2,  making: 14, stone: 5200 },
  { id: 17, name: "Couple Wedding Bands",       cat: "rings",    img: "images/r4.jpg", purity: "22K", weight: 10.0, making: 8 },
  { id: 18, name: "Pink Sapphire Halo Ring",    cat: "rings",    img: "images/r5.jpg", purity: "18K", weight: 4.1,  making: 15, stone: 14000 },
  { id: 19, name: "Classic Rope Chain",         cat: "chains",   img: "images/c2.jpg", purity: "22K", weight: 20.0, making: 8 },
  { id: 20, name: "Loop Pendant with Chain",    cat: "chains",   img: "images/n4.jpg", purity: "18K", weight: 6.5,  making: 12 },
  { id: 21, name: "Bamboo Link Chain Set",      cat: "chains",   img: "images/c1.jpg", purity: "22K", weight: 16.8, making: 9 },
  { id: 22, name: "Crossover Kada",             cat: "bangles",  img: "images/b4.jpg", purity: "22K", weight: 15.5, making: 12 },
  { id: 23, name: "Champagne Stone Ring",       cat: "rings",    img: "images/r3.jpg", purity: "18K", weight: 5.6,  making: 14, stone: 9000 },
];
