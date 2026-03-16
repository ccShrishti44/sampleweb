import { DEADLINE_EVENTS, EXAM_TIMELINE } from "@/lib/data";
import type { ExamTimelineItem, PersonalizedTimelineInput } from "@/lib/types/content";

export function getExamTimeline() {
  return EXAM_TIMELINE;
}

export function getDeadlineEvents() {
  return DEADLINE_EVENTS;
}

const STREAM_TIMELINE_MAP: Record<string, ExamTimelineItem[]> = {
  Engineering: [
    { exam: "JEE Main Session 2", status: "Registration Open", date: "Apr 1 - Apr 15, 2026", color: "bg-blue-100 text-blue-700" },
    { exam: "JEE Advanced", status: "Upcoming", date: "Jun 15, 2026", color: "bg-orange-100 text-orange-700" },
    { exam: "State CET Counselling", status: "Expected", date: "Jun - Jul 2026", color: "bg-violet-100 text-violet-700" },
  ],
  Medical: [
    { exam: "NEET UG", status: "Upcoming", date: "May 3, 2026", color: "bg-orange-100 text-orange-700" },
    { exam: "State Medical Counselling", status: "Expected", date: "Jul - Aug 2026", color: "bg-blue-100 text-blue-700" },
    { exam: "Institute-level Nursing / Allied Health Rounds", status: "Expected", date: "May - Jul 2026", color: "bg-violet-100 text-violet-700" },
  ],
  Management: [
    { exam: "CAT", status: "Upcoming", date: "Nov 29, 2026", color: "bg-orange-100 text-orange-700" },
    { exam: "SNAP / MAT / XAT", status: "Seasonal", date: "Nov 2026 - Jan 2027", color: "bg-blue-100 text-blue-700" },
    { exam: "GD / PI / WAT Rounds", status: "Expected", date: "Jan - Mar 2027", color: "bg-violet-100 text-violet-700" },
  ],
  Law: [
    { exam: "CLAT", status: "Registration Open", date: "Dec 1, 2026", color: "bg-blue-100 text-blue-700" },
    { exam: "AILET / SLAT", status: "Seasonal", date: "Dec 2026", color: "bg-violet-100 text-violet-700" },
    { exam: "Law Counselling Rounds", status: "Expected", date: "Dec 2026 - Jan 2027", color: "bg-orange-100 text-orange-700" },
  ],
  Design: [
    { exam: "UCEED / NID DAT", status: "Seasonal", date: "Oct 2026 - Jan 2027", color: "bg-blue-100 text-blue-700" },
    { exam: "NATA / JEE Main Paper 2", status: "Expected", date: "Mar - Jun 2026", color: "bg-orange-100 text-orange-700" },
    { exam: "Portfolio and studio rounds", status: "Expected", date: "Apr - Jul 2026", color: "bg-violet-100 text-violet-700" },
  ],
  Science: [
    { exam: "CUET UG", status: "Upcoming", date: "May 15 - May 31, 2026", color: "bg-orange-100 text-orange-700" },
    { exam: "University Admission Forms", status: "Expected", date: "Apr - Jun 2026", color: "bg-blue-100 text-blue-700" },
    { exam: "Merit / Counselling Lists", status: "Expected", date: "Jun - Aug 2026", color: "bg-violet-100 text-violet-700" },
  ],
};

export function getPersonalizedExamTimeline(input: PersonalizedTimelineInput) {
  if (!input.stream) {
    return [];
  }

  const items = STREAM_TIMELINE_MAP[input.stream] ?? [];
  const stateSuffix = input.statePreference ? ` | ${input.statePreference}` : "";

  return items.map((item, index) => ({
    ...item,
    exam:
      index === items.length - 1 && input.statePreference
        ? `${item.exam}${stateSuffix}`
        : item.exam,
    status:
      input.examYear === "2027" && item.status === "Upcoming"
        ? "Planning window"
        : item.status,
    date:
      input.examYear === "2027"
        ? item.date.replaceAll("2026", "2027")
        : item.date,
  }));
}
