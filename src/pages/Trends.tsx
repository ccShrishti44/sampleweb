import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Laptop, Zap, Globe, ShieldCheck, GraduationCap } from 'lucide-react';

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
      <div className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-background" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center pt-10">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-block border border-accent/50 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-md">
            FUTURE OUTLOOK
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6">Education Trends 2026</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how technology, policy changes, and global integration are reshaping the future of higher education in India.
          </p>
        </div>
      </div>

      {/* Heat Map Style Stats Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
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
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
