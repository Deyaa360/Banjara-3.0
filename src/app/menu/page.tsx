"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Leaf, Flame, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getImagePath } from "@/lib/imagePath";

// Menu item type
interface MenuItem {
  id: number;
  name: string;
  region?: string;
  description: string;
  price: number;
  isVegetarian: boolean;
  spiceLevel?: number;
  isSignature?: boolean;
  image: string;
}

// MenuData type
interface MenuData {
  [category: string]:
    | MenuItem[]
    | {
        [subCategory: string]: MenuItem[];
      };
}

// Optimized menu data structure
const menuData: MenuData = {
  "Sharing Plates": {
    "Vegetarian": [
      {
        id: 1,
        name: "Mauryaji Basket Chaat",
        region: "Varanasi",
        description: "Green gram, black chickpeas, potato, tamarind, mint yogurt mousse, and pomegranate caviar",
        price: 16,
        isVegetarian: true,
        spiceLevel: 2,
        isSignature: true,
        image: "/images/menu/MauryaJi Basket Chaat.png"
      },
      {
        id: 2,
        name: "Gupchup",
        region: "Odisha", 
        description: "Wheat ball, potato, yellow peas, green chilli, black salt, roasted cumin, mint, and black plum",
        price: 14,
        isVegetarian: true,
        spiceLevel: 2,
        image: "/images/menu/GUPCHUP (ODISHA).png"
      },
      {
        id: 3,
        name: "Beet and Goat Cheese Chop",
        region: "Kolkata",
        description: "Red beets, goat cheese, carrot, peanut, potato, and red habanero sauce",
        price: 18,
        isVegetarian: true,
        spiceLevel: 1,
        image: "/images/menu/BEET AND GOAT CHEESE CHOP (KOLKATA).png"
      },
      {
        id: 4,
        name: "Dahi Ke Kebab",
        region: "Lucknow",
        description: "Hung yogurt, bell pepper, fried onion, cashew, Amul cheese, chilli, kataifi, and apricot chutney",
        price: 17,
        isVegetarian: true,
        spiceLevel: 2,
        image: "/images/menu/DAHI KE KEBAB (LUCKNOW).png"
      }
    ],
    "Non-Vegetarian": [
      {
        id: 5,
        name: "Jhol Momo",
        region: "Arunachal Pradesh",
        description: "Minced chicken, soy sauce, ginger, chilli oil curry, and crispy nori",
        price: 19,
        isVegetarian: false,
        spiceLevel: 3,
        image: "/images/menu/JHOL MOMO (ARUNANCHAL PRADESH).png"
      },
      {
        id: 6,
        name: "Guntur Chilli Chicken Bao",
        region: "Andhra Pradesh",
        description: "Bao bun, chicken, bell pepper, shallots, soy Guntur chilli, pickled red cabbage, scallion, and a rasam shot",
        price: 21,
        isVegetarian: false,
        spiceLevel: 3,
        image: "/images/menu/GUNTUR CHILLI CHICKEN BAO (ARUNANCHAL PRADESH).png"
      },
      {
        id: 7,
        name: "Galauti Kebab",
        region: "Lucknow",
        description: "Minced goat, vetiver, rosewater ghee, fried onion, cardamom, mint chutney, and warqi paratha",
        price: 24,
        isVegetarian: false,
        spiceLevel: 2,
        isSignature: true,
        image: "/images/menu/GALAUTI KEBAB (LUCKNOW).png"
      },
      {
        id: 8,
        name: "Aslam Tikka",
        region: "Delhi",
        description: "Chicken thigh, cream, butter, Amul cheese, and chaat masala",
        price: 22,
        isVegetarian: false,
        spiceLevel: 2,
        image: "/images/menu/ASLAM TIKKA (DELHI).png"
      },
      {
        id: 9,
        name: "Lamb Chop",
        region: "Kashmir",
        description: "New Zealand lamb, masala onion, and walnut chutney",
        price: 28,
        isVegetarian: false,
        spiceLevel: 2,
        isSignature: true,
        image: "/images/menu/LAMB CHOP (KASHMIR).jpg"
      },

    ]
  },
  "Large Plates": {
    "Vegetarian": [
      {
        id: 14,
        name: "Burata Haak",
        region: "Kashmir",
        description: "Spinach, dandelion green, garlic confit, and burrata",
        price: 22,
        isVegetarian: true,
        spiceLevel: 1,
        isSignature: true,
        image: "/images/menu/BURATA HAAK (KASHMIR).png"
      },
      {
        id: 15,
        name: "Litti Chokha",
        region: "Bihar",
        description: "Whole wheat, roasted Bengal gram, and eggplant",
        price: 18,
        isVegetarian: true,
        spiceLevel: 2,
        image: "/images/menu/LITTI CHOKHA (BIHAR).png"
      },
      {
        id: 16,
        name: "Dal Makhni",
        region: "Delhi",
        description: "Black urad, cream, and butter",
        price: 19,
        isVegetarian: true,
        spiceLevel: 1,
        image: "/images/menu/DAL MAKHNI (DELHI).png"
      },
      {
        id: 17,
        name: "Paneer Pinwheel Makhni",
        region: "Punjab",
        description: "Tomato gravy, butter powder, and nuts",
        price: 21,
        isVegetarian: true,
        spiceLevel: 1,
        image: "/images/menu/PANEER PINWHEEL MAKHNI (PUNJAB).png"
      }
    ],
    "Non-Vegetarian": [
      {
        id: 19,
        name: "Butter Chicken",
        region: "Punjab",
        description: "Tomato gravy, nuts, cream, and butter powder",
        price: 28,
        isVegetarian: false,
        spiceLevel: 1,
        isSignature: true,
        image: "/images/menu/BUTTER CHICKEN (PUNJAB).png"
      },
      {
        id: 20,
        name: "Goan Fish Curry",
        region: "Goa",
        description: "Seabass, kokum, and coconut milk",
        price: 26,
        isVegetarian: false,
        spiceLevel: 2,
        image: "/images/menu/GOAN FISH CURRY.png"
      },
      {
        id: 21,
        name: "Laal Maas",
        region: "Rajasthan",
        description: "Smoked goat, Mathania chilli, and yogurt",
        price: 29,
        isVegetarian: false,
        spiceLevel: 3,
        isSignature: true,
        image: "/images/menu/LAAL MAAS (RAJHJASTHAN).png"
      },
      {
        id: 23,
        name: "Nalli Biryani",
        region: "Hyderabad",
        description: "Lamb shank, saffron, mint, and yogurt",
        price: 34,
        isVegetarian: false,
        spiceLevel: 2,
        isSignature: true,
        image: "/images/menu/NALLI BIRYANI (HYDERABAD).png"
      }
    ]
  },
  "Breads": [
    {
      id: 24,
      name: "GARLIC NAAN",
      description: "Traditional garlic-infused bread",
      price: 6,
      isVegetarian: true,
      image: "/images/menu/GARLIC NAAN.png"
    },
    {
      id: 25,
      name: "LAAL NAAN",
      description: "Spiced red chilli naan",
      price: 7,
      isVegetarian: true,
      image: "/images/menu/LAAL NAAN.png"
    },
    {
      id: 26,
      name: "LACCHA PARATHA",
      description: "Layered flaky bread",
      price: 6,
      isVegetarian: true,
      image: "/images/menu/LACCHA PARATHA.png"
    },
    {
      id: 27,
      name: "TRUFFLE GOAT CHEESE KULCHA",
      description: "Truffle and goat cheese stuffed bread",
      price: 12,
      isVegetarian: true,
      image: "/images/menu/TRUFFLE GOAT CHEESE KULCHA.png"
    },
    {
      id: 28,
      name: "KEEMA KULCHA",
      description: "Minced meat stuffed bread",
      price: 10,
      isVegetarian: false,
      image: "/images/menu/KEEMA KULCHA.png"
    }
  ],
  "Sides": [
    {
      id: 29,
      name: "ASSORTED PAPAD",
      description: "Arbi chips, nadrukhakhra sabudana, smoked tomato chutney, pineapple chutney, and walnut chutney",
      price: 8,
      isVegetarian: true,
      image: "/images/menu/ASSORTED PAPAD.png"
    },
    {
      id: 30,
      name: "JEERA RICE",
      description: "Cumin-scented basmati rice",
      price: 7,
      isVegetarian: true,
      image: "/images/menu/JEERA RICE.png"
    }
  ]
};

const signatureDishes: Array<{ name: string; description: string; image: string; region: string }> = [
  {
    name: "Butter Chicken",
    description:
      "A royal dish from the kitchens of Punjab, featuring tender chicken in a rich tomato gravy, finished with cream and butter powder.",
    image: getImagePath("/images/menu/BUTTER CHICKEN (PUNJAB).png"),
    region: "Punjab",
  },
  {
    name: "Galauti Kebab",
    description:
      "Minced goat, vetiver, rosewater ghee, fried onion, cardamom, mint chutney",
    image: getImagePath("/images/menu/GALAUTI KEBAB (LUCKNOW).png"),
    region: "Lucknow",
  },
  {
    name: "Nalli Biryani",
    description: "Lamb shank, saffron, mint, and yogurt",
    image: getImagePath("/images/menu/NALLI BIRYANI (HYDERABAD).png"),
    region: "Hyderabad",
  },
];

// Process all menu images to use getImagePath
const processMenuImages = (data: MenuData): MenuData => {
  const result: MenuData = {};
  
  Object.entries(data).forEach(([category, items]) => {
    if (Array.isArray(items)) {
      // Simple array of items
      result[category] = items.map(item => ({
        ...item,
        image: getImagePath(item.image)
      }));
    } else {
      // Object with subcategories
      result[category] = {} as { [key: string]: MenuItem[] };
      Object.entries(items).forEach(([subCategory, subItems]) => {
        (result[category] as { [key: string]: MenuItem[] })[subCategory] = subItems.map(item => ({
          ...item,
          image: getImagePath(item.image)
        }));
      });
    }
  });
  
  return result;
};

// Process all menu images
const processedMenuData = processMenuImages(menuData);

const categories: string[] = ["View All", ...Object.keys(menuData)];

const GoldAccentDivider = () => (
  <div className="flex items-center justify-center my-16">
    <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold-500/60" />
    <div className="mx-4 flex items-center gap-2">
      <div className="w-2 h-2 bg-gold-500 rounded-full shadow-lg" />
      <div className="w-1 h-1 bg-gold-400 rounded-full" />
      <div className="w-3 h-3 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full shadow-lg" />
      <div className="w-1 h-1 bg-gold-400 rounded-full" />
      <div className="w-2 h-2 bg-gold-500 rounded-full shadow-lg" />
    </div>
    <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold-500/60" />
  </div>
);

function MenuListItem({ item }: { item: MenuItem }) {
  return (
    <div className="py-8 md:py-16 group">
      {/* Top gold accent line */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gold-700/30 to-transparent mb-5 md:mb-7" />
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
        {/* Main info and price in a row */}
        <div className="flex-1 order-3 md:order-2 flex flex-col justify-center">
          <div className="flex flex-row items-start md:items-center gap-3 md:gap-4 mb-2">
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center flex-wrap gap-2">
                <span
                  className="font-display font-extrabold text-xl md:text-4xl bg-gradient-to-r from-gold-200 via-gold-100 to-gold-400 bg-clip-text text-transparent tracking-tight leading-tight"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {item.name}
                </span>
                <div className="flex items-center gap-1">
                  {item.isVegetarian && (
                    <Leaf className="w-4 h-4 text-green-500" />
                  )}
                  {item.isSignature && (
                    <Star className="w-4 h-4 text-gold-400" />
                  )}
                </div>
              </div>
              <div className="w-10 md:w-14 h-0.5 bg-gradient-to-r from-gold-400/60 to-gold-700/10 rounded-full mt-1 mb-0" />
            </div>
            {/* Price, right-aligned with the title */}
            <span className="font-serif text-base md:text-lg font-normal text-gold-200/40 tracking-wide opacity-60 text-right min-w-[50px] md:min-w-[80px] mt-1 md:mt-0">
              ${item.price}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-1 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-gold-300 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em]">Spice</span>
              <div className="flex items-center gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <Flame
                    key={i}
                    size={12}
                    className={cn(
                      i < (item.spiceLevel || 0)
                        ? 'text-gold-400'
                        : 'text-gold-700/30'
                    )}
                  />
                ))}
              </div>
            </div>
            {item.region && (
              <div className="flex items-center gap-1 text-gold-400 text-[10px] md:text-[11px] uppercase font-semibold tracking-[0.18em]">
                <MapPin className="w-3 h-3" />
                {item.region}
              </div>
            )}
          </div>
          <div className="text-gold-100/95 text-sm md:text-xl font-serif font-light italic mt-2 md:mt-3 leading-relaxed tracking-wide max-w-2xl">
            {item.description}
          </div>
        </div>
      </div>
      {/* Bottom gold accent line */}
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-gold-700/30 to-transparent mt-6 md:mt-8" />
    </div>
  );
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<string>("View All");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "visual">("list");
  const [switchToggled, setSwitchToggled] = useState<boolean>(false);

  // Deactivate card on scroll or tap away
  React.useEffect(() => {
    const handleScroll = () => setActiveCardId(null);
    const handleClick = (e: MouseEvent) => {
      // Only deactivate if click is outside any card
      if (!(e.target as HTMLElement).closest('.menu-visual-card')) {
        setActiveCardId(null);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClick);
    };
  }, []);

  // Helper to render a category or subcategory as a text list
  function renderMenuList(items: MenuItem[]) {
    // Filter items if vegetarian toggle is on
    const filteredItems = switchToggled ? items.filter(item => item.isVegetarian) : items;
    
    return (
      <div className="divide-y divide-gold-700/20">
        {filteredItems.map((item) => (
          <MenuListItem key={item.id} item={item} />
        ))}
        {items.length === 0 && (
          <div className="text-center text-gold-400 py-10 font-serif text-lg opacity-70">No items found.</div>
        )}
      </div>
    );
  }

  // Helper to render visual mode cards
  function renderMenuVisualCards(
    items: MenuItem[],
    activeCardId: number | null,
    setActiveCardId: (id: number | null) => void,
    hoveredCardId: number | null,
    setHoveredCardId: (id: number | null) => void
  ) {
    // Filter items if vegetarian toggle is on
    const filteredItems = switchToggled ? items.filter(item => item.isVegetarian) : items;
    
    if (filteredItems.length === 0) {
      return <div className="text-center text-gold-400 py-10 font-serif text-lg opacity-70">No items found.</div>;
    }
    // Only activate on hover for desktop
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            id={`menu-card-${item.id}`}
            className={
              cn(
                "menu-visual-card relative h-[400px] md:h-[540px] rounded-xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-charcoal-900 border transition-all duration-500 flex flex-col justify-end cursor-pointer",
                activeCardId === item.id ? "ring-2 ring-gold-400 border-gold-400" : "border-gold-700/30"
              )
            }
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              setActiveCardId(activeCardId === item.id ? null : item.id);
            }}
            onMouseEnter={() => {
              if (isDesktop) {
                setActiveCardId(item.id);
                setHoveredCardId(item.id);
              }
            }}
            onMouseLeave={() => {
              if (isDesktop && hoveredCardId === item.id) {
                setActiveCardId(null);
                setHoveredCardId(null);
              }
            }}
          >
            {/* Image with overlays */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className={
                  cn(
                    "object-cover transition-transform duration-700",
                    activeCardId === item.id ? "scale-110 brightness-125" : "scale-100 brightness-75"
                  )
                }
                sizes="(max-width: 1024px) 100vw, 400px"
              />
              {/* Gradient overlays */}
              <div
                className={
                  cn(
                    "absolute inset-0 transition-all duration-500 bg-gradient-to-b",
                    activeCardId === item.id
                      ? "from-black/60 via-black/20 to-black/60"
                      : "from-black/80 via-black/40 to-black/80"
                  )
                }
              />
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 via-transparent to-gold-600/10 pointer-events-none" />
            </div>
            {/* Decorative Corners */}
            <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-gold-400/30 rounded-tr-2xl" />
            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-gold-400/30 rounded-bl-2xl" />
            {/* Content Overlay */}
            <div className={
              cn(
                "relative z-10 flex flex-col items-center text-center px-6 py-8 w-full transition-all duration-300",
                activeCardId === item.id
                  ? "opacity-20 blur-sm pointer-events-none select-none text-gold-50 drop-shadow-[0_2px_16px_rgba(255,215,0,0.25)] brightness-125"
                  : "opacity-100 blur-0 pointer-events-auto select-auto text-gold-100/95 drop-shadow-lg brightness-100"
              )
            }>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-gold-400" />
                {item.region && (
                  <span className="text-gold-400 text-xs font-medium tracking-wider uppercase font-serif drop-shadow-lg transition-all duration-300">
                    {item.region}
                  </span>
                )}
                <div className="h-px w-8 bg-gold-400" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 drop-shadow-lg flex items-center justify-center gap-2 transition-all duration-300">
                {item.name}
                {item.isVegetarian && (
                  <Leaf className="w-5 h-5 text-green-400" />
                )}
                {item.isSignature && (
                  <Star className="w-5 h-5 text-gold-400" />
                )}
              </h3>
              <div className="flex items-center justify-center gap-2 mb-2 transition-all duration-300">
                <span className="font-serif text-base font-normal text-gold-200/80 tracking-wide opacity-80">${item.price}</span>
                <span className="text-gold-300 text-xs font-semibold uppercase tracking-[0.18em] ml-2">Spice</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <Flame
                      key={i}
                      size={15}
                      className={cn(
                        i < (item.spiceLevel || 0)
                          ? 'text-gold-400'
                          : 'text-gold-700/30'
                      )}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gold-100/95 text-base md:text-lg font-serif font-light italic leading-relaxed tracking-wide max-w-xs mb-6 drop-shadow-lg transition-all duration-300">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-charcoal-900 relative overflow-x-hidden">
        {/* Decorative Background Overlays - removed overlays for clear texture */}
        {/* Hero Section - Minimal Menu Banner */}
        <section className="relative min-h-[20vh] flex items-center justify-center overflow-hidden bg-transparent pt-24 md:pt-32">
          {/* Decorative gold accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-br from-gold-400/30 to-transparent rounded-full blur-2xl z-0 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto text-center px-6 py-10">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold-400" />
              <span className="text-gold-400 font-display text-5xl md:text-7xl font-bold tracking-[0.2em] uppercase drop-shadow-lg">
                Menu
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold-400" />
            </div>
            <p className="text-base md:text-lg text-gold-100 font-light leading-relaxed max-w-xl mx-auto mt-2 font-serif">
              Browse by category, read about each dish, and let us know if you have any questions or preferences.
            </p>
          </div>
          {/* Visual Mode Switch - hidden on mobile, visible on desktop */}
          <div className="hidden md:flex absolute top-6 right-6 z-[100] items-center gap-2">
            <span className="text-gold-300 text-sm font-serif mr-1">Visual Mode</span>
            <button
              type="button"
              aria-pressed={viewMode === 'visual'}
              onClick={() => setViewMode(viewMode === 'visual' ? 'list' : 'visual')}
              className={
                'relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none ' +
                (viewMode === 'visual' ? 'bg-gradient-to-r from-gold-400 to-gold-500' : 'bg-gold-700/30')
              }
              style={{ outline: 'none' }}
            >
              <span
                className={
                  'absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-300 bg-gold-200 transform ' +
                  (viewMode === 'visual' ? 'translate-x-5' : 'translate-x-0')
                }
              ></span>
            </button>
            <span className="text-xs text-gold-400 font-serif ml-2">(Slower)</span>
          </div>
        </section>
        {/* Redesigned tab bar for categories */}
        <section className="bg-charcoal-900/95 backdrop-blur-lg border-b border-gold-700/30 sticky top-0 z-40 shadow-xl">
          {/* Mobile view - Tabs as scrollable row with toggle at right */}
          <div className="md:hidden container mx-auto px-2 py-3">
            <div className="flex items-center justify-between gap-3 mb-2">
              {/* Vegetarian filter toggle for mobile - moved to left */}
              <div className="flex items-center gap-2">
                <Leaf className={`w-4 h-4 ${switchToggled ? 'text-green-400 animate-pulse' : 'text-green-500/70'}`} />
                <span className={`text-xs font-serif ${switchToggled ? 'text-green-400' : 'text-gold-300'}`}>
                  Veg Only
                </span>
                <button
                  type="button"
                  className={`relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none ${
                    switchToggled ? 'bg-gradient-to-r from-green-700 to-green-500' : 'bg-gold-700/30'
                  }`}
                  style={{ outline: 'none' }}
                  onClick={() => setSwitchToggled(!switchToggled)}
                  aria-label="Show vegetarian items only"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full shadow-md transition-transform duration-300 bg-gold-200 transform ${
                      switchToggled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>
              
              {/* View mode toggle for mobile */}
              <div className="flex items-center gap-2">
                <span className="text-gold-300 text-xs font-serif">Visual</span>
                <button
                  type="button"
                  aria-pressed={viewMode === 'visual'}
                  onClick={() => setViewMode(viewMode === 'visual' ? 'list' : 'visual')}
                  className={
                    'relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none ' +
                    (viewMode === 'visual' ? 'bg-gradient-to-r from-gold-400 to-gold-500' : 'bg-gold-700/30')
                  }
                  style={{ outline: 'none' }}
                >
                  <span
                    className={
                      'absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-300 bg-gold-200 transform ' +
                      (viewMode === 'visual' ? 'translate-x-5' : 'translate-x-0')
                    }
                  ></span>
                </button>
              </div>
            </div>
            
            {/* Custom scroll container with elegant indicator */}
            <div className="relative mt-2">
              {/* Ultra-thin elegant scroll indicator with animation */}
              <div className="absolute bottom-0 left-0 w-full overflow-hidden h-[1px]">
                <div className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-gradient-to-r from-transparent via-gold-400/10 to-transparent"></div>
                <div className="absolute bottom-0 left-[-100%] h-[0.5px] w-[200%] animate-shine">
                  <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-gold-400/30 to-transparent"></div>
                </div>
              </div>
              
              {/* Scrollable tabs with hidden native scrollbar */}
              <div className="flex overflow-x-auto no-scrollbar"
                style={{ WebkitOverflowScrolling: 'touch', paddingBottom: '6px' }}
                onScroll={(e) => e.stopPropagation()}>
                <div className="flex gap-3 pb-1 pl-1" style={{ paddingRight: '20px' }}>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className={cn(
                      "px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap border transition-all duration-300 tracking-wide font-serif flex-shrink-0",
                      activeTab === category
                        ? "bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-900 border-gold-500 shadow-lg"
                        : "bg-charcoal-800 text-gold-400 border-gold-700/40 hover:bg-charcoal-700 hover:text-gold-300"
                    )}
                    onClick={() => setActiveTab(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            </div>
          </div>
          
          {/* Desktop view - Tabs as flex row with toggle at right */}
          <div className="hidden md:flex container mx-auto px-6 py-4 items-center justify-between">
            <div className="flex gap-3 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-base font-semibold whitespace-nowrap border-2 transition-all duration-300 tracking-wide font-serif",
                    activeTab === category
                      ? "bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-900 border-gold-500 shadow-lg scale-105"
                      : "bg-charcoal-800 text-gold-400 border-gold-700/40 hover:bg-charcoal-700 hover:text-gold-300"
                  )}
                  onClick={() => setActiveTab(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Vegetarian filter toggle for desktop */}
            <div className="flex items-center gap-3 ml-6">
              <Leaf className={`w-4 h-4 ${switchToggled ? 'text-green-400 animate-pulse' : 'text-green-500/70'}`} />
              <span className={`text-sm font-serif ${switchToggled ? 'text-green-400' : 'text-gold-300'}`}>
                Vegetarian Only
              </span>
              <button
                type="button"
                className={`relative w-10 h-5 rounded-full transition-colors duration-300 focus:outline-none ${
                  switchToggled ? 'bg-gradient-to-r from-green-700 to-green-500' : 'bg-gold-700/30'
                }`}
                style={{ outline: 'none' }}
                onClick={() => setSwitchToggled(!switchToggled)}
                aria-label="Show vegetarian items only"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full shadow-md transition-transform duration-300 bg-gold-200 transform ${
                    switchToggled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </section>
        {/* Menu Items Section - unified background, no dividers */}
        <section id="menu" className="py-10 md:py-20 relative z-10">
          <div className="container mx-auto px-4 md:px-6">
            {activeTab === "View All" ? (
              Object.entries(processedMenuData).map(([cat, data]) => {
                let items: MenuItem[] = [];
                if (Array.isArray(data)) items = data;
                else items = Object.values(data).flat();
                
                if (!items.length) return null;
                return (
                  <div key={cat} className="mb-20">
                    {/* Section Title with Gold PNG Divider, vertically centered */}
                    <div className="flex flex-col items-center mb-8">
                      <h2 className="font-serif text-3xl md:text-4xl font-light text-gold-100 text-center mb-2">
                        {cat}
                      </h2>
                      <img
                        src={getImagePath("/images/line-divider.png")}
                        alt=""
                        className="mx-auto"
                        style={{
                          width: "min(200px, 80vw)",
                          height: "auto"
                        }}
                      />
                    </div>
                    {/* Show correct view mode */}
                    {viewMode === "list"
                      ? renderMenuList(items)
                      : renderMenuVisualCards(items, activeCardId, setActiveCardId, hoveredCardId, setHoveredCardId)}
                  </div>
                );
              })
            ) : (
              (() => {
                const data = processedMenuData[activeTab];
                if (!data) return null;
                let items: MenuItem[] = [];
                if (Array.isArray(data)) {
                  items = data;
                } else {
                  items = Object.values(data).flat();
                }
                
                if (!items.length) return null;
                return viewMode === "list"
                  ? renderMenuList(items)
                  : renderMenuVisualCards(items, activeCardId, setActiveCardId, hoveredCardId, setHoveredCardId);
              })()
            )}
          </div>
        </section>
      </main>
    </>
  );
}
