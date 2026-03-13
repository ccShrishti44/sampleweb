import React from 'react';
import { NEWS } from '@/lib/data';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function News() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-muted/30 py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Latest Education News</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Stay updated with exam notifications, admission guidelines, college updates, and the latest trends in the education sector.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Article */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden mb-16 h-[400px] md:h-[500px] group cursor-pointer"
        >
          {/* descriptive comment for unsplash image */}
          {/* education graduation students smiling cheering outdoors */}
          <img src="https://pixabay.com/get/g814c5b61978664cbe163e23779ad7d53fcc4496d01f19aeaf272a2dc54ca31475403bf637181b497022e4f4186ade709e4a530711b08000a9b3537e095b955d8_1280.jpg" alt="Featured News" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
            <div className="p-8 md:p-12 max-w-3xl text-white">
              <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">Featured</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 group-hover:text-primary-foreground transition-colors">
                New Education Policy 2026: Major Changes in Undergraduate Admissions
              </h2>
              <div className="flex items-center gap-4 text-sm opacity-80">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> March 12, 2026</span>
                <span>• 5 min read</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-6 mb-8 hide-scrollbar">
          {['All News', 'Exams', 'Admissions', 'Colleges', 'Scholarships', 'Trends'].map((cat, i) => (
            <button key={i} className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-colors ${
              i === 0 ? 'bg-primary text-white' : 'bg-muted text-foreground hover:bg-muted/80'
            }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS.map((article, idx) => (
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={article.id} 
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group flex flex-col cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur text-black text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.date}
                </p>
                <h3 className="text-xl font-bold text-foreground mb-4 leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-primary font-semibold">
                  Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
