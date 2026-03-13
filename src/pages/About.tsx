import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Target, Shield, Heart } from 'lucide-react';

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
      {/* Hero Section */}
      <div className="bg-primary py-24 overflow-hidden relative">
        {/* Abstract circles */}
        <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-50%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground relative z-10">
          <div className="w-20 h-20 bg-white text-primary rounded-3xl mx-auto flex items-center justify-center shadow-2xl mb-8 rotate-12 hover:rotate-0 transition-transform duration-500">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Empowering Student Journeys</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            EduReach is India's most trusted college discovery platform. We blend AI-driven insights with human expertise to help you find the perfect college.
          </p>
        </div>
      </div>

      {/* Mission & Values */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              To democratize access to higher education information. We believe every student, regardless of their background or location, deserves access to accurate, unbiased data to make one of life's most crucial decisions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-4 bg-muted/50 rounded-2xl border border-border">
                <Target className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold mb-2">Accuracy First</h4>
                <p className="text-sm text-muted-foreground">Data verified by experts directly from universities.</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-2xl border border-border">
                <Shield className="w-8 h-8 text-accent mb-3" />
                <h4 className="font-bold mb-2">Unbiased</h4>
                <p className="text-sm text-muted-foreground">No paid rankings. Purely merit and data-driven results.</p>
              </div>
            </div>
          </div>
          <div className="relative">
            {/* descriptive comment for unsplash image */}
            {/* college campus students talking working together */}
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" alt="Students" className="rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
            <div className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-border">
              <Heart className="w-10 h-10 text-red-500 fill-red-500 mb-2" />
              <p className="text-3xl font-display font-bold text-foreground">8+ Years</p>
              <p className="text-muted-foreground font-medium">Of building trust</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Meet the Experts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Led by industry veterans with decades of experience in education and technology.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </div>
  );
}
