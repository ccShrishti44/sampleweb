"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Heart, Shield, Target } from "lucide-react";

import { CounsellingForm } from "@/components/counselling-form";
import { PageHero } from "@/components/page-hero";

export default function About() {
  const team = [
    { name: "Rahul Sharma", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
    { name: "Priya Patel", role: "Head of Counseling", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
    { name: "Amit Kumar", role: "CTO", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
    { name: "Sneha Reddy", role: "Director of Data & AI", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
    { name: "Vikram Singh", role: "University Relations", img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&q=80" },
    { name: "Ananya Desai", role: "Student Experience", img: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80" },
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              To democratize access to higher education information. Every student,
              regardless of background or location, should be able to make one of
              life&apos;s most important decisions with more clarity and less noise.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-muted/50 rounded-2xl border border-border">
                <Target className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold mb-2">Accuracy First</h4>
                <p className="text-sm text-muted-foreground">Data structured around real student questions and decision points.</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-2xl border border-border">
                <Shield className="w-8 h-8 text-accent mb-3" />
                <h4 className="font-bold mb-2">Unbiased</h4>
                <p className="text-sm text-muted-foreground">No forced rankings, just clearer context around fit, outcomes, and process.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" alt="Students" className="rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-border">
              <Heart className="w-10 h-10 text-red-500 fill-red-500 mb-2" />
              <p className="text-3xl font-display font-bold text-foreground">8+ Years</p>
              <p className="text-muted-foreground font-medium">Of building trust</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Meet the Experts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Led by professionals who understand education, counseling, product, and student experience.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx}
                className="bg-card rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-shadow group text-center"
              >
                <div className="h-64 overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
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
                    Sector 62, Noida, Uttar Pradesh 201309
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
