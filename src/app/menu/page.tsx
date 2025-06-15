"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Leaf, Flame, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SafeImage } from '@/components/common';
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

function MenuCategoryCard({ category, items, viewMode, switchToggled, activeCardId, setActiveCardId, hoveredCardId, setHoveredCardId }: { 
  category: string; 
  items: MenuItem[]; 
  viewMode: 'list' | 'visual';
  switchToggled: boolean;
  activeCardId: number | null;
  setActiveCardId: (id: number | null) => void;
  hoveredCardId: number | null;
  setHoveredCardId: (id: number | null) => void;
}) {
  // Filter items if vegetarian toggle is on
  const filteredItems = switchToggled ? items.filter(item => item.isVegetarian) : items;
  
  return (
    <Card className="bg-charcoal-800/55 border-gold-400/30 shadow-2xl rounded-3xl overflow-hidden">
      <CardContent className="relative z-10 p-8 md:p-12">
        {/* Category Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gold-100 mb-2">
              {category}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
          </div>
          

        </div>

        {/* Menu Items Display */}
        {viewMode === 'list' ? (
          /* List View - Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative">
                {/* Item Card */}
                <div className="bg-charcoal-700/50 rounded-2xl p-6 border border-gold-400/20 hover:border-gold-400/40 transition-all duration-300 hover:shadow-xl">
                  {/* Header with Name and Price */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-3 mb-2">
                        <h3 className="font-display font-bold text-xl md:text-2xl text-gold-100 tracking-tight leading-tight">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          {item.isVegetarian && (
                            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                              <Leaf className="w-3 h-3 text-green-400" />
                            </div>
                          )}
                          {item.isSignature && (
                            <div className="w-6 h-6 bg-gold-400/20 rounded-full flex items-center justify-center border border-gold-400/30">
                              <Star className="w-3 h-3 text-gold-400" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full mb-3" />
                    </div>
                    <div className="text-right ml-6">
                      <span className="text-2xl md:text-3xl font-bold text-gold-100">
                        ${item.price}
                      </span>
                    </div>
                  </div>

                  {/* Region and Spice Level */}
                  <div className="flex flex-wrap items-center gap-6 mb-4">
                    {item.region && (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gold-400/20 rounded-full flex items-center justify-center border border-gold-400/30">
                          <MapPin className="w-2.5 h-2.5 text-gold-400" />
                        </div>
                        <span className="text-gold-300 text-sm font-medium uppercase tracking-wider">
                          {item.region}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-gold-300 text-sm font-medium uppercase tracking-wider">Spice Level</span>
                      <div className="flex items-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <Flame
                            key={i}
                            size={14}
                            className={cn(
                              i < (item.spiceLevel || 0)
                                ? 'text-red-400'
                                : 'text-gold-700/30'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gold-200 text-base leading-relaxed font-light font-serif">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Visual View - Interactive Image Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={
                  cn(
                    "menu-visual-card relative h-[400px] md:h-[540px] rounded-xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-charcoal-900 border transition-all duration-500 flex flex-col justify-end cursor-pointer",
                    activeCardId === item.id ? "ring-2 ring-gold-400 border-gold-400" : "border-gold-700/30"
                  )
                }
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  const newActiveId = activeCardId === item.id ? null : item.id;
                  setActiveCardId(newActiveId);
                  
                  // Trigger header hide/show based on card state (mobile + desktop)
                  if (typeof window !== 'undefined') {
                    if (newActiveId !== null) {
                      // Card is being activated - hide header
                      console.log('🃏 Card activated - hiding header');
                      const hideHeaderEvent = new CustomEvent('hideHeader', {
                        detail: { source: 'cardClick' }
                      });
                      window.dispatchEvent(hideHeaderEvent);
                    } else {
                      // Card is being deactivated - show header
                      console.log('🃏 Card deactivated - showing header');
                      const showHeaderEvent = new CustomEvent('showHeader', {
                        detail: { source: 'cardClick' }
                      });
                      window.dispatchEvent(showHeaderEvent);
                    }
                  }
                }}
                onMouseEnter={() => {
                  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
                  if (isDesktop) {
                    setActiveCardId(item.id);
                    setHoveredCardId(item.id);
                  }
                }}
                onMouseLeave={() => {
                  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
                  if (isDesktop && hoveredCardId === item.id) {
                    setActiveCardId(null);
                    setHoveredCardId(null);
                  }
                }}
              >
                {/* Image with overlays */}
                <div className="absolute inset-0 w-full h-full">
                  <SafeImage
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

                {/* Content Overlay with Blur Effect */}
                <div className={
                  cn(
                    "relative z-10 flex flex-col items-center text-center px-6 py-8 w-full transition-all duration-300",
                    activeCardId === item.id
                      ? "opacity-20 blur-sm pointer-events-none select-none text-gold-50 drop-shadow-[0_2px_16px_rgba(255,215,0,0.25)] brightness-125"
                      : "opacity-100 blur-0 pointer-events-auto select-auto text-gold-100/95 drop-shadow-lg brightness-100"
                  )
                }>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="h-px w-8 bg-gold-400/60" />
                    {item.region && (
                      <span className="text-gold-300 text-xs font-medium tracking-wider uppercase font-serif">
                        {item.region}
                      </span>
                    )}
                    <div className="h-px w-8 bg-gold-400/60" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2 flex items-center justify-center gap-2">
                    {item.name}
                    {item.isVegetarian && (
                      <Leaf className="w-4 h-4 text-green-400" />
                    )}
                    {item.isSignature && (
                      <Star className="w-4 h-4 text-gold-400" />
                    )}
                  </h3>
                  
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <span className="font-serif text-lg font-bold text-gold-200">
                      ${item.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-gold-300 text-xs font-medium uppercase tracking-wider">Spice</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(3)].map((_, i) => (
                          <Flame
                            key={i}
                            size={12}
                            className={cn(
                              i < (item.spiceLevel || 0)
                                ? 'text-gold-400'
                                : 'text-gold-700/40'
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gold-100 text-sm font-serif font-light leading-relaxed max-w-xs mx-auto opacity-90">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center text-gold-400 py-10 font-serif text-lg opacity-70">
            No vegetarian items found in this category.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<string>("View All");
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "visual">("list");
  const [switchToggled, setSwitchToggled] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [showTabs, setShowTabs] = useState<boolean>(true);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const lastScrollY = React.useRef(0);

  // Handle mobile detection on client side
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track header visibility for sticky tabs positioning
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY >= 50) {
        setIsScrolled(true);
        
        // Hide header and tabs when scrolling down, show when scrolling up
        // Add a small threshold to prevent flickering
        if (currentScrollY > lastScrollY.current + 5) {
          setShowHeader(false); // scrolling down - hide header
          setShowTabs(false); // scrolling down - hide tabs
        } else if (currentScrollY < lastScrollY.current - 5) {
          setShowHeader(true); // scrolling up - show header
          setShowTabs(true); // scrolling up - show tabs
        }
      } else {
        setIsScrolled(false);
        setShowHeader(true);
        setShowTabs(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Handle custom hide/show events from card clicks
    const handleHideTabs = (event: CustomEvent) => {
      if (event.detail?.source === 'cardClick') {
        setShowTabs(false);
      }
    };

    const handleShowTabs = (event: CustomEvent) => {
      if (event.detail?.source === 'cardClick') {
        setShowTabs(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hideHeader', handleHideTabs as EventListener);
    window.addEventListener('showHeader', handleShowTabs as EventListener);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hideHeader', handleHideTabs as EventListener);
      window.removeEventListener('showHeader', handleShowTabs as EventListener);
    };
  }, []);

  // Deactivate card on scroll or tap away
  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (activeCardId !== null) setActiveCardId(null);
          ticking = false;
        });
        ticking = true;
      }
    };
    const handleClick = (e: MouseEvent) => {
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
  }, [activeCardId]);

  return (
    <main className="min-h-screen bg-charcoal-900 overflow-x-hidden">
      {/* Sticky Tab Navigation - At top */}
      <div 
        className={`fixed left-0 right-0 bg-charcoal-900/95 backdrop-blur-lg border-b border-gold-700/30 shadow-xl z-30 transition-transform duration-300 ${
          showTabs ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{
          top: showHeader ? '0px' : '0px',
          paddingTop: showHeader ? (isMobile ? '100px' : '140px') : '20px',
          transition: 'padding-top 0.3s ease-in-out, transform 0.3s ease-in-out'
        }}
      >
        <div className="container mx-auto px-6 py-3">
          {/* Mobile Layout */}
          <div className="md:hidden space-y-2">
            {/* Controls for Mobile */}
            <div className="flex items-center justify-between gap-3">
              {/* Vegetarian Filter */}
              <div className="flex items-center gap-2">
                <Leaf className={`w-4 h-4 ${switchToggled ? 'text-green-400 animate-pulse' : 'text-green-500/70'}`} />
                <span className={`text-sm font-serif ${switchToggled ? 'text-green-400' : 'text-gold-300'}`}>
                  Vegetarian Only
                </span>
                <Switch
                  checked={switchToggled}
                  onCheckedChange={setSwitchToggled}
                  className={`border-2 data-[state=checked]:bg-green-500/80 data-[state=unchecked]:bg-charcoal-700 ${
                    switchToggled ? 'border-green-400' : 'border-gold-600'
                  }`}
                  style={{
                    boxShadow: 'none',
                    outline: 'none'
                  }}
                />
              </div>

              {/* View Mode Toggle */}
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(value) => value && setViewMode(value as "list" | "visual")}
                className="bg-charcoal-800/50 rounded-lg p-1"
              >
                <ToggleGroupItem value="list" size="sm" className="text-xs">
                  List
                </ToggleGroupItem>
                <ToggleGroupItem value="visual" size="sm" className="text-xs">
                  Visual
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Category Tabs for Mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeTab === category
                      ? 'bg-gold-500 text-charcoal-900'
                      : 'bg-charcoal-800/50 text-gold-300 hover:bg-charcoal-700/70 hover:text-gold-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between gap-8">
            {/* Category Tabs */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === category
                      ? 'bg-gold-500 text-charcoal-900'
                      : 'bg-charcoal-800/50 text-gold-300 hover:bg-charcoal-700/70 hover:text-gold-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              {/* Vegetarian Filter */}
              <div className="flex items-center gap-3">
                <Leaf className={`w-5 h-5 ${switchToggled ? 'text-green-400 animate-pulse' : 'text-green-500/70'}`} />
                <span className={`text-sm font-serif ${switchToggled ? 'text-green-400' : 'text-gold-300'}`}>
                  Vegetarian Only
                </span>
                <Switch
                  checked={switchToggled}
                  onCheckedChange={setSwitchToggled}
                  className={`border-2 data-[state=checked]:bg-green-500/80 data-[state=unchecked]:bg-charcoal-700 ${
                    switchToggled ? 'border-green-400' : 'border-gold-600'
                  }`}
                  style={{
                    boxShadow: 'none',
                    outline: 'none'
                  }}
                />
              </div>

              {/* View Mode Toggle */}
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(value) => value && setViewMode(value as "list" | "visual")}
                className="bg-charcoal-800/50 rounded-lg p-1"
              >
                <ToggleGroupItem value="list" className="text-sm">
                  List
                </ToggleGroupItem>
                <ToggleGroupItem value="visual" className="text-sm">
                  Visual
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </div>



      {/* Menu Items Section */}
      <section className="relative z-10" style={{ paddingTop: '220px' }}>
        
        {/* Background Pattern - covers the whole menu area, now with even higher opacity */}
        <div 
          className="pointer-events-none absolute inset-0 w-full h-full opacity-40 z-0"
          style={{ 
            backgroundImage: `url('${getImagePath("/form-pattern.png")}')`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'auto'
          }}
        />
        
        <div className="container mx-auto px-6 relative z-10 py-16 md:py-24">
          {activeTab === "View All" ? (
            <div className="space-y-16">
              {Object.entries(processedMenuData).map(([category, data]) => {
                let items: MenuItem[] = [];
                if (Array.isArray(data)) {
                  items = data;
                } else {
                  items = Object.values(data).flat();
                }
                
                if (!items.length) return null;
                
                return (
                  <MenuCategoryCard 
                    key={category} 
                    category={category} 
                    items={items}
                    viewMode={viewMode}
                    switchToggled={switchToggled}
                    activeCardId={activeCardId}
                    setActiveCardId={setActiveCardId}
                    hoveredCardId={hoveredCardId}
                    setHoveredCardId={setHoveredCardId}
                  />
                );
              })}
            </div>
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
              return (
                <MenuCategoryCard 
                  key={activeTab} 
                  category={activeTab} 
                  items={items}
                  viewMode={viewMode}
                  switchToggled={switchToggled}
                  activeCardId={activeCardId}
                  setActiveCardId={setActiveCardId}
                  hoveredCardId={hoveredCardId}
                  setHoveredCardId={setHoveredCardId}
                />
              );
            })()
          )}
        </div>
      </section>
    </main>
  );
}
