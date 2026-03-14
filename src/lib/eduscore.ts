import { getCollegeBySlug } from "@/lib/services";
import type { College, Stream } from "@/lib/types/content";

export type EduScoreExamType =
  | "jee_percentile"
  | "neet_score"
  | "cat_percentile"
  | "snap_percentile"
  | "ailet_percentile"
  | "cuet_score"
  | "uceed_score"
  | "nata_score";

export interface EduScoreExamConfig {
  id: EduScoreExamType;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
}

export interface EduScoreBenchmark {
  collegeSlug: string;
  stream: Stream;
  examType: EduScoreExamType;
  targetScore: number;
  competitiveScore: number;
  affordabilityLpa: number;
}

export interface EduScoreResult {
  college: College;
  overallScore: number;
  academicFit: number;
  affordabilityFit: number;
  outcomeStrength: number;
  benchmark: EduScoreBenchmark;
}

export const EDUSCORE_EXAMS_BY_STREAM: Record<Stream, EduScoreExamConfig[]> = {
  Engineering: [
    { id: "jee_percentile", label: "JEE Main percentile", min: 60, max: 100, step: 0.1, defaultValue: 94, unit: "percentile" },
  ],
  Medical: [
    { id: "neet_score", label: "NEET UG score", min: 250, max: 720, step: 1, defaultValue: 560, unit: "/720" },
  ],
  Management: [
    { id: "cat_percentile", label: "CAT percentile", min: 50, max: 100, step: 0.1, defaultValue: 88, unit: "percentile" },
    { id: "snap_percentile", label: "SNAP percentile", min: 50, max: 100, step: 0.1, defaultValue: 86, unit: "percentile" },
  ],
  Law: [
    { id: "ailet_percentile", label: "AILET percentile", min: 60, max: 100, step: 0.1, defaultValue: 90, unit: "percentile" },
  ],
  Design: [
    { id: "uceed_score", label: "UCEED score", min: 50, max: 300, step: 1, defaultValue: 165, unit: "/300" },
    { id: "nata_score", label: "NATA score", min: 60, max: 200, step: 1, defaultValue: 125, unit: "/200" },
  ],
  Science: [
    { id: "cuet_score", label: "CUET normalised score", min: 40, max: 100, step: 1, defaultValue: 76, unit: "/100" },
  ],
};

const EDUSCORE_BENCHMARKS: EduScoreBenchmark[] = [
  { collegeSlug: "iit-bombay", stream: "Engineering", examType: "jee_percentile", targetScore: 99.7, competitiveScore: 99.2, affordabilityLpa: 3 },
  { collegeSlug: "iit-delhi", stream: "Engineering", examType: "jee_percentile", targetScore: 99.5, competitiveScore: 99.0, affordabilityLpa: 3 },
  { collegeSlug: "vit-vellore", stream: "Engineering", examType: "jee_percentile", targetScore: 89, competitiveScore: 82, affordabilityLpa: 6 },
  { collegeSlug: "aiims-delhi", stream: "Medical", examType: "neet_score", targetScore: 690, competitiveScore: 670, affordabilityLpa: 1 },
  { collegeSlug: "manipal-university", stream: "Medical", examType: "neet_score", targetScore: 540, competitiveScore: 480, affordabilityLpa: 12 },
  { collegeSlug: "iim-ahmedabad", stream: "Management", examType: "cat_percentile", targetScore: 99.7, competitiveScore: 99.2, affordabilityLpa: 15 },
  { collegeSlug: "symbiosis-international", stream: "Management", examType: "snap_percentile", targetScore: 92, competitiveScore: 84, affordabilityLpa: 8 },
  { collegeSlug: "nlu-delhi", stream: "Law", examType: "ailet_percentile", targetScore: 99, competitiveScore: 96, affordabilityLpa: 5 },
  { collegeSlug: "christ-university", stream: "Science", examType: "cuet_score", targetScore: 78, competitiveScore: 68, affordabilityLpa: 4 },
  { collegeSlug: "delhi-university", stream: "Science", examType: "cuet_score", targetScore: 86, competitiveScore: 74, affordabilityLpa: 1 },
  { collegeSlug: "christ-university", stream: "Design", examType: "uceed_score", targetScore: 150, competitiveScore: 120, affordabilityLpa: 4 },
  { collegeSlug: "iit-delhi", stream: "Design", examType: "uceed_score", targetScore: 230, competitiveScore: 205, affordabilityLpa: 3 },
  { collegeSlug: "manipal-university", stream: "Design", examType: "nata_score", targetScore: 135, competitiveScore: 110, affordabilityLpa: 7 },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function parseAnnualFeeLpa(value: string) {
  const match = value.match(/(\d+(\.\d+)?)/);
  if (!match) return 5;
  const numeric = Number(match[1]);
  return value.toLowerCase().includes("total") ? numeric / 2 : numeric;
}

function academicScore(score: number, benchmark: EduScoreBenchmark, exam: EduScoreExamConfig) {
  if (score >= benchmark.targetScore) {
    const stretch = (score - benchmark.targetScore) / Math.max(1, exam.max - benchmark.targetScore);
    return clamp(88 + stretch * 12, 88, 100);
  }

  if (score >= benchmark.competitiveScore) {
    const progress = (score - benchmark.competitiveScore) / Math.max(1, benchmark.targetScore - benchmark.competitiveScore);
    return clamp(70 + progress * 18, 70, 88);
  }

  const gap = (benchmark.competitiveScore - score) / Math.max(1, benchmark.competitiveScore - exam.min);
  return clamp(68 - gap * 38, 22, 68);
}

function affordabilityScore(budgetLpa: number, feeLpa: number) {
  if (budgetLpa >= feeLpa) {
    const cushion = (budgetLpa - feeLpa) / Math.max(1, budgetLpa);
    return clamp(82 + cushion * 18, 82, 100);
  }

  const gap = (feeLpa - budgetLpa) / Math.max(1, feeLpa);
  return clamp(78 - gap * 60, 20, 78);
}

function outcomeStrength(college: College) {
  const ratingScore = (college.rating / 5) * 100;
  const placementValue = Number(college.placementRate.replace(/[^\d.]/g, "")) || 65;
  return clamp(ratingScore * 0.55 + placementValue * 0.45, 45, 100);
}

export function getEduScoreResults({
  stream,
  examType,
  score,
  budgetLpa,
}: {
  stream: Stream;
  examType: EduScoreExamType;
  score: number;
  budgetLpa: number;
}) {
  const exam = EDUSCORE_EXAMS_BY_STREAM[stream].find((item) => item.id === examType);
  if (!exam) return [];

  const benchmarks = EDUSCORE_BENCHMARKS.filter(
    (item) => item.stream === stream && item.examType === examType,
  );

  const results: EduScoreResult[] = benchmarks
    .map((benchmark) => {
      const college = getCollegeBySlug(benchmark.collegeSlug);
      if (!college) return null;

      const academicFit = academicScore(score, benchmark, exam);
      const affordabilityFit = affordabilityScore(budgetLpa, parseAnnualFeeLpa(college.fees));
      const outcomes = outcomeStrength(college);
      const overallScore = Math.round(
        academicFit * 0.6 + affordabilityFit * 0.2 + outcomes * 0.2,
      );

      return {
        college,
        benchmark,
        overallScore,
        academicFit: Math.round(academicFit),
        affordabilityFit: Math.round(affordabilityFit),
        outcomeStrength: Math.round(outcomes),
      };
    })
    .filter((item): item is EduScoreResult => Boolean(item))
    .sort((a, b) => b.overallScore - a.overallScore);

  return results;
}
