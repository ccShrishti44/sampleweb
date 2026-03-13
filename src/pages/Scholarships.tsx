import React from 'react';
import { SCHOLARSHIPS } from '@/lib/data';
import { IndianRupee, CalendarDays, GraduationCap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Scholarships() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-indigo-900 via-primary to-indigo-950 py-20 text-white relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="bg-accent text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 inline-block shadow-lg">₹50 Cr+ Disbursed</span>
          <h1 className="text-4xl md:text-6xl font-display font-extrabold mb-6">Fund Your Education</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Never let financial constraints stop your dreams. Explore government, private, and university-specific scholarships.
          </p>
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-2 rounded-2xl flex border border-white/20">
            <input type="text" placeholder="Search by name, category, or amount..." className="flex-1 bg-transparent border-none text-white px-4 outline-none placeholder:text-white/60" />
            <button className="bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">Find Grants</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-display font-bold">Available Scholarships (2026)</h2>
          <div className="flex gap-2">
            <select className="bg-card border border-border rounded-lg px-4 py-2 focus:border-primary outline-none">
              <option>All Types</option>
              <option>Merit Based</option>
              <option>Means Based (EWS)</option>
              <option>Government</option>
              <option>Private</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
