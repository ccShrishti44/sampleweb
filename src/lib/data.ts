export type Stream =
  | "Engineering"
  | "Medical"
  | "Management"
  | "Law"
  | "Design"
  | "Science";

export interface Course {
  id: number;
  slug: string;
  name: string;
  level: "Undergraduate" | "Postgraduate" | "Integrated";
  stream: Stream;
  duration: string;
  avgSalary: string;
  collegesCount: string;
  overview: string;
  learningFormat: string;
  eligibility: string;
  outcomes: string[];
  specialisations: string[];
  featuredCollegeSlugs: string[];
}

export interface College {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  city: string;
  state: string;
  location: string;
  rank: string;
  ownership: string;
  cutoff: string;
  fees: string;
  rating: number;
  image: string;
  established: string;
  approvedBy: string[];
  examsAccepted: string[];
  topPrograms: string[];
  highlights: string[];
  overview: string;
  placementRate: string;
  medianPackage: string;
  avgHostelFee: string;
  campusSize: string;
}

export interface NewsArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  readTime: string;
  featured?: boolean;
  keyTakeaways: string[];
  sections: NewsArticleSection[];
}

export const COURSES: Course[] = [
  {
    id: 1,
    slug: "btech-computer-science",
    name: "B.Tech Computer Science",
    level: "Undergraduate",
    stream: "Engineering",
    duration: "4 years",
    avgSalary: "INR 8-18 LPA",
    collegesCount: "3,500+ colleges",
    overview:
      "A rigorous engineering degree focused on software systems, algorithms, data platforms, AI foundations, and product engineering.",
    learningFormat:
      "Studio labs, coding projects, hackathons, internships, and capstone work with industry-oriented electives.",
    eligibility:
      "Class 12 with Physics, Chemistry, and Mathematics; admission usually via JEE Main, JEE Advanced, state CETs, or institute tests.",
    outcomes: [
      "Software engineering and product development roles",
      "AI, data engineering, and cloud pathways",
      "Strong progression into M.Tech, MS, or research tracks",
    ],
    specialisations: [
      "Artificial Intelligence",
      "Data Science",
      "Cybersecurity",
      "Cloud Computing",
    ],
    featuredCollegeSlugs: ["iit-bombay", "iit-delhi", "vit-vellore"],
  },
  {
    id: 2,
    slug: "mbbs",
    name: "MBBS",
    level: "Undergraduate",
    stream: "Medical",
    duration: "5.5 years",
    avgSalary: "INR 6-12 LPA",
    collegesCount: "700+ colleges",
    overview:
      "The core medical degree for students pursuing clinical practice, hospital training, and future specialisation.",
    learningFormat:
      "Pre-clinical coursework, ward rotations, supervised internships, and licensure-focused assessment.",
    eligibility:
      "Class 12 with Physics, Chemistry, and Biology; admission primarily through NEET UG.",
    outcomes: [
      "Clinical practice and residency preparation",
      "Public health, medical research, and hospital administration tracks",
      "Foundation for postgraduate specialisation",
    ],
    specialisations: [
      "General Medicine",
      "Surgery",
      "Pediatrics",
      "Radiology",
    ],
    featuredCollegeSlugs: ["aiims-delhi", "manipal-university"],
  },
  {
    id: 3,
    slug: "mba",
    name: "MBA",
    level: "Postgraduate",
    stream: "Management",
    duration: "2 years",
    avgSalary: "INR 10-28 LPA",
    collegesCount: "5,000+ colleges",
    overview:
      "A management programme designed for leadership, strategy, analytics, operations, and business transformation roles.",
    learningFormat:
      "Case-method learning, live consulting projects, summer internships, and placement-led skill development.",
    eligibility:
      "Bachelor's degree in any discipline; admission typically via CAT, XAT, GMAT, MAT, or institute-specific processes.",
    outcomes: [
      "Consulting, product, finance, and operations careers",
      "Leadership track roles in startups and large enterprises",
      "Career acceleration for early and mid-stage professionals",
    ],
    specialisations: [
      "Finance",
      "Marketing",
      "Operations",
      "Business Analytics",
    ],
    featuredCollegeSlugs: ["iim-ahmedabad", "symbiosis-international"],
  },
  {
    id: 4,
    slug: "ba-llb",
    name: "BA LLB",
    level: "Integrated",
    stream: "Law",
    duration: "5 years",
    avgSalary: "INR 5-12 LPA",
    collegesCount: "1,200+ colleges",
    overview:
      "An integrated law degree combining social sciences with legal studies, advocacy, and policy literacy.",
    learningFormat:
      "Moot courts, legal research, drafting clinics, internships with firms, courts, and policy institutions.",
    eligibility:
      "Class 12 in any stream; admission usually through CLAT, AILET, SLAT, or institute-specific entrance tests.",
    outcomes: [
      "Corporate law, litigation, policy, and judicial services preparation",
      "Strong foundation for LLM or legal research",
      "Pathways into public policy and regulatory work",
    ],
    specialisations: [
      "Corporate Law",
      "Constitutional Law",
      "Intellectual Property",
      "Criminal Law",
    ],
    featuredCollegeSlugs: ["nlu-delhi", "symbiosis-international"],
  },
  {
    id: 5,
    slug: "bdes-communication-design",
    name: "B.Des Communication Design",
    level: "Undergraduate",
    stream: "Design",
    duration: "4 years",
    avgSalary: "INR 5-10 LPA",
    collegesCount: "450+ colleges",
    overview:
      "A design-led programme covering visual systems, UX, branding, storytelling, and digital product communication.",
    learningFormat:
      "Portfolio reviews, studio critiques, industry briefs, and interdisciplinary creative practice.",
    eligibility:
      "Class 12 in any stream; admission typically through design aptitude tests and portfolio evaluation.",
    outcomes: [
      "Careers in branding, visual communication, UI/UX, and digital media",
      "Strong portfolio development for agencies and product companies",
      "Foundation for advanced design and strategy studies",
    ],
    specialisations: [
      "Brand Design",
      "UI and UX",
      "Motion Graphics",
      "Editorial Systems",
    ],
    featuredCollegeSlugs: ["iit-bombay", "christ-university"],
  },
  {
    id: 6,
    slug: "bsc-data-science",
    name: "B.Sc Data Science",
    level: "Undergraduate",
    stream: "Science",
    duration: "3 years",
    avgSalary: "INR 6-14 LPA",
    collegesCount: "900+ colleges",
    overview:
      "A quantitative degree covering statistics, programming, machine learning foundations, and business-facing analytics.",
    learningFormat:
      "Applied analytics labs, datasets, visualization work, and domain-focused capstones.",
    eligibility:
      "Class 12 with Mathematics preferred; admissions through merit, CUET, or institute-specific tests.",
    outcomes: [
      "Analytics, BI, and junior data science roles",
      "Preparation for AI, economics, and data research pathways",
      "Useful base for MSc, MBA, or specialist certification",
    ],
    specialisations: [
      "Machine Learning",
      "Applied Statistics",
      "Business Intelligence",
      "Data Visualization",
    ],
    featuredCollegeSlugs: ["christ-university", "delhi-university"],
  },
];

export const COLLEGES: College[] = [
  {
    id: 1,
    slug: "iit-bombay",
    name: "Indian Institute of Technology Bombay",
    shortName: "IIT Bombay",
    category: "Engineering",
    city: "Mumbai",
    state: "Maharashtra",
    location: "Powai, Mumbai",
    rank: "NIRF Rank 1",
    ownership: "Public Institute",
    cutoff: "JEE Advanced top ranks",
    fees: "INR 2.3L per year",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
    established: "1958",
    approvedBy: ["Institute of National Importance", "UGC"],
    examsAccepted: ["JEE Advanced", "GATE", "IIT JAM", "CEED"],
    topPrograms: [
      "B.Tech Computer Science",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Design and Innovation",
    ],
    highlights: [
      "Premier engineering and research ecosystem",
      "Strong startup and incubation culture",
      "Global recruiter participation and high research output",
    ],
    overview:
      "IIT Bombay is one of India's most selective engineering institutions, known for deep technical rigour, strong placements, and a mature innovation ecosystem.",
    placementRate: "88%",
    medianPackage: "INR 22 LPA",
    avgHostelFee: "INR 78K per year",
    campusSize: "550 acres",
  },
  {
    id: 2,
    slug: "iit-delhi",
    name: "Indian Institute of Technology Delhi",
    shortName: "IIT Delhi",
    category: "Engineering",
    city: "Delhi",
    state: "Delhi",
    location: "Hauz Khas, New Delhi",
    rank: "NIRF Rank 2",
    ownership: "Public Institute",
    cutoff: "JEE Advanced top ranks",
    fees: "INR 2.2L per year",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80",
    established: "1961",
    approvedBy: ["Institute of National Importance", "UGC"],
    examsAccepted: ["JEE Advanced", "GATE", "IIT JAM", "CEED"],
    topPrograms: [
      "B.Tech Computer Science",
      "Textile and Fibre Engineering",
      "Mathematics and Computing",
      "Design",
    ],
    highlights: [
      "Strong academics with close industry collaboration",
      "Excellent placement depth across tech, core, and consulting",
      "Research-led environment with strong postgraduate pipelines",
    ],
    overview:
      "IIT Delhi combines a research-focused academic culture with exceptional employer access, making it one of the most balanced institutes for engineering aspirants.",
    placementRate: "86%",
    medianPackage: "INR 20 LPA",
    avgHostelFee: "INR 72K per year",
    campusSize: "320 acres",
  },
  {
    id: 3,
    slug: "aiims-delhi",
    name: "All India Institute of Medical Sciences Delhi",
    shortName: "AIIMS Delhi",
    category: "Medical",
    city: "Delhi",
    state: "Delhi",
    location: "Ansari Nagar, New Delhi",
    rank: "NIRF Rank 1 Medical",
    ownership: "Public Institute",
    cutoff: "NEET UG top scores",
    fees: "INR 7K per year",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1200&q=80",
    established: "1956",
    approvedBy: ["NMC", "Institute of National Importance"],
    examsAccepted: ["NEET UG", "INI CET"],
    topPrograms: ["MBBS", "B.Sc Nursing", "MD", "MS"],
    highlights: [
      "India's benchmark institution for medical training",
      "High patient exposure and advanced clinical infrastructure",
      "Strong postgraduate, research, and specialist pathways",
    ],
    overview:
      "AIIMS Delhi is widely regarded as the most prestigious medical institution in the country, with exceptional academic standards and hospital exposure.",
    placementRate: "Clinical residency track",
    medianPackage: "Specialisation dependent",
    avgHostelFee: "INR 12K per year",
    campusSize: "214 acres",
  },
  {
    id: 4,
    slug: "iim-ahmedabad",
    name: "Indian Institute of Management Ahmedabad",
    shortName: "IIM Ahmedabad",
    category: "Management",
    city: "Ahmedabad",
    state: "Gujarat",
    location: "Vastrapur, Ahmedabad",
    rank: "NIRF Rank 1 Management",
    ownership: "Public Institute",
    cutoff: "CAT 99+ percentile",
    fees: "INR 25L total",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
    established: "1961",
    approvedBy: ["UGC", "EQUIS"],
    examsAccepted: ["CAT", "GMAT"],
    topPrograms: [
      "MBA",
      "MBA in Food and Agri-Business",
      "Executive MBA",
      "Doctoral Programme",
    ],
    highlights: [
      "Case-method pedagogy and strong leadership outcomes",
      "Elite recruiter mix across consulting, finance, and product",
      "Strong alumni influence in business and policy",
    ],
    overview:
      "IIM Ahmedabad is the benchmark management school for ambitious leadership careers, combining academic intensity with strong recruiter confidence.",
    placementRate: "100%",
    medianPackage: "INR 31 LPA",
    avgHostelFee: "Included in programme fee",
    campusSize: "102 acres",
  },
  {
    id: 5,
    slug: "nlu-delhi",
    name: "National Law University Delhi",
    shortName: "NLU Delhi",
    category: "Law",
    city: "Delhi",
    state: "Delhi",
    location: "Sector 14, Dwarka",
    rank: "Top national law school",
    ownership: "Public University",
    cutoff: "AILET top ranks",
    fees: "INR 3.5L per year",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1200&q=80",
    established: "2008",
    approvedBy: ["Bar Council of India", "UGC"],
    examsAccepted: ["AILET"],
    topPrograms: ["BA LLB", "LLM", "PhD in Law"],
    highlights: [
      "Strong legal research culture and courtroom preparation",
      "Consistent law firm and chambers placements",
      "Well-regarded policy and public law orientation",
    ],
    overview:
      "NLU Delhi is among the strongest destinations for integrated legal education, especially for students targeting litigation, corporate law, and public policy.",
    placementRate: "Consistent placement support",
    medianPackage: "INR 16 LPA",
    avgHostelFee: "INR 1.1L per year",
    campusSize: "21 acres",
  },
  {
    id: 6,
    slug: "vit-vellore",
    name: "Vellore Institute of Technology",
    shortName: "VIT Vellore",
    category: "Engineering",
    city: "Vellore",
    state: "Tamil Nadu",
    location: "Katpadi, Vellore",
    rank: "NIRF Top private engineering college",
    ownership: "Private University",
    cutoff: "VITEEE / board merit",
    fees: "INR 2-5L per year",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1525926476834-6cb0f6b55850?w=1200&q=80",
    established: "1984",
    approvedBy: ["UGC", "NAAC A++"],
    examsAccepted: ["VITEEE", "Direct admission for select programmes"],
    topPrograms: [
      "B.Tech Computer Science",
      "Electronics and Communication",
      "Biotechnology",
      "Integrated M.Tech",
    ],
    highlights: [
      "Large programme basket with modern infrastructure",
      "Strong industry-facing placements and global tie-ups",
      "Suitable for students wanting scale and flexibility",
    ],
    overview:
      "VIT Vellore offers strong private-university scale, placement volume, and programme variety, especially in engineering and technology disciplines.",
    placementRate: "84%",
    medianPackage: "INR 8.9 LPA",
    avgHostelFee: "INR 95K per year",
    campusSize: "372 acres",
  },
  {
    id: 7,
    slug: "christ-university",
    name: "Christ University",
    shortName: "Christ University",
    category: "Science",
    city: "Bengaluru",
    state: "Karnataka",
    location: "Hosur Road, Bengaluru",
    rank: "Leading private multidisciplinary university",
    ownership: "Private Deemed University",
    cutoff: "Merit and university process",
    fees: "INR 1.7-4.0L per year",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1546410531-bea5aadcb6ce?w=1200&q=80",
    established: "1969",
    approvedBy: ["UGC", "NAAC A+"],
    examsAccepted: ["CUET", "Christ selection process"],
    topPrograms: [
      "B.Sc Data Science",
      "BBA",
      "B.Com",
      "B.Des",
    ],
    highlights: [
      "Strong student support and campus culture",
      "Broad multidisciplinary options with formal academic environment",
      "Good fit for commerce, social science, and analytics pathways",
    ],
    overview:
      "Christ University is a popular multidisciplinary option for students seeking structured academics, strong campus systems, and broad programme choice.",
    placementRate: "80%",
    medianPackage: "INR 6.5 LPA",
    avgHostelFee: "INR 1.2L per year",
    campusSize: "25 acres",
  },
  {
    id: 8,
    slug: "delhi-university",
    name: "University of Delhi",
    shortName: "Delhi University",
    category: "Science",
    city: "Delhi",
    state: "Delhi",
    location: "North and South Campus, Delhi",
    rank: "Top central university",
    ownership: "Public University",
    cutoff: "CUET and merit-led admission",
    fees: "INR 12K-35K per year",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1592284918239-16d10c71a364?w=1200&q=80",
    established: "1922",
    approvedBy: ["UGC", "NAAC A+"],
    examsAccepted: ["CUET UG", "CUET PG"],
    topPrograms: [
      "B.Sc Data Science pathways",
      "BA Programme",
      "B.Com",
      "MA and MSc tracks",
    ],
    highlights: [
      "Wide college network and strong academic reputation",
      "High affordability with strong peer ecosystem",
      "Strong pathways into civil services, academia, and analytics",
    ],
    overview:
      "Delhi University remains one of the country's most attractive public university options because of affordability, scale, and academic depth across disciplines.",
    placementRate: "College dependent",
    medianPackage: "Varies by college and programme",
    avgHostelFee: "College dependent",
    campusSize: "Distributed city campus",
  },
  {
    id: 9,
    slug: "symbiosis-international",
    name: "Symbiosis International University",
    shortName: "Symbiosis",
    category: "Management",
    city: "Pune",
    state: "Maharashtra",
    location: "Lavale and city campuses, Pune",
    rank: "Top private university",
    ownership: "Private Deemed University",
    cutoff: "SNAP / SLAT / institute tests",
    fees: "INR 3-12L per year",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
    established: "1971",
    approvedBy: ["UGC", "NAAC A++"],
    examsAccepted: ["SNAP", "SLAT", "SET"],
    topPrograms: ["MBA", "BA LLB", "BBA", "Media and Communication"],
    highlights: [
      "Strong brand in management and law",
      "Urban-industry exposure and practical programme design",
      "Large applicant demand with multi-campus flexibility",
    ],
    overview:
      "Symbiosis is a strong private-university option for management, law, and allied professional degrees with a polished student experience.",
    placementRate: "82%",
    medianPackage: "INR 9 LPA",
    avgHostelFee: "INR 1.4L per year",
    campusSize: "300+ acres across campuses",
  },
  {
    id: 10,
    slug: "manipal-university",
    name: "Manipal Academy of Higher Education",
    shortName: "Manipal University",
    category: "Medical",
    city: "Manipal",
    state: "Karnataka",
    location: "Manipal, Udupi district",
    rank: "Leading private health sciences university",
    ownership: "Private Deemed University",
    cutoff: "MET / NEET / course-specific process",
    fees: "INR 3-17L per year",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&q=80",
    established: "1953",
    approvedBy: ["UGC", "NMC", "NAAC A++"],
    examsAccepted: ["MET", "NEET UG", "NEET PG"],
    topPrograms: ["MBBS", "BDS", "Allied Health Sciences", "Biomedical Engineering"],
    highlights: [
      "Strong health sciences ecosystem with international visibility",
      "Well-developed campus living and student support",
      "Good mix of medical and allied health programmes",
    ],
    overview:
      "Manipal is one of the best-known private destinations for medical and allied health education, backed by long institutional experience.",
    placementRate: "Programme dependent",
    medianPackage: "Varies by discipline",
    avgHostelFee: "INR 1.6L per year",
    campusSize: "313 acres",
  },
];

export const NEWS: NewsArticle[] = [
  {
    id: 1,
    slug: "jee-main-2026-session-1-results-declared",
    title: "JEE Main 2026 Session 1 Results Declared - Check Scorecard",
    date: "Mar 5, 2026",
    category: "Exams",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80",
    excerpt:
      "Candidates can now review scorecards, percentile breakdowns, and next-step timelines for Session 2 planning.",
    readTime: "4 min read",
    keyTakeaways: [
      "Session 1 scorecards help students recalibrate Session 2 goals.",
      "Percentile interpretation matters more than raw score alone.",
      "Students should begin counselling prep and shortlist revisions immediately.",
    ],
    sections: [
      {
        heading: "What the result means",
        paragraphs: [
          "The Session 1 result gives students an early benchmark for how competitive their current preparation stands against the national pool.",
          "For many students, this is less about final admission and more about identifying where improvement is possible before the next attempt.",
        ],
      },
      {
        heading: "What students should do next",
        paragraphs: [
          "Students targeting a higher percentile should analyse weak sections and set a more disciplined revision plan for Session 2.",
          "Those already in a strong range should begin refining college targets, exam strategy, and backup options instead of waiting.",
        ],
      },
    ],
  },
  {
    id: 2,
    slug: "neet-2026-registration-opens",
    title: "NEET 2026 Registration Opens - Key Dates and Documents Required",
    date: "Mar 8, 2026",
    category: "Admissions",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80",
    excerpt:
      "The registration window has opened, and students should prioritise document accuracy and application review early.",
    readTime: "5 min read",
    featured: true,
    keyTakeaways: [
      "Application mistakes create avoidable stress later in the cycle.",
      "Students should verify identity and category documents early.",
      "NEET preparation plans should now align with exam-day execution.",
    ],
    sections: [
      {
        heading: "Application priorities",
        paragraphs: [
          "The first priority is not speed, but accuracy. Students should verify names, date of birth, category details, and uploaded documents before final submission.",
          "Using the first few days of the registration window reduces the chance of rushed errors closer to the deadline.",
        ],
      },
      {
        heading: "Preparation alongside registration",
        paragraphs: [
          "Registration should be treated as an administrative checkpoint, not a pause in preparation.",
          "At this stage, students should align revision calendars, mock practice, and time management with the exam timeline.",
        ],
      },
    ],
  },
  {
    id: 3,
    slug: "iit-bombay-launches-new-ai-ml-programme",
    title: "IIT Bombay Launches New AI and ML Programme for 2026 Batch",
    date: "Mar 1, 2026",
    category: "Colleges",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80",
    excerpt:
      "The new programme signals stronger specialised demand in AI-led engineering education at top institutes.",
    readTime: "3 min read",
    keyTakeaways: [
      "AI-focused programmes are increasingly becoming core, not elective.",
      "Students should compare curriculum depth, not just course labels.",
      "Top institutes are formalising industry-facing AI pathways.",
    ],
    sections: [
      {
        heading: "Why this matters",
        paragraphs: [
          "New AI and ML programmes at top institutes indicate long-term institutional commitment to high-demand specialisations.",
          "Students evaluating such programmes should compare faculty strength, labs, industry projects, and placement alignment instead of reacting to the headline alone.",
        ],
      },
    ],
  },
  {
    id: 4,
    slug: "cat-2025-toppers-share-their-preparation-strategy",
    title: "CAT 2025 Toppers Share Their Preparation Strategy",
    date: "Feb 28, 2026",
    category: "Success Stories",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80",
    excerpt:
      "The strongest preparation patterns were consistency, mock analysis, and section-wise discipline rather than volume alone.",
    readTime: "4 min read",
    keyTakeaways: [
      "Mock analysis matters more than mock count.",
      "A structured weekly review builds steady percentile improvement.",
      "Students should prepare for interviews alongside exam goals.",
    ],
    sections: [
      {
        heading: "Patterns among toppers",
        paragraphs: [
          "The most repeatable pattern among high performers is disciplined review. Strong candidates use mocks to identify behavioural gaps, not just academic gaps.",
          "Section timing, stress control, and decision-making under pressure usually separate top percentiles from the rest.",
        ],
      },
    ],
  },
  {
    id: 5,
    slug: "top-engineering-colleges-accepting-jee-main-score-2026",
    title: "Top Engineering Colleges Accepting JEE Main Score in 2026",
    date: "Mar 10, 2026",
    category: "Guide",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&q=80",
    excerpt:
      "A useful shortlist is built by combining score range, fees, city, and branch preference, not rank alone.",
    readTime: "6 min read",
    keyTakeaways: [
      "Branch preference should be weighed against institution strength.",
      "Students need realistic, target, and aspirational buckets.",
      "Fees and location can meaningfully change a shortlist.",
    ],
    sections: [
      {
        heading: "How to build the shortlist",
        paragraphs: [
          "A strong shortlist balances ambition with probability. Students should separate aspirational, realistic, and safer options instead of chasing only brand names.",
          "Fee sensitivity, branch alignment, and city preference should be part of the shortlist from the beginning.",
        ],
      },
    ],
  },
  {
    id: 6,
    slug: "cuet-2026-what-students-should-finalise-before-applications",
    title: "CUET 2026: What Students Should Finalise Before Applications",
    date: "Mar 7, 2026",
    category: "Admissions",
    image:
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=500&q=80",
    excerpt:
      "Programme combinations, subject choices, and university targeting should be clarified before students submit forms.",
    readTime: "5 min read",
    keyTakeaways: [
      "Subject combinations affect programme eligibility later.",
      "Students should shortlist universities before form filling.",
      "Application quality improves when decisions are made upfront.",
    ],
    sections: [
      {
        heading: "Before filling the form",
        paragraphs: [
          "Students should not approach CUET as a generic entrance form. Subject choices directly shape future programme eligibility and should be mapped carefully.",
          "Shortlisting universities and likely programmes before submission reduces later confusion and mismatch.",
        ],
      },
    ],
  },
  {
    id: 7,
    slug: "pm-scholarship-applications-closing-soon",
    title: "Scholarship Alert: PM Scholarship Applications Closing Soon",
    date: "Mar 9, 2026",
    category: "Scholarships",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80",
    excerpt:
      "Students eligible for the PM Scholarship should finalise documentation and submission immediately to avoid missing the window.",
    readTime: "3 min read",
    keyTakeaways: [
      "Deadline-led scholarships need document readiness in advance.",
      "Students should verify eligibility before uploading.",
      "Counselling support can help if financial planning is part of college choice.",
    ],
    sections: [
      {
        heading: "Immediate action items",
        paragraphs: [
          "Students should verify eligibility criteria and complete document review before beginning final submission.",
          "Where scholarships affect final college choice, financial planning should happen at the same time as academic shortlisting.",
        ],
      },
    ],
  },
  {
    id: 8,
    slug: "indias-education-sector-growth-and-digital-demand",
    title: "India's Education Sector Continues to Grow with Strong Digital Demand",
    date: "Mar 3, 2026",
    category: "Trends",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
    excerpt:
      "Digital-first delivery, skills-led programmes, and employability pressure continue to reshape higher education expectations.",
    readTime: "4 min read",
    keyTakeaways: [
      "Students increasingly compare employability, not just degree labels.",
      "Hybrid learning and digital support systems are now expected.",
      "Specialised programmes continue to gain demand over generic offerings.",
    ],
    sections: [
      {
        heading: "What students should infer",
        paragraphs: [
          "Sector growth does not mean every programme offers equal value. Students should evaluate outcomes, teaching format, and recruiter demand more carefully than before.",
          "The strongest institutions are combining academic credibility with digital support, career services, and specialised pathways.",
        ],
      },
    ],
  },
];

export const SCHOLARSHIPS = [
  {
    id: 1,
    name: "PM Scholarship Scheme",
    amount: "INR 25,000 per year",
    eligibility: "Merit-based support for eligible students",
    deadline: "31 Dec 2026",
  },
  {
    id: 2,
    name: "National Merit Scholarship",
    amount: "INR 12,000 per year",
    eligibility: "Class 12 students with 60% and above",
    deadline: "15 Jan 2027",
  },
  {
    id: 3,
    name: "Sitaram Jindal Scholarship",
    amount: "INR 2,500 per month",
    eligibility: "Family income below INR 2L",
    deadline: "30 Nov 2026",
  },
  {
    id: 4,
    name: "AICTE Pragati Scholarship",
    amount: "INR 50,000 per year",
    eligibility: "Eligible girl students in technical education",
    deadline: "20 Feb 2027",
  },
  {
    id: 5,
    name: "INSPIRE Scholarship",
    amount: "INR 80,000 per year",
    eligibility: "Top 1% performers in Class 12",
    deadline: "31 Mar 2027",
  },
  {
    id: 6,
    name: "Reliance Foundation Scholarship",
    amount: "Up to INR 4,00,000",
    eligibility: "Eligible undergraduate students",
    deadline: "15 Mar 2027",
  },
];

export const EXAM_TIMELINE = [
  {
    exam: "JEE Main (Session 1)",
    status: "Results Declared",
    date: "Jan 24 - Feb 1, 2026",
    color: "bg-green-100 text-green-700",
  },
  {
    exam: "JEE Main (Session 2)",
    status: "Registration Open",
    date: "Apr 1 - Apr 15, 2026",
    color: "bg-blue-100 text-blue-700",
  },
  {
    exam: "NEET UG",
    status: "Upcoming",
    date: "May 3, 2026",
    color: "bg-orange-100 text-orange-700",
  },
  {
    exam: "CUET UG",
    status: "Upcoming",
    date: "May 15 - May 31, 2026",
    color: "bg-orange-100 text-orange-700",
  },
  {
    exam: "CLAT",
    status: "Registration Open",
    date: "Dec 1, 2026",
    color: "bg-blue-100 text-blue-700",
  },
  {
    exam: "CAT",
    status: "Upcoming",
    date: "Nov 29, 2026",
    color: "bg-purple-100 text-purple-700",
  },
];

export type DeadlineEventType = "Exam" | "Registration" | "Scholarship" | "Results";

export interface DeadlineEvent {
  id: number;
  date: string;
  title: string;
  type: DeadlineEventType;
  status: string;
  details: string;
  link?: string;
}

export const DEADLINE_EVENTS: DeadlineEvent[] = [
  {
    id: 1,
    date: "2026-03-15",
    title: "Reliance Foundation Scholarship",
    type: "Scholarship",
    status: "Deadline",
    details:
      "Final date to submit the undergraduate scholarship application and supporting documents.",
  },
  {
    id: 2,
    date: "2026-03-31",
    title: "INSPIRE Scholarship",
    type: "Scholarship",
    status: "Last Date",
    details:
      "Science students in the top 1% of Class 12 results should complete document upload before this date.",
  },
  {
    id: 3,
    date: "2026-04-01",
    title: "JEE Main Session 2 Registration Opens",
    type: "Registration",
    status: "Opens",
    details:
      "Candidates can begin registration for the April session and verify exam city preferences.",
  },
  {
    id: 4,
    date: "2026-04-15",
    title: "JEE Main Session 2 Registration Closes",
    type: "Registration",
    status: "Deadline",
    details:
      "Final date to complete submission, fee payment, and exam centre confirmation.",
  },
  {
    id: 5,
    date: "2026-05-03",
    title: "NEET UG 2026 Exam Day",
    type: "Exam",
    status: "Exam Day",
    details:
      "Single-day examination for MBBS and allied medical admissions across approved test centres.",
  },
  {
    id: 6,
    date: "2026-05-15",
    title: "CUET UG 2026 Begins",
    type: "Exam",
    status: "Exam Start",
    details:
      "National common entrance testing window begins for central and participating universities.",
  },
  {
    id: 7,
    date: "2026-06-01",
    title: "JEE Advanced Registration Opens",
    type: "Registration",
    status: "Opens",
    details:
      "Qualified JEE Main candidates can complete registration for IIT admissions.",
  },
  {
    id: 8,
    date: "2026-06-15",
    title: "JEE Advanced 2026 Exam",
    type: "Exam",
    status: "Exam Day",
    details:
      "Computer-based Paper 1 and Paper 2 conducted for IIT admissions.",
  },
  {
    id: 9,
    date: "2026-07-10",
    title: "JEE Advanced Results",
    type: "Results",
    status: "Results",
    details:
      "Scorecards are released and counselling schedules begin shortly after result publication.",
  },
  {
    id: 10,
    date: "2026-11-29",
    title: "CAT 2026 Exam Day",
    type: "Exam",
    status: "Exam Day",
    details:
      "MBA entrance exam for IIMs and other leading management institutes.",
  },
];

export const STREAM_OPTIONS: Array<"All" | Stream> = [
  "All",
  "Engineering",
  "Medical",
  "Management",
  "Law",
  "Design",
  "Science",
];

export function getCollegeBySlug(slug: string) {
  return COLLEGES.find((college) => college.slug === slug);
}

export function getNewsArticleBySlug(slug: string) {
  return NEWS.find((article) => article.slug === slug);
}
