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

export interface AcademicStreamPage {
  slug: string;
  name: string;
  shortDescription: string;
  overview: string;
  image: string;
  collegeCount: string;
  topExams: string[];
  degreeTypes: string[];
  whoShouldConsider: string[];
  keyFocusAreas: string[];
  careerDirections: string[];
  relatedCourseSlugs: string[];
  collegeFilterStream?: Stream;
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

export interface CollegeExperienceImage {
  src: string;
  alt: string;
  caption: string;
}

export interface CollegeStudentVoice {
  name: string;
  programme: string;
  role: string;
  package: string;
  quote: string;
}

export interface CollegeProfile extends College {
  bannerImage: string;
  experienceGallery: CollegeExperienceImage[];
  studentVoices: CollegeStudentVoice[];
}

export interface CollegeCompareField {
  key: string;
  label: string;
  type?: "text" | "list";
  getValue: (college: College) => string | string[];
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

export interface Scholarship {
  id: number;
  name: string;
  amount: string;
  eligibility: string;
  deadline: string;
}

export type DeadlineEventType =
  | "Exam"
  | "Registration"
  | "Scholarship"
  | "Results";

export interface DeadlineEvent {
  id: number;
  date: string;
  title: string;
  type: DeadlineEventType;
  status: string;
  details: string;
  link?: string;
}

export interface ExamTimelineItem {
  exam: string;
  status: string;
  date: string;
  color: string;
}

export interface PersonalizedTimelineInput {
  examYear: string;
  stream: Stream | "";
  statePreference?: string;
}
