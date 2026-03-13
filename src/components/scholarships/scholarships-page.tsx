"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  ChevronRight,
  GraduationCap,
  IndianRupee,
} from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { getScholarships } from "@/lib/services";

export default function Scholarships() {
  const SCHOLARSHIPS = getScholarships();

  return (
    <div className="min-h-screen bg-background">
      <PageHero
        eyebrow="Scholarship Finder"
        title="Fund your education|with better visibility"
        description="Explore scholarship options in a cleaner format so students can quickly understand amount, eligibility, and deadline before they act."
        variant="emerald"
        stats={[
          ["Funding view", "Government and private options"],
          ["Decision data", "Amount, eligibility, deadline"],
          ["Goal", "Reduce missed opportunities"],
        ]}
      >
        <div className="max-w-2xl rounded-[28px] border border-emerald-100 bg-white/80 p-2 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              placeholder="Search by scholarship name, category, or amount"
              className="flex-1 rounded-2xl border border-transparent bg-white px-4 py-3 text-sm text-foreground outline-none"
            />
            <button className="rounded-2xl bg-foreground px-6 py-3 text-sm font-bold text-background transition-colors hover:bg-primary">
              Find grants
            </button>
          </div>
        </div>
      </PageHero>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-display font-bold">Available Scholarships (2026)</h2>
          <div className="flex gap-2">
            <select className="bg-card border border-border rounded-lg px-4 py-2 focus:border-primary outline-none">
              <option>All Types</option>
              <option>Merit Based</option>
              <option>Means Based</option>
              <option>Government</option>
              <option>Private</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SCHOLARSHIPS.map((scholarship, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              key={scholarship.id}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <IndianRupee className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground leading-tight">{scholarship.name}</h3>
                    <p className="text-primary font-bold text-lg">{scholarship.amount}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 my-6 pt-4 border-t border-border/50">
                <div className="flex items-start gap-3 text-sm">
                  <GraduationCap className="w-5 h-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-xs">Eligibility</p>
                    <p className="font-medium">{scholarship.eligibility}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <CalendarDays className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-xs">Deadline</p>
                    <p className="font-medium text-red-600">{scholarship.deadline}</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 bg-muted text-foreground font-semibold rounded-xl group-hover:bg-primary group-hover:text-white transition-colors flex justify-center items-center gap-2">
                View Details & Apply <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
