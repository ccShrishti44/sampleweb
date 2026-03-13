import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Search, MapPin, BookOpen, Building2, Award, PlayCircle,
  ArrowRight, CheckCircle2, Star, ChevronRight, Calendar, Sparkles,
} from 'lucide-react';
import { COLLEGES, COURSES, NEWS, SCHOLARSHIPS } from '@/lib/data';

/* ─── Waves ─── */
function WavesBackground() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
      <svg className="relative block w-[calc(200%+1.3px)] h-[70px] md:h-[110px]"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
        <defs>
          <path id="hero-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
        </defs>
        <g>
          <use href="#hero-wave" x="48" y="0" className="wave-1" style={{ fill: 'hsl(243 75% 59% / 0.07)' }} />
          <use href="#hero-wave" x="48" y="3" className="wave-2" style={{ fill: 'hsl(243 75% 59% / 0.05)' }} />
          <use href="#hero-wave" x="48" y="5" className="wave-3" style={{ fill: 'hsl(24 95% 53% / 0.04)' }} />
          <use href="#hero-wave" x="48" y="7" className="wave-4" style={{ fill: 'hsl(243 75% 59% / 0.03)' }} />
        </g>
      </svg>
    </div>
  );
}

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
type MatchStep = 'cta' | 'register' | 'prefs' | 'matching' | 'result';

function CollegeMatchFinder() {
  const [step, setStep] = useState<MatchStep>('cta');
  const [regForm, setRegForm] = useState({ name: '', email: '', phone: '' });
  const [prefs, setPrefs] = useState({ stream: '', city: '', budget: '5', exam: '' });
  const [animIdx, setAnimIdx] = useState(0);
  const [matched, setMatched] = useState<typeof COLLEGES[0] | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function findBestMatch() {
    const filtered = prefs.stream
      ? COLLEGES.filter(c => c.category.toLowerCase().includes(prefs.stream.toLowerCase()))
      : COLLEGES;
    return (filtered.length ? filtered : COLLEGES).sort((a, b) => b.rating - a.rating)[0];
  }

  function startMatching() {
    const best = findBestMatch();
    const targetIdx = COLLEGES.indexOf(best);
    setStep('matching');

    const totalCards = COLLEGES.length;
    const fastCycles = 3;
    const totalFastSteps = totalCards * fastCycles;
    let i = 0;
    let delay = 72;

    function tick() {
      setAnimIdx(i % totalCards);
      i++;

      if (i > totalFastSteps) {
        const remaining = ((targetIdx - (i % totalCards) + totalCards) % totalCards);
        if (remaining === 0) {
          setAnimIdx(targetIdx);
          setMatched(best);
          setTimeout(() => setStep('result'), 750);
          return;
        }
        delay = Math.min(delay * 1.32, 550);
      } else {
        delay = Math.max(delay * 0.985, 65);
      }
      timerRef.current = setTimeout(tick, delay);
    }
    tick();
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  function reset() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStep('cta');
    setRegForm({ name: '', email: '', phone: '' });
    setPrefs({ stream: '', city: '', budget: '5', exam: '' });
    setMatched(null);
    setAnimIdx(0);
  }

  const currentAnimCollege = COLLEGES[animIdx];

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-b from-indigo-50/40 via-background to-background dark:from-indigo-950/15">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(hsl(243 75% 59%) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5" /> AI College Matcher
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold leading-tight mb-5">
                Find Your<br />
                <span className="text-shimmer">Personal Match</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Answer a few quick questions and watch our matcher scan thousands of colleges in real-time — then reveal the one that's made for you.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Personalized to your stream, city & budget',
                  'Powered by 10,000+ verified college profiles',
                  'Instant match — no waiting, no spam',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA preview stack — shown only on step=cta */}
              <AnimatePresence>
                {step === 'cta' && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="relative h-36 w-full max-w-xs"
                  >
                    {COLLEGES.slice(0, 4).map((c, i) => (
                      <div key={c.id}
                        className="absolute rounded-2xl overflow-hidden border border-border/60 shadow-lg bg-card"
                        style={{
                          width: `${240 - i * 16}px`,
                          height: `${110 - i * 6}px`,
                          transform: `translateY(${i * 10}px) translateX(${i * 6}px) scale(${1 - i * 0.03})`,
                          zIndex: 4 - i,
                          opacity: 1 - i * 0.18,
                        }}
                      >
                        <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-2.5 left-3 text-white">
                          <p className="font-bold text-sm leading-tight">{c.name}</p>
                          <p className="text-[10px] opacity-75 mt-0.5">★ {c.rating}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right — interactive widget */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">

              {/* STEP: CTA */}
              {step === 'cta' && (
                <motion.div key="cta"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                  className="bg-card border border-border rounded-3xl p-8 shadow-xl text-center"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-primary/25">
                    <Sparkles className="w-9 h-9 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-3">Ready to meet your match?</h3>
                  <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                    Takes 60 seconds. We'll scan our entire database and surface the college that fits you best.
                  </p>
                  <button
                    onClick={() => setStep('register')}
                    className="w-full bg-gradient-primary text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all"
                  >
                    Start My Match →
                  </button>
                  <p className="text-xs text-muted-foreground mt-4">Free · No spam · Instant results</p>
                </motion.div>
              )}

              {/* STEP: REGISTER */}
              {step === 'register' && (
                <motion.div key="register"
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                  className="bg-card border border-border rounded-3xl p-8 shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h3 className="font-display font-bold text-lg leading-tight">Create Your Profile</h3>
                      <p className="text-xs text-muted-foreground">Step 1 of 2</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[1, 2].map(n => <div key={n} className={`h-1.5 w-8 rounded-full ${n === 1 ? 'bg-primary' : 'bg-border'}`} />)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Arjun Sharma' },
                      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'arjun@example.com' },
                      { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label className="block text-sm font-semibold mb-1.5 text-foreground">{label}</label>
                        <input
                          type={type} placeholder={placeholder}
                          value={regForm[key as keyof typeof regForm]}
                          onChange={e => setRegForm(p => ({ ...p, [key]: e.target.value }))}
                          className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-7">
                    <button onClick={reset} className="px-5 py-3 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                      Cancel
                    </button>
                    <button
                      onClick={() => regForm.name && regForm.email ? setStep('prefs') : null}
                      disabled={!regForm.name || !regForm.email}
                      className="flex-1 bg-gradient-primary text-white py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                      Continue →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP: PREFS */}
              {step === 'prefs' && (
                <motion.div key="prefs"
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                  className="bg-card border border-border rounded-3xl p-8 shadow-xl"
                >
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h3 className="font-display font-bold text-lg leading-tight">Your Preferences</h3>
                      <p className="text-xs text-muted-foreground">Step 2 of 2</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[1, 2].map(n => <div key={n} className="h-1.5 w-8 rounded-full bg-primary" />)}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Preferred Stream</label>
                      <select value={prefs.stream} onChange={e => setPrefs(p => ({ ...p, stream: e.target.value }))}
                        className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all">
                        <option value="">Any Stream</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Medical">Medical / MBBS</option>
                        <option value="Management">Management / MBA</option>
                        <option value="Law">Law</option>
                        <option value="Arts">Arts / Science</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Preferred City</label>
                      <select value={prefs.city} onChange={e => setPrefs(p => ({ ...p, city: e.target.value }))}
                        className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all">
                        <option value="">Any City</option>
                        <option value="Delhi">Delhi / NCR</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Pune">Pune</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Annual Budget: <span className="text-primary font-bold">₹{parseInt(prefs.budget) < 10 ? prefs.budget + 'L' : '10L+'}/yr</span>
                      </label>
                      <input type="range" min="1" max="10" step="1"
                        value={prefs.budget} onChange={e => setPrefs(p => ({ ...p, budget: e.target.value }))}
                        className="w-full accent-primary cursor-pointer" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>₹1L</span><span>₹10L+</span></div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5">Entrance Exam</label>
                      <select value={prefs.exam} onChange={e => setPrefs(p => ({ ...p, exam: e.target.value }))}
                        className="w-full bg-muted/40 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all">
                        <option value="">Not sure / Any</option>
                        <option value="JEE">JEE Main / Advanced</option>
                        <option value="NEET">NEET</option>
                        <option value="CAT">CAT / MAT</option>
                        <option value="CLAT">CLAT</option>
                        <option value="CUET">CUET</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-7">
                    <button onClick={() => setStep('register')} className="px-5 py-3 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                      ← Back
                    </button>
                    <button onClick={startMatching}
                      className="flex-1 bg-gradient-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                      🔍 Find My Match
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP: MATCHING ANIMATION */}
              {step === 'matching' && (
                <motion.div key="matching"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col items-center"
                >
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-sm font-semibold text-muted-foreground mb-5 text-center"
                  >
                    🔍 Scanning 10,000+ colleges for <span className="text-foreground">{regForm.name || 'you'}</span>...
                  </motion.p>

                  {/* Card viewport — slot machine */}
                  <div className="relative w-[340px] h-[210px] rounded-2xl overflow-hidden shadow-2xl border border-border ring-4 ring-primary/10">
                    <AnimatePresence mode="popLayout">
                      <motion.div key={animIdx}
                        initial={{ y: -220, opacity: 0, scale: 0.88 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 220, opacity: 0, scale: 0.88 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0"
                      >
                        <img src={currentAnimCollege.image} alt={currentAnimCollege.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                          <p className="font-display font-extrabold text-xl leading-tight">{currentAnimCollege.name}</p>
                          <p className="text-xs opacity-75 mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {currentAnimCollege.city} · {currentAnimCollege.category}
                          </p>
                          <p className="text-accent font-bold text-sm mt-1.5">★ {currentAnimCollege.rating}</p>
                        </div>
                        {/* Scan shimmer overlay */}
                        <div className="absolute inset-0 pointer-events-none"
                          style={{ background: 'linear-gradient(180deg, transparent 0%, hsl(243 75% 59% / 0.09) 50%, transparent 100%)' }} />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Progress dots */}
                  <div className="flex gap-1.5 mt-5">
                    {COLLEGES.map((_, i) => (
                      <motion.div key={i}
                        animate={{ width: i === animIdx ? 24 : 8, backgroundColor: i === animIdx ? 'hsl(243 75% 59%)' : 'hsl(214 32% 91%)' }}
                        transition={{ duration: 0.15 }}
                        className="h-1.5 rounded-full"
                      />
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground mt-4">Analyzing fit across 40+ parameters…</p>
                </motion.div>
              )}

              {/* STEP: RESULT */}
              {step === 'result' && matched && (
                <motion.div key="result"
                  initial={{ opacity: 0, scale: 0.82, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                >
                  <motion.div className="text-center mb-5"
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm border border-emerald-200 shadow-sm">
                      🎉 Perfect Match Found for {regForm.name || 'You'}!
                    </span>
                  </motion.div>

                  <div className="bg-card border-2 border-primary/25 rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                    <div className="relative h-52 overflow-hidden">
                      <img src={matched.image} alt={matched.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-white/90 backdrop-blur text-black text-xs font-bold px-3 py-1 rounded-full">{matched.rank}</span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow">#1 Match</span>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-display font-extrabold text-2xl leading-tight">{matched.name}</h3>
                        <p className="text-sm opacity-80 flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" /> {matched.city}</p>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-white text-center">
                          <p className="text-xl font-bold text-accent">★ {matched.rating}</p>
                          <p className="text-[10px] opacity-70 mt-0.5">Rating</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="grid grid-cols-3 gap-3 mb-5">
                        {[
                          { label: 'Stream', val: matched.category.split('/')[0] },
                          { label: 'Avg Fees', val: matched.fees },
                          { label: 'Exam', val: matched.cutoff.split(' ')[0] },
                        ].map(({ label, val }) => (
                          <div key={label} className="bg-muted/50 rounded-xl p-3 text-center border border-border/50">
                            <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide">{label}</p>
                            <p className="font-semibold text-xs text-foreground">{val}</p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 mb-5">
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className="font-bold text-primary">Why this match?</span>{' '}
                          Based on your{prefs.stream ? ` preference for ${prefs.stream}` : ' profile'},{' '}
                          <strong>{matched.name}</strong> ranks highest across academics, placements, and student satisfaction in our database.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Link to="/colleges"
                          className="flex-1 bg-gradient-primary text-white py-3 rounded-xl font-bold text-center hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-sm">
                          View College Profile <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button onClick={reset}
                          className="px-5 py-3 border-2 border-border rounded-xl font-semibold hover:bg-muted transition-colors text-sm">
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Home Component ─── */
export default function Home() {
  const [searchStream, setSearchStream] = useState('');

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pb-0">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/70 via-white/90 to-white dark:from-indigo-950/40 dark:via-background dark:to-background" />
          <div className="hero-dot-grid absolute inset-0 opacity-[0.03]" />
          <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[120px] pointer-events-none" />
        </div>

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
                <img key={i} src={src} alt="student" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
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
            <Link to="/admissions#deadline-calendar"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-border shadow-sm text-sm font-semibold text-foreground hover:text-primary hover:border-primary hover:shadow-md transition-all group">
              <Calendar className="w-4 h-4 text-accent" />
              View Upcoming Deadlines Calendar
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>

        <WavesBackground />
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

      {/* STREAM COMPASS */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Choose Your Path</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Not sure where to start? Explore top streams and find the perfect course.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: '🚀', name: 'Engineering', count: '4,000+ Colleges', color: 'bg-blue-50 text-blue-600' },
              { icon: '⚕️', name: 'Medical', count: '1,200+ Colleges', color: 'bg-emerald-50 text-emerald-600' },
              { icon: '💼', name: 'Management', count: '5,000+ Colleges', color: 'bg-purple-50 text-purple-600' },
              { icon: '⚖️', name: 'Law', count: '800+ Colleges', color: 'bg-orange-50 text-orange-600' },
              { icon: '🎨', name: 'Design', count: '600+ Colleges', color: 'bg-pink-50 text-pink-600' },
              { icon: '💻', name: 'IT & Software', count: '3,500+ Colleges', color: 'bg-cyan-50 text-cyan-600' },
            ].map((stream, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }}
                className="bg-card rounded-2xl p-6 border border-border text-center shadow-sm hover:shadow-xl transition-all cursor-pointer group">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform ${stream.color}`}>
                  {stream.icon}
                </div>
                <h3 className="font-bold text-foreground mb-1">{stream.name}</h3>
                <p className="text-xs text-muted-foreground">{stream.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COLLEGES */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Colleges</h2>
              <p className="text-muted-foreground">Top ranked institutions across India</p>
            </div>
            <Link to="/colleges" className="hidden md:flex items-center text-primary font-semibold hover:text-accent transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
          <div className="flex overflow-x-auto pb-12 -mx-4 px-4 snap-x gap-6 hide-scrollbar">
            {COLLEGES.slice(0, 5).map(college => (
              <motion.div key={college.id} whileHover={{ y: -10 }}
                className="min-w-[320px] max-w-[320px] snap-center bg-card rounded-3xl overflow-hidden border border-border shadow-md hover:shadow-2xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  <img src={college.image} alt={college.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full">{college.rank}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 z-20 text-white">
                    <h3 className="font-display font-bold text-xl mb-1">{college.name}</h3>
                    <p className="text-sm flex items-center gap-1 opacity-90"><MapPin className="w-3 h-3" /> {college.city}</p>
                  </div>
                </div>
                <div className="p-6">
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
                  <button className="w-full py-3 rounded-xl font-semibold border-2 border-border text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-all">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUSCORE */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Discover Your <span className="text-gradient">EduScore</span></h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Stop guessing your chances. Our AI-driven EduScore analyzes your profile and predicts admission chances at top colleges with 95% accuracy.
            </p>
            <ul className="space-y-4 mb-8">
              {['Personalized college recommendations', 'Cutoff predictions for 500+ exams', 'Fee and ROI analysis for your profile'].map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent w-6 h-6 flex-shrink-0" />
                  <span className="font-medium text-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <button className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all">
              Calculate My EduScore
            </button>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 shadow-2xl border border-gray-800 text-white transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">Your Profile Match</h3>
                  <p className="font-display text-2xl font-bold">IIT Delhi</p>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-accent flex items-center justify-center">
                  <span className="font-bold text-xl text-accent">92%</span>
                </div>
              </div>
              <div className="space-y-4">
                {[{ label: 'Academic Fit', pct: '85%', color: 'bg-emerald-500', text: 'High' }, { label: 'Cutoff Probability', pct: '95%', color: 'bg-accent', text: 'Very High' }].map(b => (
                  <div key={b.label}>
                    <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">{b.label}</span><span>{b.text}</span></div>
                    <div className="w-full bg-gray-800 rounded-full h-2"><div className={`${b.color} h-2 rounded-full`} style={{ width: b.pct }} /></div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
                <span className="text-sm text-gray-400">Based on JEE Main 2026 score</span>
                <button className="text-sm font-semibold text-primary hover:text-white transition-colors">Update Profile →</button>
              </div>
            </div>
            <div className="absolute top-10 right-10 w-full h-full bg-primary/20 rounded-3xl blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* ── FIND YOUR PERSONAL MATCH ── */}
      <CollegeMatchFinder />

      {/* ── BY THE NUMBERS (replaces Exam Calendar) ── */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Trusted Across India</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">The numbers that prove why students trust EduReach for the most important decision of their life.</p>
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
                className={`rounded-2xl border p-6 text-center ${s.color}`}>
                <div className="text-4xl mb-2">{s.icon}</div>
                <div className="text-3xl md:text-4xl font-display font-extrabold mb-1">
                  <StatCounter to={s.to} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <p className="text-sm font-semibold opacity-75">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial mini row */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Priya Menon', college: 'IIT Bombay, B.Tech CSE', quote: 'EduReach helped me compare 30+ colleges in a day. Found IIT Bombay through the matcher — couldn\'t be happier!', avatar: 'https://i.pravatar.cc/48?img=5', stars: 5 },
              { name: 'Rahul Verma', college: 'IIM Ahmedabad, MBA', quote: 'The EduScore feature predicted my CAT percentile accurately. Applied to the right colleges and got in!', avatar: 'https://i.pravatar.cc/48?img=3', stars: 5 },
              { name: 'Sneha Patil', college: 'AIIMS Delhi, MBBS', quote: 'Found scholarships worth ₹80,000 I didn\'t know existed. The deadline tracker was a lifesaver.', avatar: 'https://i.pravatar.cc/48?img=9', stars: 5 },
            ].map((t, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex text-accent text-sm mb-3">{'★'.repeat(t.stars)}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-border" />
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
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-display font-bold">Latest Updates</h2>
              <Link to="/news" className="text-primary font-semibold hover:underline">See All</Link>
            </div>
            <div className="space-y-6">
              {NEWS.slice(0, 3).map(article => (
                <Link to="/news" key={article.id} className="flex gap-4 group">
                  <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-accent mb-1 block">{article.category}</span>
                    <h3 className="font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-xs text-muted-foreground mt-2">{article.date}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-display font-bold">Top Scholarships</h2>
              <Link to="/scholarships" className="text-primary font-semibold hover:underline">See All</Link>
            </div>
            <div className="space-y-4">
              {SCHOLARSHIPS.slice(0, 4).map(s => (
                <div key={s.id} className="bg-muted/50 p-5 rounded-2xl border border-border/50 hover:bg-white dark:hover:bg-gray-900 hover:shadow-lg transition-all group cursor-pointer">
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

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90 -z-10" />
        <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to shape your future?</h2>
          <p className="text-xl opacity-90 mb-10">Join 2 million+ students who found their dream college with EduReach.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:-translate-y-1 transition-all">Sign Up for Free</button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <PlayCircle className="w-6 h-6" /> Watch How it Works
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
