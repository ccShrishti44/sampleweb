"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Laptop, Zap, Globe, ShieldCheck, GraduationCap } from 'lucide-react';
import { PageHero } from '@/components/page-hero';

export default function Trends() {
  const trends = [
    { icon: <BrainCircuit />, title: "AI in Education", desc: "Online AI/ML course enrollments are up 300%. AI tutors and adaptive learning paths are becoming standard in top universities.", color: "from-purple-500 to-indigo-600" },
    { icon: <Laptop />, title: "Rise of Hybrid Learning", desc: "Over 70% of colleges have permanently adopted a hybrid model, blending campus life with flexible online learning modules.", color: "from-blue-500 to-cyan-500" },
    { icon: <Zap />, title: "Skill-Based Degrees", desc: "Traditional degrees are being replaced by micro-credentials and skill-focused integrated programs.", color: "from-orange-500 to-red-500" },
    { icon: <Globe />, title: "International Collaboration", desc: "Indian institutions are aggressively partnering with MIT, Stanford, and Oxford for dual-degree programs.", color: "from-emerald-400 to-teal-500" },
    { icon: <ShieldCheck />, title: "Coding in Every Stream", desc: "Basic computer science and data analysis are becoming mandatory for arts and commerce undergrads.", color: "from-pink-500 to-rose-500" },
    { icon: <GraduationCap />, title: "NEP 2020 Realization", desc: "The multidisciplinary approach is fully active. Students can now major in Physics and minor in Music seamlessly.", color: "from-amber-400 to-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Future Outlook"
        title="Education trends|that actually change decisions"
        description="See the higher-education shifts that matter to students choosing courses, colleges, and future-ready skills."
        variant="violet"
        stats={[
          ["Signals", "Technology, policy, employability"],
          ["Use", "Course and college planning"],
          ["Scope", "India-focused outlook"],
        ]}
      />

      {/* Heat Map Style Stats Grid */}
      <section className="py-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-primary p-8 rounded-3xl text-white flex flex-col justify-center shadow-2xl">
            <p className="text-4xl font-extrabold mb-2">35M+</p>
            <p className="text-sm opacity-90 font-medium">Students Enrolled</p>
          </div>
          <div className="bg-accent p-8 rounded-3xl text-white flex flex-col justify-center shadow-2xl">
            <p className="text-4xl font-extrabold mb-2">1000+</p>
            <p className="text-sm opacity-90 font-medium">New Colleges</p>
          </div>
          <div className="bg-indigo-900 p-8 rounded-3xl text-white flex flex-col justify-center shadow-2xl">
            <p className="text-4xl font-extrabold mb-2">40%</p>
            <p className="text-sm opacity-90 font-medium">Rise in Tech Enrollments</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-3xl text-foreground flex flex-col justify-center shadow-2xl border border-border">
            <p className="text-4xl font-extrabold mb-2 text-primary">300%</p>
            <p className="text-sm text-muted-foreground font-medium">Growth in AI Courses</p>
          </div>
        </div>
      </section>

      {/* Detailed Trends */}
      <section className="py-16 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-8">
          {trends.map((trend, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="flex gap-6 p-6 rounded-3xl bg-card border border-border hover:shadow-xl transition-shadow"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${trend.color} text-white flex items-center justify-center shrink-0 shadow-lg`}>
                {React.cloneElement(trend.icon, { className: 'w-8 h-8' })}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">{trend.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{trend.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
