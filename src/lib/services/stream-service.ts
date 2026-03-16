import type { AcademicStreamPage } from "@/lib/types/content";

import { getCourseBySlug, getCourses } from "@/lib/services/course-service";

const STREAM_PAGES: AcademicStreamPage[] = [
  {
    slug: "engineering",
    name: "Engineering",
    shortDescription: "Build, design, and solve with technical depth.",
    overview:
      "Engineering is best suited for students who want a structured technical path with strong entrance-exam driven admissions, branch choices, and a wide spread of outcomes across software, core engineering, analytics, and research.",
    image: "/images/streams/engineering.jpg",
    collegeCount: "4,000+ colleges",
    topExams: ["JEE Main", "JEE Advanced", "BITSAT", "State CET"],
    degreeTypes: ["B.Tech", "BE", "Integrated B.Tech + M.Tech", "M.Tech"],
    whoShouldConsider: [
      "Students strong in mathematics, logic, and structured problem solving",
      "Aspirants targeting software, AI, core engineering, or higher technical study",
      "Learners comfortable with entrance-exam competition and branch-based choices",
    ],
    keyFocusAreas: ["Branch selection", "College quality", "Placement depth", "Technical labs and projects"],
    careerDirections: ["Software and product engineering", "Core engineering roles", "Data and AI pathways", "Research and higher studies"],
    relatedCourseSlugs: ["btech-computer-science", "mtech-artificial-intelligence"],
    collegeFilterStream: "Engineering",
  },
  {
    slug: "medical",
    name: "Medical",
    shortDescription: "Clinical, health sciences, and patient-care focused pathways.",
    overview:
      "Medical and healthcare streams usually involve longer training, tightly regulated admissions, and stronger emphasis on licensure, hospital exposure, and practical readiness. Students should compare course duration, entrance route, and institution quality very carefully here.",
    image: "/images/streams/medical.jpg",
    collegeCount: "1,200+ colleges",
    topExams: ["NEET UG", "Institute entrance tests", "State counselling"],
    degreeTypes: ["MBBS", "B.Sc Nursing", "B.Pharm", "Allied Health Sciences"],
    whoShouldConsider: [
      "Students interested in healthcare, patient care, and long-term professional training",
      "Aspirants evaluating clinical, nursing, pharmacy, or healthcare support roles",
      "Learners who want regulated programmes with strong practical exposure",
    ],
    keyFocusAreas: ["Hospital exposure", "Course duration", "Recognition and approvals", "Internship quality"],
    careerDirections: ["Clinical practice", "Nursing and patient care", "Pharma and healthcare industry", "Public health and research"],
    relatedCourseSlugs: ["mbbs", "bsc-nursing", "bpharm"],
    collegeFilterStream: "Medical",
  },
  {
    slug: "management",
    name: "Management",
    shortDescription: "Business, leadership, analytics, and corporate pathways.",
    overview:
      "Management stream decisions usually depend less on one course label and more on outcomes, internships, peer quality, and role mix. Students should compare BBA and MBA options by career stage, not just by brand or brochure salary headlines.",
    image: "/images/streams/management.jpg",
    collegeCount: "5,000+ colleges",
    topExams: ["CAT", "XAT", "SNAP", "CUET", "SET"],
    degreeTypes: ["BBA", "BMS", "MBA", "Integrated management programmes"],
    whoShouldConsider: [
      "Students interested in business, leadership, and corporate roles",
      "Aspirants planning early management exposure or later MBA progression",
      "Learners who prefer presentations, case work, internships, and industry projects",
    ],
    keyFocusAreas: ["Internships", "Peer quality", "Median outcomes", "Role mix in placements"],
    careerDirections: ["Marketing and sales", "Operations and consulting", "Finance and analytics", "Leadership-track roles"],
    relatedCourseSlugs: ["bba", "mba"],
    collegeFilterStream: "Management",
  },
  {
    slug: "law",
    name: "Law",
    shortDescription: "Legal reasoning, policy, advocacy, and regulatory careers.",
    overview:
      "Law stream choices depend heavily on entrance route, internship ecosystem, moot court culture, and whether the student is targeting litigation, corporate law, judiciary, or policy. The institution and exposure often matter as much as the degree itself.",
    image: "/images/streams/law.jpg",
    collegeCount: "800+ colleges",
    topExams: ["CLAT", "AILET", "SLAT", "LSAT India"],
    degreeTypes: ["BA LLB", "BBA LLB", "LLB", "LLM"],
    whoShouldConsider: [
      "Students strong in reading, analysis, public issues, and argumentation",
      "Aspirants exploring litigation, corporate law, policy, or judiciary pathways",
      "Learners comfortable with internships, research, and writing-heavy study",
    ],
    keyFocusAreas: ["Internships", "Moot court culture", "Faculty and alumni", "Career pathway fit"],
    careerDirections: ["Corporate law", "Litigation", "Policy and regulation", "Judicial services preparation"],
    relatedCourseSlugs: ["ba-llb"],
    collegeFilterStream: "Law",
  },
  {
    slug: "design",
    name: "Design",
    shortDescription: "Creative, product, visual, and spatial design paths.",
    overview:
      "Design stream pages should help students look beyond labels. Portfolio quality, studio culture, faculty practice, and actual project exposure are often more useful decision signals than broad admission headlines alone.",
    image: "/images/streams/design.jpg",
    collegeCount: "600+ colleges",
    topExams: ["UCEED", "NID DAT", "NATA", "Portfolio rounds"],
    degreeTypes: ["B.Des", "B.Arch", "Design diplomas", "M.Des"],
    whoShouldConsider: [
      "Students with strong visual, creative, or spatial thinking",
      "Aspirants targeting UI/UX, branding, architecture, or digital design",
      "Learners who prefer studio practice, reviews, and project-based learning",
    ],
    keyFocusAreas: ["Portfolio strength", "Studio environment", "Internships", "Specialisation depth"],
    careerDirections: ["UI/UX and digital product design", "Brand and communication design", "Architecture and spatial design", "Motion and visual systems"],
    relatedCourseSlugs: ["bdes-communication-design", "barch"],
    collegeFilterStream: "Design",
  },
  {
    slug: "it-software",
    name: "IT & Software",
    shortDescription: "Coding, software systems, data, and modern tech careers.",
    overview:
      "IT and software is a practical decision category for students comparing coding-first pathways such as BCA, B.Tech Computer Science, Data Science, and AI-focused postgraduate options. The right choice depends on depth, affordability, and whether the goal is software jobs, analytics, or advanced specialisation.",
    image: "/images/streams/it-software.jpg",
    collegeCount: "3,500+ colleges",
    topExams: ["JEE Main", "CUET", "Institute entrance tests", "Merit-based admission"],
    degreeTypes: ["B.Tech Computer Science", "BCA", "B.Sc Data Science", "M.Tech AI"],
    whoShouldConsider: [
      "Students who want coding and software careers but are still choosing the exact degree path",
      "Aspirants comparing engineering, application development, data, and AI options",
      "Learners focused on practical technical roles and portfolio-building",
    ],
    keyFocusAreas: ["Coding exposure", "Project culture", "Internships", "Specialisation and depth"],
    careerDirections: ["Software development", "Data and BI roles", "Cloud and systems work", "AI and machine learning"],
    relatedCourseSlugs: ["btech-computer-science", "bca", "bsc-data-science", "mtech-artificial-intelligence"],
    collegeFilterStream: "Engineering",
  },
];

export function getStreamPages() {
  return STREAM_PAGES;
}

export function getStreamPageBySlug(slug: string) {
  return STREAM_PAGES.find((streamPage) => streamPage.slug === slug);
}

export function getCoursesForStreamPage(slug: string) {
  const streamPage = getStreamPageBySlug(slug);

  if (!streamPage) {
    return [];
  }

  return streamPage.relatedCourseSlugs
    .map((courseSlug) => getCourseBySlug(courseSlug))
    .filter((course): course is NonNullable<typeof course> => Boolean(course));
}

export function getEntryLevelSummary(slug: string) {
  const courses = getCoursesForStreamPage(slug);
  const totalCourses = courses.length;
  const totalColleges = courses.reduce((count, course) => {
    const numeric = Number(course.collegesCount.match(/\d[\d,.]*/)?.[0].replace(/,/g, ""));
    return count + (Number.isFinite(numeric) ? numeric : 0);
  }, 0);

  return {
    totalCourses,
    totalColleges,
    levels: [...new Set(courses.map((course) => course.level))],
    avgSalaryRange: courses.map((course) => course.avgSalary),
  };
}

export function getRelatedCoursesByStream(streamName: string) {
  return getCourses().filter((course) => course.stream === streamName);
}
