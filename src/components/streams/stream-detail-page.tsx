import Link from "next/link";
import { ArrowLeft, ArrowRight, Briefcase, GraduationCap, ShieldCheck, Sparkles, Target, Compass, BookMarked } from "lucide-react";

import {
  getCoursesForStreamPage,
  getStreamPageBySlug,
} from "@/lib/services";

export default function StreamDetailPage({ slug }: { slug: string }) {
  const streamPage = getStreamPageBySlug(slug);

  if (!streamPage) {
    return null;
  }

  const courses = getCoursesForStreamPage(slug);

  return (
    <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
      
      {/* ── HERO SECTION (Dark & Dynamic for Streams) ── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-950 text-white rounded-b-[3rem] sm:rounded-b-[4rem]">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          {/* Abstract glows */}
          <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
        </div>

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <Compass className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary/90">Career Stream</span>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-20 items-end">
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1] mb-6">
                Explore the world of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50">{streamPage.name}</span>
              </h1>
              <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                {streamPage.shortDescription || streamPage.overview}
              </p>
            </div>

            {/* Quick Stats Glass Card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Colleges</p>
                  <p className="text-2xl font-bold font-display">{streamPage.collegeCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Pathways</p>
                  <p className="text-2xl font-bold font-display">{courses.length}</p>
                </div>
                <div className="col-span-2 pt-3 mt-3 border-t border-white/10 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Top Exams</p>
                  <div className="flex flex-wrap gap-2">
                    {streamPage.topExams.slice(0, 3).map(exam => (
                       <span key={exam} className="text-xs font-semibold bg-white/10 px-2.5 py-1 rounded text-white">{exam}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT GRID ── */}
      <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 pt-10 -mt-8 relative z-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-8 bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm border border-border"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Streams
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left Column (Main Details & Courses) */}
          <div className="space-y-6">
            
            <div className="rounded-[2rem] border border-border bg-card p-6 md:p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary mb-6">
                <Sparkles className="h-5 w-5" />
                Stream Overview
              </div>
              <p className="text-base leading-8 text-muted-foreground mb-8">
                {streamPage.overview}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {streamPage.keyFocusAreas.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-2xl bg-muted/40 p-4 border border-border/50">
                    <Target className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-foreground leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-6 md:p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary mb-6">
                <ShieldCheck className="h-5 w-5" />
                Who Should Consider This
              </div>
              <ul className="space-y-4">
                {streamPage.whoShouldConsider.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-6 md:p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary">
                  <BookMarked className="h-5 w-5" />
                  Explore Pathways ({courses.length})
                </div>
              </div>
              
              <div className="grid gap-5 xl:grid-cols-2">
                {courses.map((course) => (
                  <div
                    key={course.slug}
                    className="group relative flex flex-col justify-between rounded-3xl border border-border bg-background p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold tracking-wide">
                          {course.level}
                        </span>
                        <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground">
                          {course.duration}
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {course.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 mb-6">
                        {course.overview}
                      </p>
                    </div>

                    <div>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm py-2 border-b border-border/60">
                          <span className="text-muted-foreground">Avg Salary</span>
                          <span className="font-semibold text-foreground">{course.avgSalary}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm py-2 border-b border-border/60">
                          <span className="text-muted-foreground">Exams</span>
                          <span className="font-semibold text-foreground">{course.entranceExams[0]}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 shadow-sm"
                        >
                          View Course
                        </Link>
                        <Link
                          href={`/colleges?stream=${encodeURIComponent(course.stream)}`}
                          className="flex-1 inline-flex items-center justify-center rounded-xl bg-muted/50 border border-border px-4 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-muted"
                        >
                          Colleges
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            <div className="sticky top-6 space-y-6">
              
              <div className="rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-xl border border-slate-700">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-300 mb-6">
                  <GraduationCap className="h-5 w-5" />
                  Admissions Snapshot
                </div>
                
                <div className="space-y-5">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Entrance Exams</p>
                    <p className="text-sm font-bold leading-relaxed">
                      {streamPage.topExams.join(", ")}
                    </p>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Degree Routes</p>
                    <p className="text-sm font-bold leading-relaxed">
                      {streamPage.degreeTypes.join(" • ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary mb-6">
                  <Briefcase className="h-5 w-5" />
                  Career Directions
                </div>
                <div className="flex flex-wrap gap-2">
                  {streamPage.careerDirections.map((item) => (
                    <span key={item} className="inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm overflow-hidden relative">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 relative z-10">
                  Take Action
                </p>
                <div className="space-y-3 relative z-10">
                  <Link
                    href={streamPage.collegeFilterStream ? `/colleges?stream=${encodeURIComponent(streamPage.collegeFilterStream)}` : "/colleges"}
                    className="flex w-full items-center justify-between rounded-xl bg-foreground px-5 py-3.5 text-sm font-bold text-background transition-colors hover:bg-primary group"
                  >
                    View Colleges
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/courses"
                    className="flex w-full items-center justify-between rounded-xl border-2 border-border bg-transparent px-5 py-3.5 text-sm font-bold text-foreground transition-colors hover:bg-muted"
                  >
                    Explore All Courses
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
