import { COLLEGES, getCollegeBySlug as getBaseCollegeBySlug, STREAM_OPTIONS } from "@/lib/data";
import type {
  College,
  CollegeCompareField,
  CollegeExperienceImage,
  CollegeProfile,
  CollegeStudentVoice,
} from "@/lib/types/content";

export function getColleges() {
  return COLLEGES;
}

export function getCollegeStreams() {
  return STREAM_OPTIONS;
}

export function getCollegesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getCollegeBySlug(slug))
    .filter((college): college is NonNullable<typeof college> => Boolean(college));
}

export const COLLEGE_COMPARE_FIELDS: CollegeCompareField[] = [
  { key: "rank", label: "Rank", getValue: (college) => college.rank },
  { key: "rating", label: "Rating", getValue: (college) => `${college.rating} / 5` },
  { key: "location", label: "Location", getValue: (college) => college.location },
  { key: "ownership", label: "Ownership", getValue: (college) => college.ownership },
  { key: "established", label: "Established", getValue: (college) => college.established },
  { key: "fees", label: "Annual fees", getValue: (college) => college.fees },
  { key: "hostel", label: "Hostel fee", getValue: (college) => college.avgHostelFee },
  { key: "cutoff", label: "Admission route", getValue: (college) => college.cutoff },
  {
    key: "exams",
    label: "Exams accepted",
    type: "list",
    getValue: (college) => college.examsAccepted,
  },
  { key: "placement", label: "Placement rate", getValue: (college) => college.placementRate },
  { key: "median-package", label: "Median package", getValue: (college) => college.medianPackage },
  { key: "campus-size", label: "Campus size", getValue: (college) => college.campusSize },
  {
    key: "approvals",
    label: "Approvals",
    type: "list",
    getValue: (college) => college.approvedBy,
  },
  {
    key: "top-programs",
    label: "Top programmes",
    type: "list",
    getValue: (college) => college.topPrograms.slice(0, 4),
  },
  {
    key: "highlights",
    label: "Why shortlist",
    type: "list",
    getValue: (college) => college.highlights.slice(0, 3),
  },
];

const EXPERIENCE_IMAGE_POOL: Record<string, Omit<CollegeExperienceImage, "alt">[]> = {
  Engineering: [
    {
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
      caption: "Campus spaces designed for technical learning and collaboration",
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
      caption: "Students working in teams on projects and presentations",
    },
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
      caption: "Hands-on coding, lab work, and systems practice",
    },
    {
      src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80",
      caption: "Study environments that support long hours of focused work",
    },
    {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
      caption: "Technology-first learning with strong project exposure",
    },
  ],
  Medical: [
    {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      caption: "Clinical and simulation-led healthcare learning environments",
    },
    {
      src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80",
      caption: "Students building practical readiness through supervised exposure",
    },
    {
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      caption: "Patient-care focused training and healthcare teamwork",
    },
    {
      src: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80",
      caption: "Structured preparation for hospital and health sciences pathways",
    },
    {
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80",
      caption: "Healthcare campuses with strong clinical and academic intensity",
    },
  ],
  Management: [
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
      caption: "Case discussions, peer work, and business-school environments",
    },
    {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
      caption: "Presentation-led classrooms and industry-facing learning",
    },
    {
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
      caption: "Students preparing for consulting, product, and leadership roles",
    },
    {
      src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80",
      caption: "Collaborative workspaces with strong peer interaction",
    },
    {
      src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80",
      caption: "Business-focused campuses with placement and internship energy",
    },
  ],
  Law: [
    {
      src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
      caption: "Courtroom and advocacy-inspired legal learning settings",
    },
    {
      src: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?w=1200&q=80",
      caption: "Students preparing through debate, policy, and research work",
    },
    {
      src: "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=1200&q=80",
      caption: "Formal academic spaces suited to reading-heavy legal study",
    },
    {
      src: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80",
      caption: "Moot court, writing, and analytical training environments",
    },
    {
      src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
      caption: "Law pathways shaped by internships and courtroom exposure",
    },
  ],
  Design: [
    {
      src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
      caption: "Studio-led learning and visual design exploration",
    },
    {
      src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80",
      caption: "Creative campuses built around portfolios and critique culture",
    },
    {
      src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80",
      caption: "Hands-on work in architecture, spatial, and communication design",
    },
    {
      src: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80",
      caption: "Design practice supported by project reviews and collaboration",
    },
    {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",
      caption: "Candid studio moments and project development settings",
    },
  ],
  Science: [
    {
      src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80",
      caption: "Academic environments with a strong classroom and campus rhythm",
    },
    {
      src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&q=80",
      caption: "Students combining coursework, research, and interdisciplinary options",
    },
    {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
      caption: "Library, classroom, and lab-oriented study routines",
    },
    {
      src: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=1200&q=80",
      caption: "Campus life built around academic depth and peer learning",
    },
    {
      src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&q=80",
      caption: "Flexible, broad-based learning across multiple disciplines",
    },
  ],
};

const STUDENT_VOICE_TEMPLATES: Record<string, Omit<CollegeStudentVoice, "package">[]> = {
  Engineering: [
    {
      name: "Aarav S.",
      programme: "B.Tech",
      role: "Software Engineer",
      quote: "The biggest difference was the project culture. Labs, peer groups, and internship exposure helped me move from theory into real product work.",
    },
    {
      name: "Mehul K.",
      programme: "B.Tech",
      role: "Data and analytics role",
      quote: "What stood out was the combination of technical depth and recruiter confidence. The environment pushed me to build stronger problem-solving discipline.",
    },
  ],
  Medical: [
    {
      name: "Riya P.",
      programme: "MBBS / Health Sciences",
      role: "Clinical training track",
      quote: "The real value came from patient exposure and disciplined hospital training. That practical environment shaped my confidence much more than classroom lectures alone.",
    },
    {
      name: "Sarthak M.",
      programme: "Health Sciences",
      role: "Healthcare pathway",
      quote: "I valued how structured the clinical and academic support was. The right institution matters a lot in healthcare because exposure changes everything.",
    },
  ],
  Management: [
    {
      name: "Nikita R.",
      programme: "MBA / BBA",
      role: "Consulting and strategy role",
      quote: "The peer group and internship cycle created a high-performance environment. That mattered more than glossy placement headlines.",
    },
    {
      name: "Harsh V.",
      programme: "Management",
      role: "Business and operations role",
      quote: "Case discussions, presentations, and recruiter access gave the programme a clear industry orientation from the start.",
    },
  ],
  Law: [
    {
      name: "Ishita G.",
      programme: "Integrated Law",
      role: "Law firm track",
      quote: "Internships, research culture, and moot exposure had a direct impact on confidence. Those are the things I would now judge first while shortlisting.",
    },
    {
      name: "Dev A.",
      programme: "Law",
      role: "Policy and legal research role",
      quote: "The academic environment helped me understand that legal education is not just classes. Writing, internships, and faculty quality matter every semester.",
    },
  ],
  Design: [
    {
      name: "Ananya T.",
      programme: "Design",
      role: "UI / UX pathway",
      quote: "The studio environment and critique culture made the difference. Portfolio growth was driven by constant iteration, not just lectures.",
    },
    {
      name: "Kabir N.",
      programme: "Design / Architecture",
      role: "Creative product role",
      quote: "Hands-on work, reviews, and project feedback helped me understand what real design preparation looks like before placements.",
    },
  ],
  Science: [
    {
      name: "Priyanshi D.",
      programme: "Science / Analytics",
      role: "Research and analytics pathway",
      quote: "I liked the balance between academics and flexibility. The right college made it easier to explore higher studies and practical skill building together.",
    },
    {
      name: "Aditya B.",
      programme: "Science",
      role: "Graduate role / higher study track",
      quote: "What helped most was the peer environment and the breadth of options. It gave me room to refine my direction instead of locking in too early.",
    },
  ],
};

function buildExperienceGallery(college: College) {
  const pool = EXPERIENCE_IMAGE_POOL[college.category] ?? EXPERIENCE_IMAGE_POOL.Science;

  return pool.map((item, index) => ({
    ...item,
    alt: `${college.name} experience image ${index + 1}`,
  }));
}

function buildStudentVoices(college: College) {
  const templates = STUDENT_VOICE_TEMPLATES[college.category] ?? STUDENT_VOICE_TEMPLATES.Science;

  return templates.map((item, index) => ({
    ...item,
    package: index === 0 ? college.medianPackage : college.placementRate,
  }));
}

export function getCollegeBySlug(slug: string): CollegeProfile | undefined {
  const college = getBaseCollegeBySlug(slug);

  if (!college) {
    return undefined;
  }

  return {
    ...college,
    bannerImage: college.image,
    experienceGallery: buildExperienceGallery(college),
    studentVoices: buildStudentVoices(college),
  };
}
