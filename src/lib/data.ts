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
  fullName: string;
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
  entranceExams: string[];
  curriculumAreas: string[];
  topRoles: string[];
  idealFor: string[];
  admissionTips: string[];
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
    fullName: "Bachelor of Technology in Computer Science",
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
    entranceExams: ["JEE Main", "JEE Advanced", "BITSAT", "State CET"],
    curriculumAreas: [
      "Programming and software engineering",
      "Data structures and algorithms",
      "Databases, cloud, and distributed systems",
      "AI, ML, and cybersecurity foundations",
    ],
    topRoles: [
      "Software Engineer",
      "Data Engineer",
      "Product Analyst",
      "Cloud Developer",
    ],
    idealFor: [
      "Students who enjoy problem solving and logical systems",
      "Aspirants targeting tech product and software careers",
      "Learners planning higher studies in AI or computer systems",
    ],
    admissionTips: [
      "Prioritise strong PCM fundamentals and mock-test discipline.",
      "Compare branch quality, coding culture, and placement depth together.",
      "Shortlist colleges by branch strength, not brand alone.",
    ],
    featuredCollegeSlugs: ["iit-bombay", "iit-delhi", "vit-vellore"],
  },
  {
    id: 2,
    slug: "bsc-nursing",
    name: "B.Sc Nursing",
    fullName: "Bachelor of Science in Nursing",
    level: "Undergraduate",
    stream: "Medical",
    duration: "4 years",
    avgSalary: "INR 3.5-7 LPA",
    collegesCount: "650+ colleges",
    overview:
      "A professional healthcare degree focused on patient care, community health, clinical training, and evidence-based nursing practice.",
    learningFormat:
      "Classroom teaching is combined with simulation labs, hospital postings, supervised clinical rotations, and internship-led practice.",
    eligibility:
      "Class 12 with Physics, Chemistry, and Biology; admissions usually happen through NEET UG, state counselling, or institute-level nursing entrance processes.",
    outcomes: [
      "Clinical nursing roles across hospitals and healthcare centres",
      "Strong base for specialised nursing, public health, and postgraduate study",
      "Reliable healthcare pathway with long-term demand in India and abroad",
    ],
    specialisations: [
      "Medical-Surgical Nursing",
      "Community Health Nursing",
      "Pediatric Nursing",
      "Mental Health Nursing",
    ],
    entranceExams: ["NEET UG", "State nursing counselling", "Institute entrance tests"],
    curriculumAreas: [
      "Anatomy, physiology, nutrition, and microbiology",
      "Foundations of nursing and patient care",
      "Clinical rotations in medicine, surgery, pediatrics, and community health",
      "Nursing research, ethics, and hospital practice",
    ],
    topRoles: [
      "Registered Nurse",
      "Clinical Nurse",
      "ICU Nurse",
      "Community Health Officer",
    ],
    idealFor: [
      "Students who want a patient-facing healthcare career",
      "Aspirants seeking a practical clinical programme with strong employability",
      "Learners comfortable with hospital training, discipline, and care work",
    ],
    admissionTips: [
      "Hospital exposure and clinical training quality matter more than brochure claims.",
      "Compare recognition, internship support, and nursing faculty strength carefully.",
      "Shortlist colleges by clinical ecosystem, safety, and placement support together.",
    ],
    featuredCollegeSlugs: ["aiims-delhi", "manipal-university"],
  },
  {
    id: 3,
    slug: "mbbs",
    name: "MBBS",
    fullName: "Bachelor of Medicine and Bachelor of Surgery",
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
    entranceExams: ["NEET UG"],
    curriculumAreas: [
      "Anatomy, physiology, and biochemistry",
      "Clinical postings and hospital rotations",
      "Pathology, pharmacology, and diagnostics",
      "Patient care and internship training",
    ],
    topRoles: [
      "Junior Doctor",
      "Resident",
      "Clinical Research Associate",
      "Public Health Practitioner",
    ],
    idealFor: [
      "Students committed to long-term clinical training",
      "Aspirants targeting medical specialisation or hospital practice",
      "Learners comfortable with intensive academic and clinical work",
    ],
    admissionTips: [
      "NEET score is the primary filter, so planning should start with rank ranges.",
      "Compare fee structure, hospital exposure, and internship environment.",
      "Government vs private seat strategy should be decided early.",
    ],
    featuredCollegeSlugs: ["aiims-delhi", "manipal-university"],
  },
  {
    id: 4,
    slug: "mba",
    name: "MBA",
    fullName: "Master of Business Administration",
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
    entranceExams: ["CAT", "XAT", "GMAT", "SNAP", "MAT"],
    curriculumAreas: [
      "Business strategy and leadership",
      "Finance, marketing, and operations",
      "Analytics and decision science",
      "Case studies and internship-led learning",
    ],
    topRoles: [
      "Management Trainee",
      "Consultant",
      "Product Manager",
      "Financial Analyst",
    ],
    idealFor: [
      "Graduates targeting leadership-track roles",
      "Professionals seeking career acceleration",
      "Students interested in management plus business analytics",
    ],
    admissionTips: [
      "Percentile alone is not enough; profile and interviews matter too.",
      "Compare placements by role mix, not only top salary figures.",
      "Programme fee should be judged against median outcome and peer quality.",
    ],
    featuredCollegeSlugs: ["iim-ahmedabad", "symbiosis-international"],
  },
  {
    id: 5,
    slug: "ba-llb",
    name: "BA LLB",
    fullName: "Bachelor of Arts and Bachelor of Legislative Law",
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
    entranceExams: ["CLAT", "AILET", "SLAT", "LSAT India"],
    curriculumAreas: [
      "Constitutional and criminal law",
      "Moot courts and legal drafting",
      "Corporate law and policy studies",
      "Internships with firms, courts, and chambers",
    ],
    topRoles: [
      "Corporate Lawyer",
      "Litigation Associate",
      "Policy Researcher",
      "Judicial Services Aspirant",
    ],
    idealFor: [
      "Students interested in legal reasoning and public affairs",
      "Aspirants targeting law firms, litigation, or policy careers",
      "Learners comfortable with research, reading, and argumentation",
    ],
    admissionTips: [
      "Entrance exam choice shapes your college pool, so plan accordingly.",
      "Check internship exposure and alumni outcomes before shortlisting.",
      "Moot court culture and faculty strength matter early in law school.",
    ],
    featuredCollegeSlugs: ["nlu-delhi", "symbiosis-international"],
  },
  {
    id: 6,
    slug: "bdes-communication-design",
    name: "B.Des Communication Design",
    fullName: "Bachelor of Design in Communication Design",
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
    entranceExams: ["UCEED", "NID DAT", "Institute portfolio rounds"],
    curriculumAreas: [
      "Visual systems and communication design",
      "UI, UX, and digital product thinking",
      "Typography, storytelling, and branding",
      "Portfolio building and studio practice",
    ],
    topRoles: [
      "UI/UX Designer",
      "Visual Designer",
      "Brand Designer",
      "Motion Graphics Designer",
    ],
    idealFor: [
      "Students with a strong visual and creative inclination",
      "Aspirants targeting digital design and branding careers",
      "Learners who want studio-based project work",
    ],
    admissionTips: [
      "Portfolio strength can matter as much as entrance scores.",
      "Compare studios, faculty practice, and internship opportunities.",
      "Course labels differ, so review actual curriculum depth carefully.",
    ],
    featuredCollegeSlugs: ["iit-bombay", "christ-university"],
  },
  {
    id: 7,
    slug: "bsc-data-science",
    name: "B.Sc Data Science",
    fullName: "Bachelor of Science in Data Science",
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
    entranceExams: ["CUET", "University entrance tests", "Merit-based admission"],
    curriculumAreas: [
      "Statistics and probability",
      "Programming with data analysis",
      "Machine learning basics",
      "Business intelligence and visualisation",
    ],
    topRoles: [
      "Data Analyst",
      "BI Analyst",
      "Junior Data Scientist",
      "Research Assistant",
    ],
    idealFor: [
      "Students who enjoy mathematics and data interpretation",
      "Aspirants targeting analytics and tech-business roles",
      "Learners planning MSc, MBA, or AI-related study later",
    ],
    admissionTips: [
      "Check whether maths is mandatory or preferred for each college.",
      "Compare analytics tools, internships, and project exposure.",
      "Look at progression into higher studies along with entry roles.",
    ],
    featuredCollegeSlugs: ["christ-university", "delhi-university"],
  },
  {
    id: 8,
    slug: "bba",
    name: "BBA",
    fullName: "Bachelor of Business Administration",
    level: "Undergraduate",
    stream: "Management",
    duration: "3 years",
    avgSalary: "INR 4-9 LPA",
    collegesCount: "4,200+ colleges",
    overview:
      "A foundational management degree covering business basics, communication, analytics, and early industry exposure.",
    learningFormat:
      "Case discussions, presentations, projects, internships, and club-led business activities.",
    eligibility:
      "Class 12 in any stream; admission via merit, CUET, SET, or university-specific entrance processes.",
    outcomes: [
      "Strong base for management, sales, and operations roles",
      "Useful progression into MBA and specialised business study",
      "Good fit for students targeting early corporate exposure",
    ],
    specialisations: [
      "Marketing",
      "Finance",
      "Human Resources",
      "Business Analytics",
    ],
    entranceExams: ["CUET", "SET", "NPAT", "University entrance tests"],
    curriculumAreas: [
      "Management and business communication",
      "Finance, marketing, and HR basics",
      "Business analytics and digital tools",
      "Presentations, projects, and internships",
    ],
    topRoles: [
      "Business Development Executive",
      "Management Trainee",
      "Operations Associate",
      "Marketing Executive",
    ],
    idealFor: [
      "Students interested in business without waiting for postgraduate study",
      "Aspirants targeting MBA later with a business foundation",
      "Learners who prefer presentation-heavy and practical coursework",
    ],
    admissionTips: [
      "Look at internship support and corporate exposure, not just brand value.",
      "Review specialisation flexibility before finalising a college.",
      "Placement quality varies sharply across private and public institutes.",
    ],
    featuredCollegeSlugs: ["christ-university", "symbiosis-international"],
  },
  {
    id: 9,
    slug: "bca",
    name: "BCA",
    fullName: "Bachelor of Computer Applications",
    level: "Undergraduate",
    stream: "Science",
    duration: "3 years",
    avgSalary: "INR 4-8 LPA",
    collegesCount: "2,000+ colleges",
    overview:
      "A software-focused undergraduate programme that builds practical foundations in programming, databases, networking, and web development.",
    learningFormat:
      "Hands-on coding labs, mini projects, web app builds, and internship-oriented assignments.",
    eligibility:
      "Class 12 in any stream, often with Mathematics or Computer Science preferred; admission through merit or institute-specific tests.",
    outcomes: [
      "Entry into software, testing, and support engineering roles",
      "Strong base for MCA, MSc IT, or technical certifications",
      "Good bridge into application development and IT operations",
    ],
    specialisations: [
      "Web Development",
      "Mobile App Development",
      "Cloud Basics",
      "Cybersecurity",
    ],
    entranceExams: ["CUET", "University entrance tests", "Merit-based admission"],
    curriculumAreas: [
      "Programming fundamentals and OOP",
      "Web and application development",
      "Databases and operating systems",
      "Networking and software testing",
    ],
    topRoles: [
      "Software Support Engineer",
      "Junior Developer",
      "QA Analyst",
      "Web Developer",
    ],
    idealFor: [
      "Students seeking a practical IT path without an engineering degree",
      "Aspirants planning MCA or software certifications later",
      "Learners interested in coding and application building",
    ],
    admissionTips: [
      "Compare lab quality, coding culture, and internship opportunities.",
      "A BCA becomes much stronger with projects and portfolio work.",
      "Check whether the curriculum is modern enough for web and cloud tools.",
    ],
    featuredCollegeSlugs: ["christ-university", "delhi-university", "symbiosis-international"],
  },
  {
    id: 10,
    slug: "bpharm",
    name: "B.Pharm",
    fullName: "Bachelor of Pharmacy",
    level: "Undergraduate",
    stream: "Medical",
    duration: "4 years",
    avgSalary: "INR 4-8 LPA",
    collegesCount: "1,400+ colleges",
    overview:
      "A pharmacy degree focused on drug science, formulation, pharmacology, regulation, and healthcare industry pathways.",
    learningFormat:
      "Laboratory work, pharmaceutical science modules, industry visits, and regulated practical training.",
    eligibility:
      "Class 12 with Physics, Chemistry, and Biology or Mathematics; admission through state pharmacy tests, CUET, or institute processes.",
    outcomes: [
      "Careers in pharma industry, quality, and regulatory functions",
      "Foundation for M.Pharm, Pharm.D, or research pathways",
      "Useful route for healthcare plus science-oriented students",
    ],
    specialisations: [
      "Pharmacology",
      "Pharmaceutics",
      "Quality Assurance",
      "Clinical Research",
    ],
    entranceExams: ["State pharmacy entrance tests", "CUET", "Institute-specific tests"],
    curriculumAreas: [
      "Pharmaceutical chemistry",
      "Drug formulation and pharmaceutics",
      "Pharmacology and toxicology",
      "Regulation and quality assurance",
    ],
    topRoles: [
      "Production Executive",
      "Quality Analyst",
      "Regulatory Associate",
      "Clinical Research Coordinator",
    ],
    idealFor: [
      "Students interested in healthcare but not only clinical practice",
      "Aspirants targeting the pharmaceutical and life sciences sector",
      "Learners comfortable with lab-heavy scientific study",
    ],
    admissionTips: [
      "Check whether the college has strong pharma labs and industry links.",
      "Approval status and placement support matter more than brochure claims.",
      "Compare B.Pharm with allied health and biotech before deciding.",
    ],
    featuredCollegeSlugs: ["manipal-university", "christ-university"],
  },
  {
    id: 11,
    slug: "barch",
    name: "B.Arch",
    fullName: "Bachelor of Architecture",
    level: "Undergraduate",
    stream: "Design",
    duration: "5 years",
    avgSalary: "INR 5-10 LPA",
    collegesCount: "500+ colleges",
    overview:
      "A professional architecture degree combining design thinking, spatial planning, technical drawing, materials, and urban context.",
    learningFormat:
      "Studio crits, juries, model-making, drafting work, and design portfolio reviews.",
    eligibility:
      "Class 12 with Mathematics required; admission typically through NATA or JEE Main Paper 2.",
    outcomes: [
      "Pathways into architecture practice and urban design",
      "Foundation for planning, interiors, and sustainable design roles",
      "Suitable for students wanting creative plus technical work",
    ],
    specialisations: [
      "Urban Design",
      "Sustainable Architecture",
      "Interior Environments",
      "Landscape Design",
    ],
    entranceExams: ["NATA", "JEE Main Paper 2"],
    curriculumAreas: [
      "Architectural design studios",
      "Construction, materials, and structures",
      "History of architecture and planning",
      "Drafting, modelling, and urban context",
    ],
    topRoles: [
      "Architectural Designer",
      "Junior Architect",
      "Interior Space Planner",
      "Urban Design Associate",
    ],
    idealFor: [
      "Students who want a blend of creativity and technical precision",
      "Aspirants interested in buildings, cities, and spatial experience",
      "Learners comfortable with studio deadlines and portfolio work",
    ],
    admissionTips: [
      "Maths eligibility is non-negotiable for most recognised programmes.",
      "Review studio culture and faculty design practice before joining.",
      "Look closely at internship exposure and software training.",
    ],
    featuredCollegeSlugs: ["iit-delhi", "vit-vellore", "manipal-university"],
  },
  {
    id: 12,
    slug: "mtech-artificial-intelligence",
    name: "M.Tech Artificial Intelligence",
    fullName: "Master of Technology in Artificial Intelligence",
    level: "Postgraduate",
    stream: "Engineering",
    duration: "2 years",
    avgSalary: "INR 12-24 LPA",
    collegesCount: "350+ colleges",
    overview:
      "An advanced postgraduate programme focused on machine learning, deep learning, intelligent systems, and applied AI engineering.",
    learningFormat:
      "Research-driven labs, advanced projects, thesis work, and systems-oriented AI implementation.",
    eligibility:
      "Relevant bachelor's degree in engineering, computer science, mathematics, or allied discipline; admission commonly through GATE or institute processes.",
    outcomes: [
      "High-skill roles in AI engineering, ML systems, and research",
      "Strong route into doctoral study and specialised applied AI work",
      "Useful for upskilling after B.Tech, BCA-MCA, or similar technical paths",
    ],
    specialisations: [
      "Machine Learning Systems",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
    ],
    entranceExams: ["GATE", "Institute interviews", "Sponsored industry routes"],
    curriculumAreas: [
      "Machine learning and deep learning",
      "Computer vision and NLP",
      "Optimization and probabilistic methods",
      "Research methods and AI deployment",
    ],
    topRoles: [
      "Machine Learning Engineer",
      "AI Engineer",
      "Research Engineer",
      "Applied Scientist",
    ],
    idealFor: [
      "Graduates with strong math and coding foundations",
      "Aspirants targeting advanced AI or research roles",
      "Learners who want deeper specialisation than a general software track",
    ],
    admissionTips: [
      "Review lab strength, faculty publications, and compute resources.",
      "A specialised M.Tech makes sense only if depth is the real goal.",
      "Placement roles should be checked for actual AI relevance.",
    ],
    featuredCollegeSlugs: ["iit-bombay", "iit-delhi", "vit-vellore"],
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
