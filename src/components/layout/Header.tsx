"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { getImagePath } from "@/lib/imagePath";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Reservations", href: "/reservations" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);

  // Effect for handling scroll events
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          let newIsScrolled = isScrolled;
          let newShowHeader = showHeader;

          if (currentScrollY >= 50) {
            newIsScrolled = true;
            if (currentScrollY > lastScrollY.current) {
              newShowHeader = false; // scrolling down
            } else {
              newShowHeader = true; // scrolling up
            }
          } else {
            newIsScrolled = false;
            newShowHeader = true;
          }

          // Only update state if changed
          if (newIsScrolled !== isScrolled) setIsScrolled(newIsScrolled);
          if (newShowHeader !== showHeader) setShowHeader(newShowHeader);

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Listen for custom events from menu card clicks
    const handleHideHeader = (event: Event) => {
      setShowHeader(false);
    };
    const handleShowHeader = (event: Event) => {
      setShowHeader(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hideHeader', handleHideHeader);
    window.addEventListener('showHeader', handleShowHeader);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hideHeader', handleHideHeader);
      window.removeEventListener('showHeader', handleShowHeader);
    };
  }, [isScrolled, showHeader]);

  // Close menu when clicking on a link
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Top bar */}
      <div className={cn(
        "top-bar hidden md:block text-gold-200 py-2 border-b border-gold-400/20 fixed top-0 left-0 w-full z-40",
        isScrolled ? "bg-charcoal-900 backdrop-blur-sm" : "bg-transparent",
        !showHeader && "transform -translate-y-full"
      )}>
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4 text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>123 Main Street, New York, NY</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-400" />
              <span>Open: 11:00 a.m. - 10:00 p.m.</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+12345678900" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Phone className="w-4 h-4 text-gold-400" />
              <span>+1 (234) 567-8900</span>
            </a>
            <a href="mailto:info@banjara.com" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Mail className="w-4 h-4 text-gold-400" />
              <span>info@banjara.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        ref={headerRef}
        className={cn(
          "banjara-header fixed left-0 w-full z-50 transition-all duration-300 border-b",
          "md:top-[37px]", // Restore offset for desktop so header can animate out of view
          "top-0", // No offset on mobile
          isScrolled 
            ? "active bg-charcoal-900/95 backdrop-blur-lg shadow-elegant border-gold-400/30 py-3 md:py-2" 
            : "bg-transparent border-transparent py-4 md:py-2", // slightly reduced mobile padding
          !showHeader && "hide"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="relative w-20 h-20">
              <Image 
                src={getImagePath("/LOGO.png")} 
                alt="Banjara Logo" 
                fill 
                sizes="80px"
                className="object-contain" 
                priority 
              />
            </div>
          </Link>

          {/* Desktop Navigation (only on lg+) */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "hover-underline text-base font-medium tracking-wider transition-colors duration-300 px-2 py-1",
                      pathname === item.href
                        ? "text-gold-400 active"
                        : "text-white hover:text-gold-400"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button 
              variant="outline" 
              className="ml-4 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal-900 font-semibold px-6 py-2 rounded-full transition-all duration-300"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile: Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="nav-toggle-btn text-gold-400 hover:text-gold-300 p-2"
              onClick={() => setIsOpen(true)}
              aria-label="Open main menu"
            >
              <span className="line line-1"></span>
              <span className="line line-2"></span>
              <span className="line line-3"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "menu-overlay fixed inset-0 z-40 lg:hidden",
          isOpen ? "active" : ""
        )}
        onClick={closeMenu}
      ></div>
      
      {/* Sliding Menu Panel (slides from left) */}
      <div 
        className={cn(
          "mobile-navbar fixed inset-y-0 left-0 z-50 lg:hidden bg-charcoal-900 shadow-xl flex flex-col",
          isOpen ? "active" : ""
        )}
      >
        <div className="flex items-center justify-between p-6">
          <Link href="/" className="relative w-16 h-16" onClick={closeMenu}>
            <Image 
              src={getImagePath("/LOGO.png")} 
              alt="Banjara Logo" 
              fill 
              sizes="64px"
              className="object-contain" 
              loading="eager" 
            />
          </Link>
          <button
            type="button"
            className="text-gold-400 hover:text-gold-300 transition-colors p-2 border border-gold-400/30 rounded-full"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto pt-4 px-6">
          <ul className="space-y-0">
            {navigation.map((item, index) => (
              <li 
                key={item.name} 
                className="mobile-nav-link"
                style={{ "--index": index } as React.CSSProperties}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "mobile-navbar-link block py-4 text-lg font-medium uppercase tracking-wider",
                    pathname === item.href ? "active" : ""
                  )}
                  onClick={closeMenu}
                >
                  <div className="separator h-px w-6 bg-gold-400 mr-2"></div>
                  <span className="span">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="text-center mt-10 mb-6">
            <p className="text-xl font-serif text-gold-400 mb-2">Visit Us</p>
            <address className="text-white/80 not-italic text-sm mb-2">
              123 Main Street, <br />
              New York, NY
            </address>
            <p className="text-white/80 text-sm">Open: 11:00 a.m. - 10:00 p.m.</p>
            
            <div className="my-8 flex items-center justify-center">
              <div className="topbar-separator mx-3"></div>
              <div className="topbar-separator mx-3"></div>
              <div className="topbar-separator mx-3"></div>
            </div>
            
            <p className="text-gold-400/80 text-sm uppercase tracking-wide mb-2">For Reservations</p>
            <a 
              href="tel:+12345678900" 
              className="block text-xl text-white hover:text-gold-400 transition-colors hover-underline mx-auto"
            >
              +1 (234) 567-8900
            </a>
          </div>
        </nav>

        <div className="p-6 border-t border-gold-400/20">
          <Button 
            variant="outline" 
            className="w-full border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-charcoal-900 font-semibold px-6 py-3 rounded-full transition-all duration-300" 
            asChild
          >
            <Link href="/contact" onClick={closeMenu}>Contact Us</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;