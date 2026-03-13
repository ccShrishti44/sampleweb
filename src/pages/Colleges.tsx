import React, { useState } from 'react';
import { COLLEGES } from '@/lib/data';
import { MapPin, Star, Filter, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Colleges() {
  const [filterStream, setFilterStream] = useState('All');

  const filteredColleges = filterStream === 'All' 
    ? COLLEGES 
    : COLLEGES.filter(c => c.category.includes(filterStream));

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 py-16 text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Top Colleges in India</h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Filter through India's best colleges based on ranking, fees, placements, and real student reviews.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-28">
            <div className="flex items-center gap-2 mb-6 font-bold text-lg pb-4 border-b border-border">
              <Filter className="w-5 h-5" /> Filters
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Stream</h4>
              <div className="space-y-2">
                {['All', 'Engineering', 'Medical', 'Management', 'Law'].map(stream => (
                  <label key={stream} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="stream" 
                      className="w-4 h-4 text-primary focus:ring-primary cursor-pointer"
                      checked={filterStream === stream}
                      onChange={() => setFilterStream(stream)}
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{stream}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">State / City</h4>
              <select className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary">
                <option>All Locations</option>
                <option>Delhi NCR</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
              </select>
            </div>
            
            <div>
              <button className="w-full py-2 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* College List */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Showing {filteredColleges.length} Colleges</h2>
            <select className="bg-background border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary">
              <option>Sort by: Popularity</option>
              <option>Sort by: Rank (High to Low)</option>
              <option>Sort by: Fees (Low to High)</option>
            </select>
          </div>

          <div className="space-y-6">
            {filteredColleges.map((college, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={college.id} 
                className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:shadow-xl hover:border-primary/30 transition-all"
              >
                <div className="sm:w-64 h-48 sm:h-auto relative flex-shrink-0">
                  <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-black flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent fill-accent" /> {college.rating}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground hover:text-primary cursor-pointer transition-colors">{college.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" /> {college.city} • <span className="text-primary font-medium">{college.rank}</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
                    <div className="bg-muted/50 p-3 rounded-xl border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">Courses</p>
                      <p className="font-semibold text-sm">{college.category}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-xl border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">Avg Fees</p>
                      <p className="font-semibold text-sm">{college.fees}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-xl border border-border/50">
                      <p className="text-xs text-muted-foreground mb-1">Exams Accepted</p>
                      <p className="font-semibold text-sm">{college.cutoff.split(' ')[0]}</p>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 py-2.5 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="flex-1 py-2.5 bg-white dark:bg-black text-foreground border-2 border-border font-semibold rounded-xl hover:border-foreground transition-all">
                      Download Brochure
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
