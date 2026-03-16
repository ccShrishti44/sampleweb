"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Heart, Shield, Target } from "lucide-react";

import { CounsellingForm } from "@/components/counselling-form";
import { PageHero } from "@/components/page-hero";

export default function About() {
  const team = [
    { name: "Rahul Sharma", role: "Academic Counsellor", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
    { name: "Priya Patel", role: "Academic Counsellor", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
    { name: "Amit Kumar", role: "Academic Counsellor", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="About EduExpert"
        title="Empowering student journeys|with cleaner guidance"
        description="EduExpert is built to make college decision-making clearer, calmer, and more evidence-led by combining structured information with practical student guidance."
        variant="sunrise"
        stats={[
          ["Mission", "Clarity in higher education choices"],
          ["Method", "Data with human context"],
          ["Focus", "Student-first navigation"],
        ]}
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-orange-100 bg-white/80 text-primary shadow-lg">
          <GraduationCap className="h-11 w-11" />
        </div>
      </PageHero>

      <section className="py-24 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 w-fit border border-primary/20">
              <Target className="w-4 h-4" /> Our Mission
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-8">
              Decoding higher education,
              <br />
              <span className="text-shimmer">empowering futures.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-medium">
              We started EduExpert with a resolute conviction: every student deserves unprecedented clarity when making life&apos;s most vital decisions. 
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              By dismantling informational silos and replacing noise with structured, actionable insights, we provide an unbiased vantage point. We blend rigorous data architecture with deep human empathy, ensuring no student has to guess their way to a successful career roadmap. 
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border/60">
              <div>
                <div className="flex bg-primary/10 w-12 h-12 rounded-2xl items-center justify-center mb-4 border border-primary/20 shadow-sm">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-foreground">Absolute Integrity</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">We strictly prohibit sponsored rankings. Our data algorithms prioritize objective outcomes and authentic student fit above all else.</p>
              </div>
              <div>
                <div className="flex bg-accent/10 w-12 h-12 rounded-2xl items-center justify-center mb-4 border border-accent/20 shadow-sm">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-foreground">Radical Empathy</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Built by counselors, engineered by technologists. Every feature we ship is designed to reduce the anxiety of college selection.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Geometry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative h-[600px] rounded-[3rem] bg-gradient-to-br from-indigo-50 to-indigo-100/30 dark:from-indigo-950/40 dark:to-background border border-border/80 p-8 shadow-2xl overflow-hidden flex items-center justify-center"
          >
            {/* Architectural Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {/* Soft Ambient Glows (Fixed Blur) */}
            <div className="absolute top-1/4 -right-12 w-64 h-64 bg-primary/20 hover:bg-primary/30 blur-3xl rounded-full pointer-events-none transition-colors" />
            <div className="absolute bottom-1/4 -left-12 w-80 h-80 bg-accent/20 hover:bg-accent/30 blur-3xl rounded-full pointer-events-none transition-colors" />

            {/* Central Glass Card */}
            <div className="relative z-10 w-full max-w-sm">
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-primary/40 dark:bg-primary/60 rounded-full shadow-lg opacity-60 blur-3xl animate-pulse-slow" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-400/40 dark:bg-orange-500/60 rounded-full shadow-lg opacity-60 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
              
              <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-[2.5rem] shadow-2xl p-10 text-center transform transition-transform hover:scale-[1.02] duration-500">
                <div className="w-16 h-16 mx-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-md">
                   <Target className="w-8 h-8" />
                </div>
                <h3 className="text-5xl font-display font-extrabold text-slate-900 dark:text-white mb-4">100%</h3>
                <p className="text-xl font-bold text-slate-900 dark:text-white mb-3">Student-Centric</p>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Our architecture rejects noise. We process millions of data points solely to illuminate your clearest path forward.
                </p>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Trust Engineered.</p>
                </div>
              </div>
            </div>
            
            {/* Floating Metric Badge - Z-index fixed */}
            <motion.div 
               initial={{ y: 20 }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               className="absolute top-10 left-8 z-20 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-border p-4 rounded-2xl shadow-xl flex items-center gap-4"
            >
               <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                 <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
               </div>
               <div>
                 <p className="text-xl font-bold font-display leading-none mb-1 text-slate-900 dark:text-white">8+ Years</p>
                 <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">unbiased guidance</p>
               </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Meet the Experts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Led by professionals who understand education, counseling, product, and student experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {team.map((member, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="bg-card rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-shadow group text-center max-w-[280px] sm:max-w-none mx-auto w-full"
              >
                <div className="h-48 sm:h-56 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-us" className="py-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[30px] border border-border bg-slate-950 p-8 text-white shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                Contact Us
              </p>
              <h2 className="mt-3 text-3xl font-display font-bold">
                Visit, call, or register for guidance
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Students and parents usually need quick clarity on course fit, college shortlisting, exams, and affordability. Reach us directly or submit your details for counselling.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Head office</p>
                  <p className="mt-2 text-sm leading-6 text-white/85">
                    EduExpert Student Guidance Centre,
                    <br />
                    Chennai, Nungambakkam - 600034
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Support</p>
                  <p className="mt-2 text-sm leading-6 text-white/85">
                    +91 98765 43210
                    <br />
                    counselling@eduexpert.in
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">Office hours</p>
                  <p className="mt-2 text-sm leading-6 text-white/85">
                    Monday to Saturday
                    <br />
                    10:00 AM to 6:30 PM
                  </p>
                </div>
              </div>
            </div>

            <CounsellingForm
              title="Counselling registration"
              description="Fill in the details below. Your submissions are stored locally in this browser so you can continue later if needed."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
