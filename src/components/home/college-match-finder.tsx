"use client";

import Image from "next/image";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin, Sparkles } from "lucide-react";

import { getColleges } from "@/lib/services";

const COLLEGES = getColleges();

type MatchStep = "cta" | "register" | "prefs" | "matching" | "result";

export function CollegeMatchFinder() {
  const [step, setStep] = useState<MatchStep>("cta");
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "" });
  const [prefs, setPrefs] = useState({ stream: "", city: "", budget: "5", exam: "" });
  const [animIdx, setAnimIdx] = useState(0);
  const [matched, setMatched] = useState<(typeof COLLEGES)[number] | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function findBestMatch() {
    const filtered = prefs.stream
      ? COLLEGES.filter((college) =>
          college.category.toLowerCase().includes(prefs.stream.toLowerCase()),
        )
      : COLLEGES;

    return (filtered.length ? filtered : COLLEGES).sort((a, b) => b.rating - a.rating)[0];
  }

  function startMatching() {
    const best = findBestMatch();
    const targetIdx = COLLEGES.indexOf(best);
    setStep("matching");

    const totalCards = COLLEGES.length;
    const fastCycles = 3;
    const totalFastSteps = totalCards * fastCycles;
    let i = 0;
    let delay = 72;

    function tick() {
      setAnimIdx(i % totalCards);
      i++;

      if (i > totalFastSteps) {
        const remaining = (targetIdx - (i % totalCards) + totalCards) % totalCards;
        if (remaining === 0) {
          setAnimIdx(targetIdx);
          setMatched(best);
          setTimeout(() => setStep("result"), 750);
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

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  function reset() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setStep("cta");
    setRegForm({ name: "", email: "", phone: "" });
    setPrefs({ stream: "", city: "", budget: "5", exam: "" });
    setMatched(null);
    setAnimIdx(0);
  }

  const currentAnimCollege = COLLEGES[animIdx];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/40 via-background to-background py-28 dark:from-indigo-950/15">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(hsl(243 75% 59%) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" /> AI College Matcher
              </div>
              <h2 className="mb-5 text-4xl font-display font-extrabold leading-tight md:text-5xl">
                Find Your
                <br />
                <span className="text-shimmer">Personal Match</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                Answer a few quick questions and watch our matcher scan thousands of
                colleges in real-time, then reveal the one that&apos;s made for you.
              </p>
              <ul className="mb-8 space-y-3">
                {[
                  "Personalized to your stream, city & budget",
                  "Powered by 10,000+ verified college profiles",
                  "Instant match, no waiting, no spam",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <AnimatePresence>
                {step === "cta" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative h-36 w-full max-w-xs"
                  >
                    {COLLEGES.slice(0, 4).map((college, index) => (
                      <div
                        key={college.id}
                        className="absolute overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg"
                        style={{
                          width: `${240 - index * 16}px`,
                          height: `${110 - index * 6}px`,
                          transform: `translateY(${index * 10}px) translateX(${index * 6}px) scale(${1 - index * 0.03})`,
                          zIndex: 4 - index,
                          opacity: 1 - index * 0.18,
                        }}
                      >
                        <Image
                          src={college.image}
                          alt={college.name}
                          fill
                          sizes="240px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute bottom-2.5 left-3 text-white">
                          <p className="text-sm font-bold leading-tight">{college.name}</p>
                          <p className="mt-0.5 text-[10px] opacity-75">★ {college.rating}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {step === "cta" && (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="rounded-3xl border border-border bg-card p-8 text-center shadow-xl"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/25">
                    <Sparkles className="h-9 w-9 text-white" />
                  </div>
                  <h3 className="mb-3 text-2xl font-display font-bold">
                    Ready to meet your match?
                  </h3>
                  <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                    Takes 60 seconds. We&apos;ll scan our entire database and surface the
                    college that fits you best.
                  </p>
                  <button
                    onClick={() => setStep("register")}
                    className="w-full rounded-2xl bg-gradient-primary py-4 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/35"
                  >
                    Start My Match →
                  </button>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Free · No spam · Instant results
                  </p>
                </motion.div>
              )}

              {step === "register" && (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="rounded-3xl border border-border bg-card p-8 shadow-xl"
                >
                  <div className="mb-7 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold leading-tight">
                        Create Your Profile
                      </h3>
                      <p className="text-xs text-muted-foreground">Step 1 of 2</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[1, 2].map((stepNumber) => (
                        <div
                          key={stepNumber}
                          className={`h-1.5 w-8 rounded-full ${
                            stepNumber === 1 ? "bg-primary" : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        key: "name",
                        label: "Full Name",
                        type: "text",
                        placeholder: "Arjun Sharma",
                      },
                      {
                        key: "email",
                        label: "Email Address",
                        type: "email",
                        placeholder: "arjun@example.com",
                      },
                      {
                        key: "phone",
                        label: "Phone Number",
                        type: "tel",
                        placeholder: "+91 98765 43210",
                      },
                    ].map(({ key, label, type, placeholder }) => (
                      <div key={key}>
                        <label className="mb-1.5 block text-sm font-semibold text-foreground">
                          {label}
                        </label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={regForm[key as keyof typeof regForm]}
                          onChange={(event) =>
                            setRegForm((previous) => ({
                              ...previous,
                              [key]: event.target.value,
                            }))
                          }
                          className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex gap-3">
                    <button
                      onClick={reset}
                      className="rounded-xl border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => (regForm.name && regForm.email ? setStep("prefs") : null)}
                      disabled={!regForm.name || !regForm.email}
                      className="flex-1 rounded-xl bg-gradient-primary py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue →
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "prefs" && (
                <motion.div
                  key="prefs"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="rounded-3xl border border-border bg-card p-8 shadow-xl"
                >
                  <div className="mb-7 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold leading-tight">
                        Your Preferences
                      </h3>
                      <p className="text-xs text-muted-foreground">Step 2 of 2</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      {[1, 2].map((stepNumber) => (
                        <div key={stepNumber} className="h-1.5 w-8 rounded-full bg-primary" />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold">
                        Preferred Stream
                      </label>
                      <select
                        value={prefs.stream}
                        onChange={(event) =>
                          setPrefs((previous) => ({
                            ...previous,
                            stream: event.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Any Stream</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Medical">Medical / MBBS</option>
                        <option value="Management">Management / MBA</option>
                        <option value="Law">Law</option>
                        <option value="Arts">Arts / Science</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold">
                        Preferred City
                      </label>
                      <select
                        value={prefs.city}
                        onChange={(event) =>
                          setPrefs((previous) => ({
                            ...previous,
                            city: event.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Any City</option>
                        <option value="Delhi">Delhi / NCR</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Pune">Pune</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Annual Budget:{" "}
                        <span className="font-bold text-primary">
                          ₹
                          {parseInt(prefs.budget, 10) < 10
                            ? `${prefs.budget}L`
                            : "10L+"}
                          /yr
                        </span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        value={prefs.budget}
                        onChange={(event) =>
                          setPrefs((previous) => ({
                            ...previous,
                            budget: event.target.value,
                          }))
                        }
                        className="w-full cursor-pointer accent-primary"
                      />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>₹1L</span>
                        <span>₹10L+</span>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold">
                        Entrance Exam
                      </label>
                      <select
                        value={prefs.exam}
                        onChange={(event) =>
                          setPrefs((previous) => ({
                            ...previous,
                            exam: event.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Not sure / Any</option>
                        <option value="JEE">JEE Main / Advanced</option>
                        <option value="NEET">NEET</option>
                        <option value="CAT">CAT / MAT</option>
                        <option value="CLAT">CLAT</option>
                        <option value="CUET">CUET</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-7 flex gap-3">
                    <button
                      onClick={() => setStep("register")}
                      className="rounded-xl border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={startMatching}
                      className="flex-1 rounded-xl bg-gradient-primary py-3 font-bold text-white shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      Find My Match
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "matching" && (
                <motion.div
                  key="matching"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col items-center"
                >
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="mb-5 text-center text-sm font-semibold text-muted-foreground"
                  >
                    Scanning 10,000+ colleges for{" "}
                    <span className="text-foreground">{regForm.name || "you"}</span>...
                  </motion.p>

                  <div className="relative h-[210px] w-[340px] overflow-hidden rounded-2xl border border-border shadow-2xl ring-4 ring-primary/10">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={animIdx}
                        initial={{ y: -220, opacity: 0, scale: 0.88 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 220, opacity: 0, scale: 0.88 }}
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={currentAnimCollege.image}
                          alt={currentAnimCollege.name}
                          fill
                          sizes="340px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                          <p className="text-xl font-display font-extrabold leading-tight">
                            {currentAnimCollege.name}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs opacity-75">
                            <MapPin className="h-3 w-3" /> {currentAnimCollege.city} ·{" "}
                            {currentAnimCollege.category}
                          </p>
                          <p className="mt-1.5 text-sm font-bold text-accent">
                            ★ {currentAnimCollege.rating}
                          </p>
                        </div>
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(180deg, transparent 0%, hsl(243 75% 59% / 0.09) 50%, transparent 100%)",
                          }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="mt-5 flex gap-1.5">
                    {COLLEGES.map((college, index) => (
                      <motion.div
                        key={college.slug}
                        animate={{
                          width: index === animIdx ? 24 : 8,
                          backgroundColor:
                            index === animIdx
                              ? "hsl(243 75% 59%)"
                              : "hsl(214 32% 91%)",
                        }}
                        transition={{ duration: 0.15 }}
                        className="h-1.5 rounded-full"
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-muted-foreground">
                    Analyzing fit across 40+ parameters...
                  </p>
                </motion.div>
              )}

              {step === "result" && matched && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.82, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                >
                  <motion.div
                    className="mb-5 text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm">
                      Perfect Match Found for {regForm.name || "You"}!
                    </span>
                  </motion.div>

                  <div className="overflow-hidden rounded-3xl border-2 border-primary/25 bg-card shadow-2xl shadow-primary/10">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={matched.image}
                        alt={matched.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 340px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute left-4 top-4 flex gap-2">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-black backdrop-blur">
                          {matched.rank}
                        </span>
                      </div>
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow">
                          #1 Match
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-display font-extrabold leading-tight">
                          {matched.name}
                        </h3>
                        <p className="mt-1 flex items-center gap-1 text-sm opacity-80">
                          <MapPin className="h-3.5 w-3.5" /> {matched.city}
                        </p>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <div className="rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-center text-white backdrop-blur-sm">
                          <p className="text-xl font-bold text-accent">★ {matched.rating}</p>
                          <p className="mt-0.5 text-[10px] opacity-70">Rating</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-5 grid grid-cols-3 gap-3">
                        {[
                          { label: "Stream", value: matched.category.split("/")[0] },
                          { label: "Avg Fees", value: matched.fees },
                          { label: "Exam", value: matched.cutoff.split(" ")[0] },
                        ].map(({ label, value }) => (
                          <div
                            key={label}
                            className="rounded-xl border border-border/50 bg-muted/50 p-3 text-center"
                          >
                            <p className="mb-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                              {label}
                            </p>
                            <p className="text-xs font-semibold text-foreground">{value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mb-5 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                        <p className="text-sm leading-relaxed text-foreground">
                          <span className="font-bold text-primary">Why this match?</span>{" "}
                          Based on your
                          {prefs.stream ? ` preference for ${prefs.stream}` : " profile"},{" "}
                          <strong>{matched.name}</strong> ranks highest across academics,
                          placements, and student satisfaction in our database.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Link
                          href="/colleges"
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3 text-center text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          View College Profile <ArrowRight className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={reset}
                          className="rounded-xl border-2 border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                        >
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
