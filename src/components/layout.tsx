"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Menu,
  Twitter,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { CounsellingForm } from "@/components/counselling-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const NAV_LINKS = [
  { name: 'Courses', path: '/courses' },
  { name: 'Colleges', path: '/colleges' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'News', path: '/news' },
  { name: 'Scholarships', path: '/scholarships' },
  { name: 'Trends 2026', path: '/trends-2026' },
  { name: 'About Us', path: '/about' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [counsellingOpen, setCounsellingOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.sessionStorage.getItem('eduexpert_counselling_modal_seen')) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCounsellingOpen(true);
      window.sessionStorage.setItem('eduexpert_counselling_modal_seen', 'true');
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-foreground">
                Edu<span className="text-accent">Expert</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.path ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => setCounsellingOpen(true)}
                className="ml-4 px-6 py-2.5 rounded-full font-semibold bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Free Counselling
              </button>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-foreground p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-4 pb-6 flex flex-col h-screen overflow-y-auto"
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-xl font-display font-semibold p-4 rounded-xl transition-colors ${
                    pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => setCounsellingOpen(true)}
                className="mt-4 w-full px-6 py-4 rounded-xl font-semibold bg-gradient-primary text-white shadow-lg"
              >
                Get Free Counselling
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        {children}
      </main>

      <Dialog open={counsellingOpen} onOpenChange={setCounsellingOpen}>
        <DialogContent className="flex max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-2xl flex-col rounded-[28px] border border-border/60 bg-white/95 p-0 shadow-2xl backdrop-blur-xl sm:max-h-[85vh] sm:max-w-3xl">
          <DialogHeader className="border-b border-border/60 px-5 py-5 sm:px-6 sm:py-6">
            <DialogTitle className="font-display text-xl sm:text-2xl">Free Counselling</DialogTitle>
            <DialogDescription>
              Tell us what you are targeting and we will help you shortlist the right college path.
            </DialogDescription>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
            <CounsellingForm
              compact
              embedded
              onSuccess={() => setCounsellingOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-foreground text-background pt-16 pb-8 border-t border-border/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-xl tracking-tight text-white">
                  Edu<span className="text-accent">Expert</span>
                </span>
              </Link>
              <p className="text-muted/60 text-sm leading-relaxed">
                Your ultimate compass for higher education. Discover colleges, explore courses, and ignite your career with 10,000+ top institutions in India.
              </p>
              <div className="flex gap-4 pt-2">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="text-muted/60 hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-4 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {['Courses', 'Colleges', 'Admissions', 'Scholarships'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-muted/60 hover:text-accent transition-colors text-sm flex items-center gap-2">
                      <ChevronRight className="w-3 h-3" /> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-4 text-white">Resources</h4>
              <ul className="space-y-3">
                {['News', 'Trends 2026', 'About Us', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === 'About Us' ? '/about' : item === 'Contact' ? '/about#contact-us' : `/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-muted/60 hover:text-accent transition-colors text-sm flex items-center gap-2"
                    >
                      <ChevronRight className="w-3 h-3" /> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-semibold text-lg mb-4 text-white">Stay Updated</h4>
              <p className="text-muted/60 text-sm mb-4">Subscribe to our newsletter for latest admission updates.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent"
                />
                <button className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted/60 text-sm">© 2026 EduExpert Portal. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted/60">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
