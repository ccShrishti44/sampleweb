"use client";
import Image from "next/image";

import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useInView } from 'framer-motion';
import {
  Search, MapPin, BookOpen, Building2, Award,
  ArrowRight, Star, Calendar,
} from 'lucide-react';
import {
  getColleges,
  getNewsArticles,
  getScholarships,
  getStreamPages,
} from "@/lib/services";
import { EduScoreSection } from "@/components/home/eduscore-section";
import { CollegeMatchFinder } from "@/components/home/college-match-finder";
import Waves from '@/components/ui/waves-background';

const COLLEGES = getColleges();
const NEWS = getNewsArticles();
const SCHOLARSHIPS = getScholarships();

/* ─── Animated stat counter ─── */
function StatCounter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 80;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / total;
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * to));
      if (frame >= total) { setVal(to); clearInterval(timer); }
    }, 20);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ─── College Match Finder ─── */
const STREAMS = getStreamPages().map((streamPage) => ({
  slug: streamPage.slug,
  name: streamPage.name,
  count: streamPage.collegeCount,
  image: streamPage.image,
  shortDescription: streamPage.shortDescription,
}));

function StreamFocusScroller() {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const prev = () => setActive((p) => (p > 0 ? p - 1 : STREAMS.length - 1));
  const next = () => setActive((p) => (p < STREAMS.length - 1 ? p + 1 : 0));

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[220px] sm:h-[280px] flex items-center justify-center px-4">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {STREAMS.map((stream, idx) => {
          let distance = ((idx - active) % STREAMS.length + STREAMS.length) % STREAMS.length;
          if (distance > STREAMS.length / 2) distance -= STREAMS.length;

          let xPercent = 0;
          let scale = 1;
          let blur = 0;
          let opacity = 1;
          let zIndex = 30;

          if (distance === 0) {
            xPercent = 0; scale = 1; blur = 0; opacity = 1; zIndex = 30;
          } else if (distance === 1) {
            xPercent = 110; scale = 0.85; blur = 2; opacity = 0.7; zIndex = 20;
          } else if (distance === -1) {
            xPercent = -110; scale = 0.85; blur = 2; opacity = 0.7; zIndex = 20;
          } else if (distance === 2) {
            xPercent = 200; scale = 0.7; blur = 4; opacity = 0.4; zIndex = 10;
          } else if (distance === -2) {
            xPercent = -200; scale = 0.7; blur = 4; opacity = 0.4; zIndex = 10;
          } else {
            xPercent = distance > 0 ? 250 : -250; scale = 0.5; blur = 6; opacity = 0; zIndex = 0;
          }

          return (
            <motion.div
              key={stream.slug}
              initial={false}
              animate={{ x: `${xPercent}%`, scale, filter: `blur(${blur}px)`, opacity, zIndex }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              onClick={() => {
                if (distance === 0) {
                  router.push(`/streams/${stream.slug}`);
                  return;
                }
                setActive(idx);
              }}
              className="absolute w-[200px] sm:w-[260px] h-[220px] sm:h-[260px] rounded-2xl overflow-hidden shadow-xl border border-border cursor-pointer pointer-events-auto will-change-transform group"
            >
              <div className="relative h-full w-full">
                <Image
                  src={stream.image}
                  alt={stream.name}
                  fill
                  sizes="(max-width: 640px) 200px, 260px"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-500 group-hover:opacity-100 opacity-80" />
              </div>

              <div className="absolute inset-0 p-6 flex flex-col items-center justify-end z-10 text-white">
                <h3 className="font-display font-bold text-2xl mb-2.5 drop-shadow-lg tracking-tight">
                  {stream.name}
                </h3>
                <p className="mb-3 text-center text-xs leading-5 text-white/80">
                  {stream.shortDescription}
                </p>
                <div className="text-xs font-semibold text-white/95 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md">
                  {stream.count}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button onClick={prev} aria-label="Previous stream" className="absolute left-0 sm:-left-4 z-40 bg-background/90 hover:bg-muted backdrop-blur p-3 rounded-full shadow-md border border-border shrink-0 transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button onClick={next} aria-label="Next stream" className="absolute right-0 sm:-right-4 z-40 bg-background/90 hover:bg-muted backdrop-blur p-3 rounded-full shadow-md border border-border shrink-0 transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
  );
}

/* ─── Main Home Component ─── */
export default function Home() {
  const [searchStream, setSearchStream] = useState('');

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pb-0">
        {/* Gradient base layer */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/70 via-white/60 to-white dark:from-indigo-950/40 dark:via-background dark:to-background" />
          <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
        </div>

        {/* Waves canvas layer — above gradient, below content */}
        <Waves
          lineColor="hsl(243 75% 59% / 0.18)"
          backgroundColor="transparent"
          waveSpeedX={0.012}
          waveSpeedY={0.004}
          waveAmpX={32}
          waveAmpY={18}
          xGap={12}
          yGap={34}
          friction={0.925}
          tension={0.005}
          maxCursorMove={80}
          style={{ zIndex: 0 }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full pt-28 md:pt-36 pb-24">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 dark:bg-white/10 border border-accent/30 shadow-sm backdrop-blur-sm mb-10 badge-pulse">
            <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="text-sm font-semibold text-foreground">🎓 Admissions 2026 Now Open &mdash; 10,000+ Colleges Listed</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-[5.5rem] font-display font-extrabold tracking-tight leading-[1.08] mb-6">
            Find Your<br /><span className="text-shimmer">Dream College</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-5 leading-relaxed">
            Explore colleges, compare courses, track deadlines, and apply — all in one place. Trusted by over{' '}
            <strong className="text-foreground">2 million students</strong> across India.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32 }}
            className="flex items-center justify-center gap-3 mb-10">
            <div className="flex -space-x-2.5">
              {['https://i.pravatar.cc/32?img=1','https://i.pravatar.cc/32?img=5','https://i.pravatar.cc/32?img=9','https://i.pravatar.cc/32?img=12','https://i.pravatar.cc/32?img=15'].map((src, i) => (
                <Image key={i} src={src} alt="student" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" width={32} height={32} />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">4,200+</span> students enrolled this month
              <span className="ml-2 text-accent font-semibold">★ 4.9</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
            className="max-w-3xl mx-auto glass-card rounded-2xl p-2 md:p-2.5 flex flex-col md:flex-row items-center gap-2.5 mb-5">
            <div className="flex-1 w-full flex items-center bg-muted/40 rounded-xl px-4 py-3">
              <Search className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
              <input type="text" placeholder="Search colleges, courses, exams..."
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground text-sm" />
            </div>
            <div className="w-full md:w-auto flex gap-2.5">
              <select value={searchStream} onChange={e => setSearchStream(e.target.value)}
                className="flex-1 md:flex-none bg-muted/40 rounded-xl px-4 py-3 border-none outline-none text-foreground text-sm cursor-pointer appearance-none">
                <option value="">All Streams</option>
                <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
                <option value="management">Management</option>
                <option value="law">Law</option>
              </select>
              <button className="bg-gradient-primary text-white px-7 py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all whitespace-nowrap">
                Search
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.48 }}
            className="flex justify-center">
            <Link href="/admissions#deadline-calendar"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-border shadow-sm text-sm font-semibold text-foreground hover:text-primary hover:border-primary hover:shadow-md transition-all group">
              <Calendar className="w-4 h-4 text-accent" />
              View Upcoming Deadlines Calendar
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>


      </section>

      {/* STATS MARQUEE */}
      <div className="w-full bg-foreground text-background py-4 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-16 px-8 items-center">
          {[1, 2].map(i => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-3"><Building2 className="text-accent" /><span className="font-display font-semibold text-xl">10,000+ Colleges</span></div>
              <div className="flex items-center gap-3"><BookOpen className="text-accent" /><span className="font-display font-semibold text-xl">5,000+ Courses</span></div>
              <div className="flex items-center gap-3"><Star className="text-accent" /><span className="font-display font-semibold text-xl">2M+ Students Helped</span></div>
              <div className="flex items-center gap-3"><Award className="text-accent" /><span className="font-display font-semibold text-xl">₹50Cr+ Scholarships</span></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <section className="py-16 md:py-24 bg-background overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Where Do You Imagine Yourself?</h2>
            <h3 className="text-muted-foreground max-w-2xl mx-auto">Which among the below closely aligns with your dream picture.</h3>
          </div>
          <StreamFocusScroller />
        </div>
      </section>

      {/* FEATURED COLLEGES */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Colleges</h2>
              <p className="text-muted-foreground">Top ranked institutions across India</p>
            </div>
            <Link href="/colleges" className="hidden md:flex items-center text-primary font-semibold hover:text-accent transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="flex overflow-x-auto pb-12 -mx-4 px-4 snap-x gap-6 hide-scrollbar">
            {COLLEGES.slice(0, 5).map(college => (
              <motion.div key={college.id} whileHover={{ y: -10 }}
                className="min-w-[280px] max-w-[280px] md:min-w-[320px] md:max-w-[320px] snap-center bg-card rounded-3xl overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all group">
                <div className="relative h-44 md:h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <Image
                    src={college.image}
                    alt={college.name}
                    fill
                    sizes="(max-width: 767px) 280px, 320px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">{college.rank}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <h3 className="font-display font-bold text-xl mb-1">{college.name}</h3>
                    <p className="text-sm flex items-center gap-1 opacity-90"><MapPin className="w-3 h-3" /> {college.city}</p>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{college.category}</span>
                    <span className="flex items-center gap-1 text-sm font-bold"><Star className="w-4 h-4 fill-accent text-accent" /> {college.rating}</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Fees:</span>
                      <span className="font-semibold text-foreground">{college.fees}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Exams:</span>
                      <span className="font-semibold text-foreground">{college.cutoff.split(' ')[0]}</span>
                    </div>
                  </div>
                  <Link
                    href={`/colleges/${college.slug}`}
                    className="flex w-full items-center justify-center py-3 rounded-xl font-semibold border-2 border-border text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <EduScoreSection />

      {/* ── FIND YOUR PERSONAL MATCH ── */}
      <CollegeMatchFinder />

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Trusted Across India</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">The numbers that prove why students trust EduExpert for the most important decision of their life.</p>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { to: 10000, suffix: '+', label: 'Colleges Listed', icon: '🏛️', color: 'bg-blue-50 text-blue-600 border-blue-100' },
              { to: 2000000, suffix: '+', label: 'Students Helped', icon: '🎓', color: 'bg-violet-50 text-violet-600 border-violet-100' },
              { to: 98, suffix: '%', label: 'Satisfaction Rate', icon: '⭐', color: 'bg-amber-50 text-amber-600 border-amber-100' },
              { to: 500, suffix: 'Cr+', prefix: '₹', label: 'Scholarships Disbursed', icon: '💰', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border p-5 md:p-6 text-center ${s.color}`}>
                <div className="text-3xl md:text-4xl mb-2">{s.icon}</div>
                <div className="text-2xl md:text-4xl font-display font-extrabold mb-1">
                  <StatCounter to={s.to} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <p className="text-sm font-semibold opacity-75">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial mini row */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Priya Menon', college: 'IIT Bombay, B.Tech CSE', quote: 'EduExpert helped me compare 30+ colleges in a day. Found IIT Bombay through the matcher — couldn\'t be happier!', avatar: 'https://i.pravatar.cc/48?img=5', stars: 5 },
              { name: 'Rahul Verma', college: 'IIM Ahmedabad, MBA', quote: 'The EduScore feature predicted my CAT percentile accurately. Applied to the right colleges and got in!', avatar: 'https://i.pravatar.cc/48?img=3', stars: 5 },
              { name: 'Sneha Patil', college: 'AIIMS Delhi, MBBS', quote: 'Found scholarships worth ₹80,000 I didn\'t know existed. The deadline tracker was a lifesaver.', avatar: 'https://i.pravatar.cc/48?img=9', stars: 5 },
            ].map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex text-accent text-sm mb-3">{'★'.repeat(t.stars)}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-border" width={40} height={40} />
                  <div>
                    <p className="font-bold text-sm text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.college}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS & SCHOLARSHIPS */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 md:gap-16">
          <div>
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-3xl font-display font-bold">Latest Updates</h2>
              <Link href="/news" className="text-primary font-semibold hover:underline">See All</Link>
            </div>
            <div className="space-y-6">
              {NEWS.slice(0, 3).map(article => (
                <div key={article.id} className="group">
                  <Link href={`/news/${article.slug}`} className="flex gap-4">
                    <div className="relative h-20 w-24 md:h-24 md:w-32 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 767px) 96px, 128px"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div>
                    <span className="text-xs font-bold text-accent mb-1 block">{article.category}</span>
                    <h3 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 md:mt-2">{article.date}</p>
                  </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mt-12 lg:mt-0 mb-6 md:mb-8">
              <h2 className="text-3xl font-display font-bold">Top Scholarships</h2>
              <Link href="/scholarships" className="text-primary font-semibold hover:underline">See All</Link>
            </div>
            <div className="space-y-4">
              {SCHOLARSHIPS.slice(0, 4).map(s => (
                <div key={s.id} className="bg-muted/50 p-4 md:p-5 rounded-2xl border border-border/50 hover:bg-white dark:hover:bg-gray-900 hover:shadow-lg transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{s.name}</h3>
                    <span className="font-bold text-accent whitespace-nowrap ml-4">{s.amount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">{s.eligibility}</span>
                    <span className="text-xs font-medium px-2 py-1 bg-red-100 text-red-700 rounded-md">Ends: {s.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[28px] border border-primary/12 bg-primary/[0.05] px-6 py-10 text-center shadow-sm sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
              Contact Us
            </p>
            <h2 className="mt-4 text-3xl font-display font-bold text-foreground sm:text-4xl">
              Need help with shortlisting or counselling?
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Reach out through our contact section and get direct guidance on courses, colleges, exams, and admissions.
            </p>
            <Link
              href="/about#contact-us"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

