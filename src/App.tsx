import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Layout } from "@/components/layout";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import Colleges from "@/pages/Colleges";
import Admissions from "@/pages/Admissions";
import News from "@/pages/News";
import Scholarships from "@/pages/Scholarships";
import Trends from "@/pages/Trends";
import About from "@/pages/About";
import CollegeDetail from "@/pages/CollegeDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/colleges/:slug" element={<CollegeDetail />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/news" element={<News />} />
              <Route path="/scholarships" element={<Scholarships />} />
              <Route path="/trends-2026" element={<Trends />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
