import React, { useState } from 'react';
import { Search, BookOpen, Clock, TrendingUp, Building } from 'lucide-react';
import { COURSES } from '@/lib/data';
import { motion } from 'framer-motion';

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = COURSES.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Page Header */}
      <div className="bg-muted/30 py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Explore Courses</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover undergraduate and postgraduate programs that match your career goals. Explore curriculum, salary prospects, and top colleges.
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for courses (e.g., Computer Science, MBA)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white dark:bg-black transition-all outline-none text-foreground shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={course.id}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{course.name}</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 mr-3 text-accent" /> 
                  <span className="w-24">Duration:</span>
                  <span className="font-medium text-foreground">{course.duration}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 mr-3 text-emerald-500" /> 
                  <span className="w-24">Avg Salary:</span>
                  <span className="font-medium text-foreground">{course.avgSalary}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building className="w-4 h-4 mr-3 text-blue-500" /> 
                  <span className="w-24">Colleges:</span>
                  <span className="font-medium text-foreground">{course.collegesCount}</span>
                </div>
              </div>
              
              <button className="w-full py-2.5 rounded-xl font-semibold bg-muted text-foreground group-hover:bg-primary group-hover:text-white transition-colors">
                View Colleges
              </button>
            </motion.div>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-muted-foreground">No courses found matching "{searchTerm}"</h3>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
