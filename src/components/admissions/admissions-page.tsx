"use client";

import React, { useState, useEffect, useRef } from 'react';
import { getDeadlineEvents, getExamTimeline, getPersonalizedExamTimeline } from "@/lib/services";
import type { DeadlineEvent, DeadlineEventType, ExamTimelineItem, Stream } from "@/lib/types/content";
import { Calendar, FileText, CheckSquare, Users, BookOpen, MessageCircleQuestion, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '@/components/page-hero';

/* ─────────────────────────────────────────────
   CALENDAR HELPERS
───────────────────────────────────────────── */
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const WEEKDAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DEADLINE_EVENTS = getDeadlineEvents();
const EXAM_TIMELINE = getExamTimeline();

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/* ─────────────────────────────────────────────
   COLOUR MAPS
───────────────────────────────────────────── */
const TYPE_DOT: Record<DeadlineEventType, string> = {
  Exam:         "bg-orange-500",
  Registration: "bg-blue-500",
  Scholarship:  "bg-violet-500",
  Results:      "bg-emerald-500",
};
const TYPE_BADGE: Record<DeadlineEventType, string> = {
  Exam:         "bg-orange-100 text-orange-700 border border-orange-200",
  Registration: "bg-blue-100 text-blue-700 border border-blue-200",
  Scholarship:  "bg-violet-100 text-violet-700 border border-violet-200",
  Results:      "bg-emerald-100 text-emerald-700 border border-emerald-200",
};
const TYPE_RING: Record<DeadlineEventType, string> = {
  Exam:         "ring-orange-400/40 bg-orange-50",
  Registration: "ring-blue-400/40 bg-blue-50",
  Scholarship:  "ring-violet-400/40 bg-violet-50",
  Results:      "ring-emerald-400/40 bg-emerald-50",
};

/* ─────────────────────────────────────────────
   DEADLINE CALENDAR COMPONENT
───────────────────────────────────────────── */
function DeadlineCalendar() {
  // Start at March 2026 (index 2)
  const [year, setYear]           = useState(2026);
  const [month, setMonth]         = useState(2);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const daysInMonth  = getDaysInMonth(year, month);
  const firstDay     = getFirstDayOfMonth(year, month);

  // Build event lookup: "YYYY-MM-DD" -> events[]
  const eventMap: Record<string, DeadlineEvent[]> = {};
  for (const ev of DEADLINE_EVENTS) {
    if (!eventMap[ev.date]) eventMap[ev.date] = [];
    eventMap[ev.date].push(ev);
  }

  const selectedEvents = selectedDate ? (eventMap[selectedDate] ?? []) : [];

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
    setSelectedDate(null);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
    setSelectedDate(null);
  }
  function handleDayClick(dateKey: string) {
    if (!eventMap[dateKey]) return;
    setSelectedDate(prev => prev === dateKey ? null : dateKey);
    // Small delay so the panel renders before scrolling
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
  }

  // Grid cells: leading empty + days
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to full rows
  while (cells.length % 7 !== 0) cells.push(null);

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="bg-card border border-border rounded-3xl shadow-xl overflow-hidden">

      {/* Legend */}
      <div className="px-6 pt-6 pb-3 flex flex-wrap gap-4">
        {(["Exam","Registration","Scholarship","Results"] as DeadlineEventType[]).map(t => (
          <div key={t} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <span className={`w-2.5 h-2.5 rounded-full ${TYPE_DOT[t]}`} />
            {t}
          </div>
        ))}
      </div>

      {/* Month navigator */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <button
          onClick={prevMonth}
          className="p-2 rounded-xl hover:bg-muted transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <motion.h3
          key={`${year}-${month}`}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="font-display font-bold text-lg text-foreground"
        >
          {MONTHS[month]} {year}
        </motion.h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-xl hover:bg-muted transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-border">
        {WEEKDAYS.map(d => (
          <div key={d} className="py-2 text-center text-xs font-semibold text-muted-foreground">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}`}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7"
        >
          {cells.map((day, idx) => {
            if (!day) return <div key={`empty-${idx}`} className="min-h-[60px] border-b border-r border-border/40 bg-muted/20" />;

            const dateKey  = toDateKey(year, month, day);
            const events   = eventMap[dateKey] ?? [];
            const hasEvent = events.length > 0;
            const isSelected = selectedDate === dateKey;
            const todayCell  = isToday(day);

            return (
              <motion.button
                key={dateKey}
                onClick={() => handleDayClick(dateKey)}
                whileHover={hasEvent ? { scale: 1.04 } : {}}
                whileTap={hasEvent ? { scale: 0.97 } : {}}
                className={[
                  "relative min-h-[60px] p-2 border-b border-r border-border/40 flex flex-col items-center",
                  "transition-colors duration-150",
                  hasEvent ? "cursor-pointer" : "cursor-default",
                  isSelected ? "bg-primary/8 ring-2 ring-inset ring-primary/30" : hasEvent ? "hover:bg-muted/60" : "",
                ].join(" ")}
              >
                {/* Day number */}
                <span className={[
                  "w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold mb-1",
                  todayCell  ? "bg-primary text-primary-foreground" : "text-foreground",
                  isSelected && !todayCell ? "text-primary" : "",
                ].join(" ")}>
                  {day}
                </span>

                {/* Event dots */}
                {events.length > 0 && (
                  <div className="flex gap-0.5 flex-wrap justify-center">
                    {events.slice(0, 3).map((ev, i) => (
                      <span key={i} className={`w-1.5 h-1.5 rounded-full ${TYPE_DOT[ev.type]}`} />
                    ))}
                    {events.length > 3 && (
                      <span className="text-[9px] text-muted-foreground font-bold">+{events.length - 3}</span>
                    )}
                  </div>
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Expanded event detail panel */}
      <div ref={detailRef}>
        <AnimatePresence>
          {selectedDate && selectedEvents.length > 0 && (
            <motion.div
              key={selectedDate}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden border-t border-border"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-muted-foreground">
                    {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", {
                      weekday: "long", day: "numeric", month: "long", year: "numeric"
                    })}
                  </p>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {selectedEvents.map((ev, i) => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    className={`flex gap-4 p-4 rounded-2xl ring-2 ${TYPE_RING[ev.type]}`}
                  >
                    <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${TYPE_DOT[ev.type]} mt-1.5`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <h4 className="font-bold text-foreground text-sm leading-snug">{ev.title}</h4>
                        <span className={`shrink-0 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${TYPE_BADGE[ev.type]}`}>
                          {ev.type}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-muted-foreground mt-1 mb-2">{ev.status}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{ev.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────
   ADMISSIONS PAGE
───────────────────────────────────────────── */
export default function Admissions() {
  const [timelineYear, setTimelineYear] = useState("2026");
  const [timelineStream, setTimelineStream] = useState<Stream | "">("");
  const [timelineState, setTimelineState] = useState("");
  const [personalizedTimeline, setPersonalizedTimeline] = useState<ExamTimelineItem[]>([]);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#deadline-calendar") {
      setTimeout(() => {
        document.getElementById("deadline-calendar")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, []);

  const steps = [
    { icon: <BookOpen />, title: "Research & Shortlist", desc: "Use our College Predictor to shortlist colleges based on your stream and predicted score." },
    { icon: <Calendar />, title: "Track Exam Dates", desc: "Keep track of application deadlines for entrance exams like JEE, NEET, CAT." },
    { icon: <FileText />, title: "Submit Applications", desc: "Fill out university specific application forms and upload necessary documents." },
    { icon: <CheckSquare />, title: "Appear for Exams", desc: "Download admit cards and appear for entrance exams or standard tests." },
    { icon: <Users />, title: "Counseling & Interview", desc: "Participate in centralized counseling (JoSAA, MCC) or university specific GD/PI." },
    { icon: <MessageCircleQuestion />, title: "Final Admission", desc: "Pay the admission fee, verify physical documents, and secure your seat." },
  ];

  function handleTimelineCheck() {
    const results = getPersonalizedExamTimeline({
      examYear: timelineYear,
      stream: timelineStream,
      statePreference: timelineState.trim(),
    });

    setPersonalizedTimeline(results.length ? results : EXAM_TIMELINE);
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Admissions 2026"
        title="Plan admissions|with less guesswork"
        description="A cleaner admissions roadmap with deadlines, exam windows, process stages, and practical checkpoints so students can move from planning to action."
        variant="deep"
        stats={[
          ["Roadmap", "Step-by-step process"],
          ["Deadlines", "Interactive calendar"],
          ["Purpose", "Reduce missed actions"],
        ]}
      />

      {/* ─── DEADLINE CALENDAR SECTION ─── */}
      <section
        id="deadline-calendar"
        className="py-20 bg-gradient-to-b from-muted/40 to-background scroll-mt-20"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <Calendar className="w-3.5 h-3.5" />
              Live Deadline Tracker
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Exam & Admission Deadlines
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tap any highlighted date to see full details. Color-coded by category so you never miss a deadline.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <DeadlineCalendar />
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Main Content - Step by Step */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-display font-bold mb-8 text-foreground">Step-by-Step Admission Process</h2>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {steps.map((step, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  key={idx}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {step.icon}
                  </div>

                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="font-bold text-accent text-sm mb-1">Step {idx + 1}</div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ Section */}
            <h2 className="text-3xl font-display font-bold mt-20 mb-8 text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "When do college admissions start in India?", a: "Most central and state university admissions start between May and July after board results. Private universities may start early admissions in Jan-Feb." },
                { q: "Is CUET mandatory for all colleges?", a: "CUET is mandatory for all Central Universities and is also accepted by many State, Private, and Deemed universities. However, engineering/medical colleges still use JEE/NEET." },
                { q: "What documents are required for admission?", a: "Generally: 10th & 12th marksheets, Transfer Certificate, Migration Certificate, Character Certificate, ID Proof (Aadhaar), Passport photos, and category certificates if applicable." }
              ].map((faq, i) => (
                <details key={i} className="group bg-card border border-border rounded-xl">
                  <summary className="font-bold p-5 cursor-pointer list-none flex justify-between items-center text-foreground hover:text-primary transition-colors">
                    {faq.q}
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-muted-foreground px-5 pb-5 pt-4 text-sm leading-relaxed border-t border-border/50">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Sidebar - Exam Timeline */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-28">
              <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                <Calendar className="text-primary" /> 2026 Exam Timeline
              </h3>
              
              {!showTimeline ? (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-muted/20 border border-border rounded-2xl">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Want a personalized timeline?</h4>
                  <p className="text-sm text-muted-foreground mb-6">Track exam dates, application windows, and counselling schedules specific to your stream and state.</p>
                  <button
                    onClick={() => setShowTimeline(true)}
                    className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg transition-all"
                  >
                    Check Your Timeline
                  </button>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-4 rounded-2xl border border-border bg-muted/30 p-4 mb-6">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Exam year
                      </label>
                      <select
                        value={timelineYear}
                        onChange={(event) => setTimelineYear(event.target.value)}
                        className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                      >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Stream
                      </label>
                      <select
                        value={timelineStream}
                        onChange={(event) => setTimelineStream(event.target.value as Stream | "")}
                        className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                      >
                        <option value="">Select stream</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Medical">Medical</option>
                        <option value="Management">Management</option>
                        <option value="Law">Law</option>
                        <option value="Design">Design</option>
                        <option value="Science">Science</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        State preference
                      </label>
                      <input
                        type="text"
                        value={timelineState}
                        onChange={(event) => setTimelineState(event.target.value)}
                        placeholder="Optional, e.g. Maharashtra"
                        className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                      />
                    </div>

                    <button
                      onClick={handleTimelineCheck}
                      className="w-full rounded-xl bg-foreground px-4 py-3 text-sm font-bold text-background transition-colors hover:bg-primary"
                    >
                      Update Timeline
                    </button>
                  </div>

                  {personalizedTimeline.length > 0 && (
                    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar rounded-xl">
                      {personalizedTimeline.map((item, idx) => (
                        <div key={idx} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full before:ring-4 before:ring-primary/20">
                          <h4 className="font-bold text-sm text-foreground">{item.exam}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                          <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold ${item.color}`}>
                            {item.status}
                          </span>
                          {idx !== personalizedTimeline.length - 1 && (
                            <div className="absolute left-[3px] top-6 bottom-[-16px] w-[2px] bg-border" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
