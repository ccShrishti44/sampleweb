"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  Facebook,
  GraduationCap,
  Info,
  Instagram,
  Linkedin,
  Newspaper,
  ReceiptText,
  School,
  Sparkles,
  Trophy,
  Twitter,
} from "lucide-react";

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

const MOBILE_NAV_LINKS = [
  { name: "Courses", path: "/courses", icon: BookOpen },
  { name: "Colleges", path: "/colleges", icon: School },
  { name: "Admissions", path: "/admissions", icon: ReceiptText },
  { name: "News", path: "/news", icon: Newspaper },
  { name: "Scholarships", path: "/scholarships", icon: Trophy },
  { name: "Trends", path: "/trends-2026", icon: Sparkles },
  { name: "About", path: "/about", icon: Info },
];

const NEWSLETTER_STORAGE_KEY = "eduexpert_newsletter_signups";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [counsellingOpen, setCounsellingOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
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

  function handleNewsletterSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const email = newsletterEmail.trim().toLowerCase();
    if (!email) {
      window.alert("Enter a valid email address.");
      return;
    }

    if (typeof window !== "undefined") {
      const existing = window.localStorage.getItem(NEWSLETTER_STORAGE_KEY);
      const parsed = existing ? (JSON.parse(existing) as string[]) : [];

      if (!parsed.includes(email)) {
        parsed.unshift(email);
        window.localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(parsed));
      }
    }

    setNewsletterEmail("");
    window.alert("You have been registered for newsletter updates.");
  }

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

            <button
              onClick={() => setCounsellingOpen(true)}
              className="lg:hidden rounded-full border border-border/70 bg-white/80 px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
            >
              Counselling
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-24 lg:pb-0">
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/70 bg-white/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-screen-sm items-center gap-2 overflow-x-auto rounded-[28px] border border-border/60 bg-background/90 px-2 py-2 scrollbar-none">
          {MOBILE_NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex min-w-[72px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-semibold transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="whitespace-nowrap">{link.name}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setCounsellingOpen(true)}
            className="flex min-w-[92px] flex-col items-center justify-center gap-1 rounded-2xl bg-foreground px-3 py-2 text-[11px] font-semibold text-background shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <GraduationCap className="h-4 w-4" />
            <span className="whitespace-nowrap">Counselling</span>
          </button>
        </div>
      </nav>

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
              <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  value={newsletterEmail}
                  onChange={(event) => setNewsletterEmail(event.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-accent"
                />
                <button type="submit" className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg font-medium transition-colors">
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
